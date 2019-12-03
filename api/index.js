import "dotenv/config";
import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";

import routes from "./routes";

const PORT = process.env.API_PORT || 5000;
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(fileUpload({ createParentPath: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to the MongoDB database..."))
  .catch(err => console.log(err));

// Routes
app.use("/api/users", routes.users);
app.use("/api/services", routes.services);
app.use("/api/products", routes.products);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("src/build"));

  // Express serve up index.html file if it doesn't recognize route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "src", "build", "index.html"));
  });

  app.listen(process.env.PORT || 5000, () =>
    console.log(`Server started on port ${process.env.PORT || 5000}...`),
  );
} else {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
}
