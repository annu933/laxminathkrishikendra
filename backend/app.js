const express = require("express");
const app = express();
require("dotenv").config();

const cors = require("cors");
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");

// Middlewares
app.use(cors({
  origin: "*",   // ⛔️ temporary for testing, then restrict
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  expressSession({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET || "default-secret",
  })
);

app.use(flash());

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Database
require("./config/mongoose-connection");

// Routes
app.use("/dashboard", require("./routes/dashboardRouter"));
app.use("/product", require("./routes/productsRouter"));
app.use("/inventory", require("./routes/invetoryRouter"));
app.use("/inventory", require("./routes/inventory/bulk_create"));
app.use("/sales", require("./routes/saleRouter"));

app.get("/", (req, res) => res.send("Backend running"));

// PORT FIX FOR RENDER
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

