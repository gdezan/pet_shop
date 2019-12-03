import { Router } from "express";

import User from "../models/User";
import UserSession from "../models/UserSession";
import fs from "fs";
import { fileUpload } from "../utils";

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

// Register a User
router.post("/signup", async (req, res) => {
  const { name, password, address, zipCode, phone } = req.body;
  const email = req.body.email && req.body.email.toLowerCase();

  if (!name || !email || !password || !address || !zipCode || !phone) {
    return res.status(400).send({ errors: true, message: "Por favor preencha todos o campos" });
  }

  try {
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res
        .status(400)
        .send({ errors: true, message: `O e-mail "${email}" já está sendo utilizado` });
    }

    const user = new User({
      name,
      email,
      address,
      zipCode,
      phone,
    });

    if (req.files) {
      user.imagePath = fileUpload(req.files, `${user._id}/${req.files.image.name}`);
    }

    user.password = User.generateHash(password);

    const savedUser = await user.save();
    const userSession = new UserSession({
      userId: user._id,
    });
    const savedSession = await userSession.save();

    return res.status(201).json({ savedUser, savedSession });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
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

// Return a User
router.get("/:userId", (req, res) => {
  User.findById(req.params.userId)
    .then(user => res.status(200).json(user))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Update a User
router.put("/:userId", (req, res) => {
  const { name, password, address, zipCode, phone } = req.body;

  if (!name || !address || !zipCode || !phone) {
    return res.status(400).send({ error: true, message: "Por favor preencha todos o campos" });
  }

  User.findByIdAndUpdate(req.params.userId, {
    $set: {
      name,
      address,
      zipCode,
      phone,
    },
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ error: true, message: `Usuário não encontrado` });
      }

      if (password) {
        user.password = User.generateHash(password);
      }

      if (req.files) {
        user.imagePath = fileUpload(req.files, `${user._id}/${req.files.image.name}`);
      }

      user.save().then(user => {
        res.status(200).json({ user });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Pet Routes

// Get the pets of a user
router.get("/:userId/pets", (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      if (!user) {
        return res.status(404).send({ error: true, message: "Usuário não encontrado" });
      }
      res.status(200).json(user.pets);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Add a pet to a user
router.post("/:userId/pets", (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      if (!user) {
        return res.status(404).send({ error: true, message: "Usuário não encontrado" });
      }
      const { name, breed, age } = req.body;
      let pet = { name, breed, age };

      if (req.files) {
        pet.imagePath = fileUpload(req.files, `${user._id}/${req.files.image.name}`);
      }

      user.pets.push(pet);
      user.save().then(user => res.status(201).json(user));
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Schedule a service
router.post("/:userId/schedule", (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      if (!user) {
        return res.status(404).send({ errors: true, message: "Usuário não encontrado" });
      }
      const { date, serviceId, petId } = req.body;
      console.log(req.body);

      const selectedPet = user.pets.find(pet => {
        return pet._id.equals(petId);
      });
      if (!selectedPet) {
        return res.status(404).send({ errors: true, message: "Pet não encontrado" });
      }

      selectedPet.services.push({ date, serviceId });
      user.save().then(user => res.status(201).json(user));
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

export default router;
