const express = require("express");
const connectMongo = require("./utils/mongo");
const app = express();
const http = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(http);
const handlebars = require("express-handlebars");

const productsRouter = require("./routes/products.router");
const cartsRouter = require("./routes/carts.router");
const viewsRouter = require("./routes/views.router");

const configureSocket = require("./utils/socketManager");

// ✅ Ejecutar la conexión a Mongo antes de levantar el servidor
connectMongo();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

configureSocket(io);

http.listen(8080, () => {
  console.log("Servidor corriendo en puerto 8080");
});
