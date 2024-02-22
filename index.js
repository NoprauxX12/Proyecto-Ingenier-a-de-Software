const bodyParser = require("body-parser");
const path = require("path");
const express = require("express");
const session= require("express-session");
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/users")

app.use(session({
    secret:"tu_secreto",
    resave: false,
    saveUninitialized: true
}))

// Middleware de body-parser para analizar datos de formularios
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
// Ruta de inicio
app.use(userRoutes);


// Iniciar el servidor
app.listen(3200);
