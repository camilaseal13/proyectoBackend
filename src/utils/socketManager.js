
const ProductManager = require("../managers/ProductManager");
const productManager = new ProductManager();

function configureSocket(io) {
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
}

module.exports = configureSocket;
