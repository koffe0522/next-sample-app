const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

app.prepare().then(() => {
  const server = express();

  server.get("/", (req, res) => {
    app.render(req, res, "/", {});
  });

  server.listen(8000, err => {
    if (err) throw err;
  });
});
