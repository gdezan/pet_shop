import "dotenv/config";
import express from "express";
import exphbs from "express-handlebars";
import bodyParser from "body-parser";
import cors from "cors";

import db, { sequelize } from "./models";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch(err => console.err("Error", err));

app.listen(process.env.PORT, console.log(`Server started on port ${process.env.PORT}`));

app.use("/session", routes.session);
app.use("/users", routes.users);
app.use("/pets", routes.pets);
app.use("/products", routes.products);
