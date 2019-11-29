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
  const { name, password, address, zipCode, phone } = req.body;
  const email = req.body.email && req.body.email.toLowerCase();

  if (!name || !email || !password || !address || !zipCode || !phone) {
    return res.status(400).send({ error: true, message: "Por favor preencha todos o campos" });
  }

  User.findOne({ email })
    .then(foundUser => {
      if (foundUser) {
        return res
          .status(400)
          .send({ error: true, message: `O e-mail "${email}" já está sendo utilizado` });
      }

      const user = new User({
        name,
        email,
        address,
        zipCode,
        phone,
      });

      if (req.files) {
        const { image } = req.files;
        const imagePath = `public/uploads/${image.name}`;
        image.mv(`${__dirname}/../../${imagePath}`, err => {
          if (err) {
            console.log(err);
            return res.status(500).send(err);
          }
        });
        user.imagePath = imagePath;
      }

      user.password = User.generateHash(password);

      user
        .save()
        .then(user => {
          const userSession = new UserSession({
            userId: user._id,
          });
          userSession
            .save()
            .then(session => {
              console.log(user);
              res.status(201).json({ user, session });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json(err);
            });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Login Handle
router.post("/login", (req, res, next) => {
  const { password } = req.body;
  const email = req.body.email.toLowerCase();

  User.findOne({ email })
    .then(user => {
      if (!user || !user.validPassword(password)) {
        return res.status(400).send({ error: true, message: "E-mail ou senha incorretos" });
      }

      const userSession = new UserSession({
        userId: user._id,
      });
      userSession
        .save()
        .then(session => res.status(201).json({ user, session }))
        .catch(err => res.json(err));
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Check if user is logged in
router.get("/session", (req, res) => {
  const { token } = req && req.query;

  UserSession.findOne({
    _id: token,
  })
    .then(session => {
      if (session) {
        User.findById(session.userId).then(user => {
          console.log(user);
          res.status(200).json(user);
        });
      } else {
        res.status(404).send({ error: true, message: "Sessão não encontrada" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
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
        res.status(404).send({ error: true, message: "Sessão não encontrada" });
      }
    })
    .catch(err => res.status(500).json(err));
});

export default router;
