import { Router } from "express";
import db from "../models";
const router = Router();

router.get("/", (req, res) => {
  db.pet
    .findAll()
    .then(pets => {
      res.send(pets);
      res.sendStatus(200);
    })
    .catch(err => console.error(err));
});

router.post("/", (req, res) => {
  const { name, breed, age, user_id } = req.body;
  db.pet
    .create({ name, breed, age, user_id })
    .then(() => {
      res.send("Pet created");
      res.sendStatus(201);
    })
    .catch(err => console.error(err));
});

export default router;
