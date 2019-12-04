import { Router } from "express";

import Product from "../models/Product";
import ProductCategory from "../models/ProductCategory";
import { fileUpload } from "../utils";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  const { name, price, discountedPrice, categoryId, qtyStock } = req.body;
  console.log(req.body);
  if (!name || !price) {
    return res
      .status(400)
      .json({ errors: true, message: "Por favor preencha o preço e nome do produto" });
  }

  try {
    const newProduct = await new Product({
      name,
      price,
      discountedPrice,
      categoryId,
      qtyStock,
    });

    if (req.files) {
      newProduct.imagePath = fileUpload(req.files, `products/${newProduct._id}`);
    }

    return res.status(201).json(await newProduct.save());
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/categories", async (req, res) => {
  try {
    const categories = await ProductCategory.find();
    return res.status(200).json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/categories", async (req, res) => {
  const { name } = req.body;
  try {
    const savedCat = await new ProductCategory({ name }).save();
    return res.status(201).json(savedCat);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/by_category/:categoryUrl", async (req, res) => {
  const { categoryUrl } = req.params;
  try {
    if (categoryUrl) {
      const category = await ProductCategory.findOne({ url: categoryUrl });
      const products = await Product.find({ categoryId: category._id });
      return res.status(200).json(products);
    } else {
      return res.status(400).json({ errors: true, message: "No category id" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/:productId", async (req, res) => {
  const { name, price, discountedPrice, categoryId, qtyStock } = req.body;

  if (!name || !price) {
    return res
      .status(400)
      .json({ errors: true, message: "Por favor preencha o preço e nome do produto" });
  }

  try {
    const updatedProduct = await Product.update(
      { _id: req.params.productId },
      {
        $set: {
          name,
          price,
          discountedPrice: discountedPrice || 0,
          categoryId,
          qtyStock,
        },
      },
    );
    if (!updatedProduct) {
      return res.status(404).json({ errors: true, message: "Produto não encontrado" });
    }

    if (req.files) {
      updatedProduct.imagePath = fileUpload(req.files, `products/${updatedProduct._id}`);
    }

    return res.status(200).json(updatedProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export default router;
