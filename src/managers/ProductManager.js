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
    const newProduct = {
      id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
      status: true,
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
