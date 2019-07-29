import { createServer, Server } from "http";
import next from "next";
import nextRoutes from "./routes";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, dir: "./client" });
const routes = nextRoutes.getRequestHandler(app);

app.prepare().then((): any => {
  const server = createServer(
    (req, res): Server => {
      // ヘッダー情報
      // res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      return routes(req, res);
    }
  );

  server.listen(9000, (): void => {});
});
