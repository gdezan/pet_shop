import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import db, { sequelize } from "./models";
import routes from "./routes";
import authMiddleware from "./authMiddleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(authMiddleware);

sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch(err => console.err("Error", err));

sequelize
  .sync()
  .then(() =>
    app.listen(process.env.PORT, console.log(`Server started on port ${process.env.PORT}`)),
  );

app.use("/api/session", routes.session);
app.use("/api/users", routes.users);
app.use("/api/pets", routes.pets);
app.use("/api/products", routes.products);
