/* next */
import next from "next";
/* firebase */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
/* express */
import express from "express";
import * as bodyParser from "body-parser";
import session from "express-session";
import serviceAccount from "./server";
/* route */
const routes = require("next-routes");
const FileStore = require("session-file-store")(session);

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, conf: { distDir: "next" } });
const handle = routes().getRequestHandler(app);

// FirebaseAdminの初期化設定
const firebase = admin.initializeApp(
  {
    credential: admin.credential.cert({
      projectId: serviceAccount.project_id,
      clientEmail: serviceAccount.client_email,
      privateKey: serviceAccount.private_key
    })
  },
  "server"
);

const server = express();

server.use(bodyParser.json());
server.use(
  session({
    secret: "geheimnis",
    name: "next-sample-app",
    saveUninitialized: true,
    store: new FileStore({ secret: "geheimnis" }),
    resave: false,
    rolling: true,
    cookie: { maxAge: 604800000, httpOnly: true } // week
  })
);

server.use((req: any, res, argNext): any => {
  req.firebaseServer = firebase;
  argNext();
});

server.post("/api/todos", (req, res): void => {
  const { name, todos } = req.body;
  res.json({ name, todos });
});

server.post("/api/login", (req, res): void => {
  if (!req.body) {
    res.sendStatus(400);
  } else {
    const { token } = req.body;
    firebase
      .auth()
      .verifyIdToken(token)
      .then((decodedToken): any => {
        req.session.decodedToken = decodedToken;
        return decodedToken;
      })
      .then((decodedToken): any => {
        res.json({ status: true, decodedToken });
      })
      .catch((error): any => {
        res.json({ error });
      });
  }
});

server.post("/api/logout", (req, res): void => {
  req.session.decodedToken = null;
  res.json({ status: true });
});

server.get("*", (req, res): any => {
  return handle(req, res);
});

// server.listen(9000, (): void => {});

// eslint-disable-next-line import/prefer-default-export
export const nextApp = functions.https.onRequest(server);
