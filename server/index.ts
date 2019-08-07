/* next */
import next from "next";
/* firebase */
import * as admin from "firebase-admin";
/* express */
import express from "express";
/* route */
import * as bodyParser from "body-parser";
import session from "express-session";
import serviceAccount from "../credentials/server";
import nextRoutes from "./routes";

const FileStore = require("session-file-store")(session);

const port = process.env.PORT || 3000;

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, dir: "./client" });
const routes = nextRoutes.getRequestHandler(app);

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

app.prepare().then((): any => {
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
    return routes(req, res);
  });

  server.listen(port, (): void => {});
});
