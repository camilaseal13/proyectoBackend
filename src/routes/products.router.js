const express = require("express");
const ProductManager = require("../managers/ProductManager");
const router = express.Router();
const productManager = new ProductManager();

// Listar todos los productos
router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.json(products);
});

// Traer producto por ID
router.get("/:pid", async (req, res) => {
  const product = await productManager.getProductById(parseInt(req.params.pid));
  if (!product) return res.status(404).send("Producto no encontrado");
  res.json(product);
});

// Agregar un producto nuevo
router.post("/", async (req, res) => {
  const {
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnails,
    status,
  } = req.body;

  if (
    !title ||
    !description ||
    !code ||
    !price ||
    !stock ||
    !category ||
    !thumbnails ||
    status === undefined
  ) {
    return res.status(400).send("Todos los campos son obligatorios.");
  }

  try {
    const product = await productManager.addProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar producto
router.put("/:pid", async (req, res) => {
  const updated = await productManager.updateProduct(
    parseInt(req.params.pid),
    req.body
  );
  if (!updated) return res.status(404).send("Producto no encontrado");
  res.json(updated);
});

// Eliminar producto
router.delete("/:pid", async (req, res) => {
  await productManager.deleteProduct(parseInt(req.params.pid));
  res.status(204).send();
});

module.exports = router;
