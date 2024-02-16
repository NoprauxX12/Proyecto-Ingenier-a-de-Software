const bodyParser = require("body-parser");
const path = require("path");
const express = require("express");

const home = require("./controllers/homeController")
const app = express();

// Configuración de EJS
app.set("view engine", "ejs");
app.set("views", "views");

// Middleware de body-parser para analizar datos de formularios
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Ruta de inicio
app.get('/', home.homeCOntroller);

// Iniciar el servidor
app.listen(3000);
