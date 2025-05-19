const express = require("express");
const ProductManager = require("../managers/ProductManager");
const router = express.Router();
const productManager = new ProductManager();

router.get("/home", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("home", { title: "Home", products });
});

router.get("/realtimeproducts", async (req, res) => {
  res.render("realTimeProducts", { title: "Tiempo Real" });
});

module.exports = router;
