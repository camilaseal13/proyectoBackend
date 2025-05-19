const fs = require("fs").promises;
const path = require("path");

class ProductManager {
  constructor() {
    this.path = path.join(__dirname, "../data/products.json");
  }

  async getProducts() {
    const data = await fs.readFile(this.path, "utf-8");
    return JSON.parse(data);
  }

  async getProductById(id) {
    const products = await this.getProducts();
    return products.find((p) => p.id === id);
  }

  async addProduct(product) {
    const products = await this.getProducts();

    // Validar campos obligatorios
    const requiredFields = [
      "title",
      "description",
      "code",
      "price",
      "stock",
      "category",
      "thumbnails",
    ];
    for (const field of requiredFields) {
      if (
        product[field] === undefined ||
        product[field] === null ||
        product[field] === "" ||
        (Array.isArray(product[field]) && product[field].length === 0)
      ) {
        throw new Error(`Falta el campo obligatorio: ${field}`);
      }
    }

    // Validar que el código sea único
    const exists = products.find((p) => p.code === product.code);
    if (exists) {
      throw new Error(`Ya existe un producto con el código '${product.code}'`);
    }


    const newId =
      products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    const newProduct = {
      id: newId,
      status: product.status !== undefined ? product.status : true,
      ...product,
    };

    products.push(newProduct);
    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    return newProduct;
  }

  async updateProduct(id, updatedFields) {
    const products = await this.getProducts();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;

    // Si se intenta cambiar el code, verificar que no se repita
    if (updatedFields.code && updatedFields.code !== products[index].code) {
      if (products.some((p) => p.code === updatedFields.code)) {
        throw new Error(
          `Ya existe un producto con el código '${updatedFields.code}'`
        );
      }
    }

    products[index] = { ...products[index], ...updatedFields };
    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    return products[index];
  }

  async deleteProduct(id) {
    let products = await this.getProducts();
    products = products.filter((p) => p.id !== id);
    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    return true;
  }
}

module.exports = ProductManager;
