const express = require("express");
const CartManager = require("../managers/CartManager");
const router = express.Router();
const cartManager = new CartManager();

router.post("/", async (req, res) => {
  const cart = await cartManager.createCart();
  res.status(201).json(cart);
});

router.get("/:cid", async (req, res) => {
  const cart = await cartManager.getCartById(req.params.cid);
  if (!cart) return res.status(404).send("Carrito no encontrado");
  res.json(cart.products);
});

router.post("/:cid/products/:pid", async (req, res) => {
  const cart = await cartManager.addProductToCart(
    req.params.cid,
    req.params.pid
  );
  if (!cart) return res.status(404).send("Carrito no encontrado");
  res.json(cart);
});

module.exports = router;

// DELETE /api/carts/:cid/products/:pid
router.delete("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const result = await cartManager.removeProductFromCart(cid, pid);
    if (!result)
      return res
        .status(404)
        .json({ message: "Carrito o producto no encontrado" });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/carts/:cid
router.put("/:cid", async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body;
  try {
    const result = await cartManager.updateCart(cid, products);
    if (!result)
      return res.status(404).json({ message: "Carrito no encontrado" });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/carts/:cid/products/:pid
router.put("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    const result = await cartManager.updateProductQuantity(cid, pid, quantity);
    if (!result)
      return res
        .status(404)
        .json({ message: "Carrito o producto no encontrado" });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/carts/:cid
router.delete("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const result = await cartManager.clearCart(cid);
    if (!result)
      return res.status(404).json({ message: "Carrito no encontrado" });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
