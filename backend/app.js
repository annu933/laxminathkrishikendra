const express = require("express");
const app = express();
require("dotenv").config();

const cors = require("cors");
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  expressSession({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);
app.use(flash());

// Static assets
app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB
require("./config/mongoose-connection");

// Routes
const dashboardRoute = require("./routes/dashboardRouter");
const productRoute = require("./routes/productsRouter");
const inventoryRouter = require("./routes/invetoryRouter");
const inventoryBulkCreate = require("./routes/inventory/bulk_create");
const saleRouter = require("./routes/saleRouter");
app.use("/dashboard", dashboardRoute);
app.use("/product", productRoute);
app.use("/inventory", inventoryRouter);
app.use("/inventory", inventoryBulkCreate);
app.use("/sales", saleRouter);
// Optional root route
app.get("/", (req, res) => res.send("Backend running"));
const PORT = process.env.PORT || 3001;

// Start server
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));