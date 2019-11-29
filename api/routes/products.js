import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.sendStatus(200);
});

// router.post("/", (req, res) => {
//   const { name, price, discounted_price, category } = req.body;
//   db.product
//     .create({ name, price, discounted_price, category })
//     .then((data) => res.status(201).send(data))
//     .catch(err => res.send(err));
// });

export default router;
