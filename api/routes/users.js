import { Router } from "express";
import bcrypt from "bcrypt";
import db from "../models";
const router = Router();

router.get("/", (req, res) => {
  db.user
    .findAll()
    .then(users => {
      res.send(users);
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

router.post("/signup", async (req, res) => {
  // hash the password provided by the user with bcrypt so that
  // we are never storing plain text passwords
  const hash = bcrypt.hashSync(req.body.password, 10);

  try {
    // create a new user with the password hash from bcrypt
    let user = await db.user.create(Object.assign(req.body, { password: hash }));

    // data will be an object with the user and it's authToken
    let data = await user.authorize();

    // send back the new user and auth token to the
    // client { user, authToken }
    return res.send(data);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
});

router.put("/signup", async (req, res) => {
  let hash = null;
  if (req.body.password !== "") hash = bcrypt.hashSync(req.body.password, 10);

  try {
    const user = await db.user.findByPk(req.body.id);
    await user.update(
      {
        ...req.body,
        ...(hash && { password: hash }),
      },
      {
        fields: Object.keys(req.body).filter(key => !(key === "password" && req.body[key] === "")),
      },
    );

    await user.save();

    return res.send(user);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // if the email / password is missing, we use status code 400
  // indicating a bad request was made and send back a message
  if (!email || !password) {
    return res.status(400).send("Request missing email or password param");
  }

  try {
    let user = await db.user.authenticate(email, password);
    // user = await user.authorize();

    return res.send(user);
  } catch (err) {
    console.log(err);
    return res.status(400).send("invalid email or password");
  }
});

router.delete("/logout", async (req, res) => {
  // because the logout request needs to be send with
  // authorization we should have access to the user
  // on the req object, so we will try to find it and
  // call the model method logout
  const { user, auth_token: authToken } = req.body;

  // we only want to attempt a logout if the user is
  // present in the req object, meaning it already
  // passed the authentication middleware. There is no reason
  // the authToken should be missing at this point, check anyway
  if (user && authToken) {
    try {
      const foundUser = await db.user.findByPk(user.id);
      await foundUser.logout(authToken);
      return res.status(204).send();
    } catch (err) {
      console.log(err);
    }
  }

  // if the user missing, the user is not logged in, hence we
  // use status code 400 indicating a bad request was made
  // and send back a message
  return res.status(400).send({ errors: [{ message: "not authenticated" }] });
});

router.post("/session", async (req, res) => {
  const { auth_token: authToken } = req.body;

  // if the email / password is missing, we use status code 400
  // indicating a bad request was made and send back a message
  if (!authToken) {
    return res.status(400).send("No auth token sent");
  }

  try {
    let user = await db.user.findByAuthToken(authToken);

    return res.send(user);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Invalid auth token");
  }
});

router.get("/me", (req, res) => {
  if (req.user) {
    return res.send(req.user);
  }
  res.status(404).send({ errors: [{ message: "missing auth token" }] });
});

export default router;
