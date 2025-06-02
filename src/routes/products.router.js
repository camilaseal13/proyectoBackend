const express = require("express");
const ProductManager = require("../managers/ProductManager");
const router = express.Router();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    const result = await productManager.getProducts({ limit, page, sort, query });

    const baseUrl = req.baseUrl || "/api/products";
    const buildLink = (p) => `${baseUrl}?limit=${limit}&page=${p}${sort ? `&sort=${sort}` : ""}${query ? `&query=${query}` : ""}`;

    res.json({
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? buildLink(result.prevPage) : null,
      nextLink: result.hasNextPage ? buildLink(result.nextPage) : null,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.get("/:pid", async (req, res) => {
  const product = await productManager.getProductById(parseInt(req.params.pid));
  if (!product) return res.status(404).send("Producto no encontrado");
  res.json(product);
});

router.post("/", async (req, res) => {
  try {
    const product = await productManager.addProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const updated = await productManager.updateProduct(
      parseInt(req.params.pid),
      req.body
    );
    if (!updated) return res.status(404).send("Producto no encontrado");
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:pid", async (req, res) => {
  await productManager.deleteProduct(parseInt(req.params.pid));
  res.status(204).send();
});

module.exports = router;
