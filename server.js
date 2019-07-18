import express from "express";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

app.prepare().then(() => {
  const server = express();

  server.get("/", (req, res) => {
    app.render(req, res, "/", {});
  });

  server.listen(3000, err => {
    if (err) throw err;
  });
});
