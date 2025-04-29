const express = require("express");
const CartManager = require("../managers/CartManager");
const router = express.Router();
const cartManager = new CartManager();

// Crear un nuevo carrito
router.post("/", async (req, res) => {
  const cart = await cartManager.createCart();
  res.status(201).json(cart);
});

// Listar productos de un carrito
router.get("/:cid", async (req, res) => {
  const cart = await cartManager.getCartById(parseInt(req.params.cid));
  if (!cart) return res.status(404).send("Carrito no encontrado");
  res.json(cart.products);
});

// Agregar producto a carrito
router.post("/:cid/product/:pid", async (req, res) => {
  const cart = await cartManager.addProductToCart(
    parseInt(req.params.cid),
    parseInt(req.params.pid)
  );
  if (!cart) return res.status(404).send("Carrito no encontrado");
  res.json(cart);
});

module.exports = router;
