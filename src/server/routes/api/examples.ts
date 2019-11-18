import express from "express";

const Example = express.Router();

/*
  Endpoint:   /api/example
  Type:       GET
  Response:   example response
*/

Example.get("/", (req, res, next) => {
  if (req.query.exp) {
    if (req.query.exp === "hello") {
      next();
    } else {
      res
        .status(200)
        .send(
          `You gave me "${req.query.exp}", but I would be happier with a simple "hello"`
        );
    }
  } else {
    res
      .status(200)
      .send("Please give me a querystring ending with '?exp=hello'.");
  }
});

Example.get("/", (req, res) => {
  res.status(200).send(`You gave me an hello!!! Thanks for that.\n
  Please change this route for your personal needs and start building a robust Express-server`);
});

export default Example;
