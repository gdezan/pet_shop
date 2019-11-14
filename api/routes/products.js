import { Router } from "express";
import db from "../models";
import multer from "multer";
import fs from "fs";

const router = Router();

router.get("/", (req, res) => {
  db.product
    .findAll()
    .then(products => {
      res.send(products);
      res.sendStatus(200);
    })
    .catch(err => res.send(err));
});

router.post("/", (req, res) => {
  const { name, price, discounted_price, category } = req.body;
  db.product
    .create({ name, price, discounted_price, category })
    .then((data) => res.status(201).send(data))
    .catch(err => res.send(err));
});

export default router;
