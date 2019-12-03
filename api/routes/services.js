import { Router } from "express";

import User from "../models/User";
import Service from "../models/Service";
import { fileUpload } from "../utils";

const router = Router();

// Get Services
router.get("/", (req, res) => {
  Service.find()
    .then(services => {
      res.status(200).json(services);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Create a Service
router.post("/", (req, res) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).send({ errors: true, message: "Favor preencher todos os valores" });
  }

  const service = new Service({
    name,
    price,
  });

  if (req.files) {
    service.imagePath = fileUpload(req.files, `services/${service._id}`);
  }

  service
    .save()
    .then(service => {
      return res.status(201).json(service);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get Scheduled Services
// We need to iterate through all their users and their pets to get the
// schedules services of each one
router.get("/schedule", async (req, res) => {
  let schedule = [];
  try {
    const foundUsers = await User.find();
    foundUsers.forEach(user => {
      user.pets.forEach(pet => {
        schedule.push(
          ...pet.services.map(service => {
            return {
              _id: service._id,
              serviceId: service.serviceId,
              date: service.date,
              petId: pet._id,
              userId: user._id,
            };
          }),
        );
      });
    });
    schedule.sort((a, b) => {
      return a.date > b.date;
    });
    return res.status(200).json(schedule);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export default router;
