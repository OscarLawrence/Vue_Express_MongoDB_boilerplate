import express from "express";
import mongoose from "mongoose";
import expressStaticGzip from "express-static-gzip";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";

import Keys from "../../config/server/secrets/keys";

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoURI
const MongoURI = Keys.MongoURI;

// connect
mongoose
  .connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// routes
import Example from "./routes/api/examples";

app.use("/api/example", Example);

const port = process.env.PORT || 5000;

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(
    expressStaticGzip("client/", {
      enableBrotli: true,
      orderPreference: ["br", "gz"]
    })
  );
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve("client/", "index.html"), (err: string) => {
      if (err) {
        res.status(500).send(err);
      }
    });
  });
}

app.listen(port, () => console.info(`Server is running on ${port}`));
