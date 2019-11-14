import { Router } from "express";
import db from "../models";
const router = Router();

router.post("/", (req, res) => {
  const { type, scheduled, user_id } = req.body;
  db.pet
    .create({ type, scheduled, user_id })
    .then(() => {
      res.send("Service scheduled");
      res.sendStatus(201);
    })
    .catch(err => console.error(err));
});

export default router;