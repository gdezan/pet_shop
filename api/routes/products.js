import { Router } from "express";
import db from "../models";
const router = Router();

router.get("/", (req, res) => {
  db.product
    .findAll()
    .then(products => {
      res.send(products);
      res.sendStatus(200);
    })
    .catch(err => console.error(err));
});

router.post("/", (req, res) => {
  const { name, price, discount } = req.body;
  console.log("reqbody", req.body);
  db.product
    .create({ name, price, discount })
    .then(() => {
      res.send("Product created");
      res.sendStatus(201);
    })
    .catch(err => console.error(err));
});

export default router;
