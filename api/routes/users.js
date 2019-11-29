import { Router } from "express";

import User from "../models/User";
import UserSession from "../models/UserSession";

const router = Router();

// Get All Users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json(err);
  }
});

// Register an User
router.post("/signup", (req, res) => {
  const { name, password, address, zip_code, phone } = req.body;
  const email = req.body.email.toLowerCase();

  if (!name || !email || !password || !address) {
    return res.status(422).send({ success: false, message: "Por favor preencha todos o campos" });
  }

  User.findOne({ email })
    .then(foundUser => {
      if (foundUser) {
        return res
          .status(422)
          .send({ success: false, message: `O e-mail "${email}" já está sendo utilizado` });
      }

      const user = new User({
        name,
        email,
        address,
        zip_code,
        phone,
      });

      user.password = User.generateHash(password);

      user
        .save()
        .then(user => {
          const userSession = new UserSession({
            userId: user._id,
          });
          userSession
            .save()
            .then(session => res.json(session))
            .catch(err => res.json(err));
        })
        .catch(err => res.status(500).json(err));
    })
    .catch(err => res.status(500).json(err));
});

// Login Handle
router.post("/login", (req, res, next) => {
  const { password } = req.body;
  const email = req.body.email.toLowerCase();

  User.findOne({ email })
    .then(user => {
      if (!user || !user.validPassword(password)) {
        return res.status(422).send({ success: false, message: "E-mail ou senha incorretos" });
      }

      const userSession = new UserSession({
        userId: user._id,
      });
      userSession
        .save()
        .then(session => res.status(201).json({ user, session }))
        .catch(err => res.json(err));
    })
    .catch(err => res.status(500).json(err));
});

// Check if user is logged in
router.get("/session", (req, res) => {
  const { token } = req && req.query;

  UserSession.findOne({
    _id: token,
  })
    .then(session => {
      if (session) {
        User.findById(session.userId).then(user => res.status(200).json(user));
      } else {
        res.status(404).send({ success: false, message: "Sessão não encontrada" });
      }
    })
    .catch(err => res.status(500).json(err));
});

// Logout Handle
router.delete("/logout", (req, res) => {
  const { token } = req && req.query;

  UserSession.findOneAndDelete({
    _id: token,
  })
    .then(session => {
      if (session) {
        res.status(200).json(session);
      } else {
        res.status(404).send({ success: false, message: "Sessão não encontrada" });
      }
    })
    .catch(err => res.status(500).json(err));
});

export default router;
