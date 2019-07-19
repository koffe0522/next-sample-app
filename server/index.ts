import { createServer, Server } from "http";
import next from "next";
import nextRoutes from "./routes";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, dir: "./client" });
const routes = nextRoutes.getRequestHandler(app);

app.prepare().then((): any => {
  const server = createServer(
    (req, res): Server => {
      return routes(req, res);
    }
  );

  server.listen(9000, (): void => {});
});
