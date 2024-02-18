const bodyParser = require("body-parser");
const path = require("path");
const express = require("express");
const session= require("express-session");

const home = require("./controllers/homeController")
const userRoutes= require("./routes/users")
const app = express();

// Configuración de EJS
app.set("view engine", "ejs");
app.set("views", "views");
app.use(session({
    secret:"tu_secreto",
    resave: false,
    saveUninitialized: true
}))

// Middleware de body-parser para analizar datos de formularios
app.use(bodyParser.urlencoded({ extended: false }));
// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")));


app.use(userRoutes)
// Ruta de inicio
app.get('/', home.homeCOntroller);


// Iniciar el servidor
app.listen(3000);
