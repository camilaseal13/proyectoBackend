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


const ProductModel = require("../models/Product");
const CartModel = require("../models/Cart");

router.get("/products", async (req, res) => {
  const { limit = 10, page = 1, sort, query } = req.query;

  const filter = {};
  if (query) {
    if (["true", "false"].includes(query)) {
      filter.status = query === "true";
    } else {
      filter.category = query;
    }
  }

  const options = {
    limit: parseInt(limit),
    page: parseInt(page),
    lean: true,
  };

  if (sort === "asc") options.sort = { price: 1 };
  if (sort === "desc") options.sort = { price: -1 };

  const result = await ProductModel.paginate(filter, options);

  res.render("products", {
    products: result.docs,
    totalPages: result.totalPages,
    prevPage: result.prevPage,
    nextPage: result.nextPage,
    page: result.page,
    hasPrevPage: result.hasPrevPage,
    hasNextPage: result.hasNextPage,
    prevLink: result.hasPrevPage ? `/products?limit=${limit}&page=${result.prevPage}${sort ? `&sort=${sort}` : ""}${query ? `&query=${query}` : ""}` : null,
    nextLink: result.hasNextPage ? `/products?limit=${limit}&page=${result.nextPage}${sort ? `&sort=${sort}` : ""}${query ? `&query=${query}` : ""}` : null
  });
});

router.get("/products/:pid", async (req, res) => {
  const product = await ProductModel.findById(req.params.pid).lean();
  if (!product) return res.status(404).send("Producto no encontrado");
  res.render("productDetail", { product });
});

router.get("/carts/:cid", async (req, res) => {
  const cart = await CartModel.findById(req.params.cid).populate("products.product").lean();
  if (!cart) return res.status(404).send("Carrito no encontrado");
  res.render("cart", { cart });
});
