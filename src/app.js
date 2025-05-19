const express = require("express");
const app = express();
const http = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(http);
const handlebars = require("express-handlebars");
const ProductManager = require("./managers/ProductManager");
const productManager = new ProductManager();

const productsRouter = require("./routes/products.router");
const cartsRouter = require("./routes/carts.router");
const viewsRouter = require("./routes/views.router");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

// WebSocket
io.on("connection", async (socket) => {
  console.log("Cliente conectado");

  const products = await productManager.getProducts();
  socket.emit("productList", products);

  socket.on("newProduct", async (data, callback) => {
    try {
      if (
        !data.title ||
        !data.description ||
        !data.code ||
        !data.price ||
        !data.stock ||
        !data.category ||
        !data.thumbnails ||
        !Array.isArray(data.thumbnails) ||
        !data.thumbnails[0]
      ) {
        return callback({ error: "Todos los campos son obligatorios." });
      }

      await productManager.addProduct(data);
      const updatedProducts = await productManager.getProducts();
      io.emit("productList", updatedProducts);
    } catch (err) {
      callback({ error: err.message || "Error al agregar producto." });
    }
  });

  socket.on("deleteProduct", async (id, callback) => {
    try {
      const existing = await productManager.getProductById(id);
      if (!existing) {
        return callback({ error: "Producto no encontrado." });
      }

      await productManager.deleteProduct(id);
      const updatedProducts = await productManager.getProducts();
      io.emit("productList", updatedProducts);
    } catch (err) {
      callback({ error: "Error al eliminar producto." });
    }
  });
});

http.listen(8080, () => {
  console.log("Servidor corriendo en puerto 8080");
});
