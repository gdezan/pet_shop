import { Router } from "express";
import db from "../models";
const router = Router();

router.get("/", (req, res) => {
  db.user
    .findAll()
    .then(users => {
      res.send(users);
      res.sendStatus(200);
    })
    .catch(err => console.error(err));
});

router.post("/", (req, res) => {
  const { name, email } = req.body;
  db.user
    .create({ name, email })
    .then(() => res.sendStatus(201))
    .catch(err => console.error(err));
});

export default router;
