import createBareServer from "@tomphttp/bare-server-node";
import express from "express";
import { createServer } from "node:http";
import { spadiumPath } from "spadium";
import { hostname } from "node:os";
import { fileURLToPath } from "node:url";

const bare = createBareServer("/bare/");
const app = express();

const publicPath = fileURLToPath(new URL("../public/", import.meta.url));

app.use("/", express.static(publicPath));
app.use("/spadium/", express.static(spadiumPath));

const server = createServer();

server.on("request", (req, res) => {
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.on("upgrade", (req, socket, head) => {
  if (bare.shouldRoute(req)) {
    bare.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

let port = parseInt(process.env.PORT || "");

if (isNaN(port)) port = 8080;

server.on("listening", () => {
  const address = server.address();

  // by default we are listening on 0.0.0.0 (every interface)
  // we just need to list a few
  console.log("Listening on:");
  console.log(`\thttp://localhost:${address.port}`);
  console.log(`\thttp://${hostname()}:${address.port}`);
  console.log(
    `\thttp://${
      address.family === "IPv6" ? `[${address.address}]` : address.address
    }:${address.port}`
  );
});

server.listen({
  port,
});
