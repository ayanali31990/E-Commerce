import express from "express";
import cors from "cors";
import products from "./products.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

/* 🔹 Get ALL products */
app.get("/products", (req, res) => {
  res.status(200).json(products);
});

/* 🔹 Get product by ID (MUST BE ABOVE CATEGORY ROUTE) */
app.get("/products/id/:id", (req, res) => {
  const { id } = req.params;

  const product = products.find((item) => item.id === id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.status(200).json(product);
});

/* 🔹 Get CATEGORY-wise products */
app.get("/products/category/:category", (req, res) => {
  const { category } = req.params;

  const filteredProducts = products.filter(
    (item) => item.category.toLowerCase() === category.toLowerCase()
  );

  if (!filteredProducts.length) {
    return res.status(404).json({
      message: "No products found for this category",
    });
  }

  res.status(200).json(filteredProducts);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
