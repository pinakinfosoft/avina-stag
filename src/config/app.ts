import express from "express";
import cors from "cors";
import http from "http";
import cluster from "cluster";
import os from "os";
import compression from "compression";
import { PORT, DB_HOST, DB_NAME } from "./env.var";
import { bodyDecipher } from "../middlewares/req-res-encoder";
import { tokenVerificationForV4 } from "../middlewares/authenticate";
import { setupRoutes } from "./routes.config";
import { setupAssociations } from "../version-one/model";

// Constants
const REQUEST_SIZE_LIMIT = "200mb";
const SERVER_TIMEOUT_MS = 450 * 1000; // 7.5 minutes
const DEFAULT_PORT = "3000";
const numCPUs = os.cpus().length;

// Middleware configuration
const corsOptions: cors.CorsOptions = {
  origin: "*",
};

const commonMiddlewares = [bodyDecipher, tokenVerificationForV4];

/**
 * Configures the Express application with middleware and routes
 */
export default async ({ app }: { app: express.Application }) => {
  // Body parsing middleware
  app.use(express.json({ limit: REQUEST_SIZE_LIMIT }));
  app.use(express.urlencoded({ limit: REQUEST_SIZE_LIMIT, extended: true }));

  // Compression middleware
  app.use(compression());

  // CORS middleware
  app.use(cors(corsOptions));

  // Static file serving
  app.use(express.static("public"));
  app.use("/images", express.static("images"));

  // Setup all routes from centralized configuration
  setupRoutes(app, commonMiddlewares);

  // Initialize model associations
  setupAssociations();

  // Start server
  startServer(app);
  // await updateCurrencyRatesViaCronJob();
};

/**
 * Starts the HTTP server with cluster support for multi-core processing
 */
const startServer = (app: express.Application): void => {
  console.log(`Available CPUs: ${numCPUs}`);

  // Use isPrimary instead of deprecated isMaster
  if (cluster.isPrimary) {
    console.log(`Primary process ${process.pid} is running`);

    // Fork workers for each CPU core
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    // Handle worker exit and restart
    cluster.on("exit", (worker) => {
      console.log(`Worker ${worker.process.pid} died. Restarting...`);
      cluster.fork();
    });
  } else {
    // Worker process - start the server
    const port = PORT?.toString() || DEFAULT_PORT;
    app.set("port", port);

    const server = http.createServer(app);
    server.timeout = SERVER_TIMEOUT_MS;

    server.listen(port, () => {
      const addr = server.address();
      const bind =
        typeof addr === "string" ? `pipe ${addr}` : `port ${port}`;
      console.log(
        `🛡️  Server listening on ${bind} 🛡️  HOST: ${DB_HOST} DB: ${DB_NAME}`
      );
    });

    // Handle server errors
    server.on("error", (error: NodeJS.ErrnoException) => {
      if (error.syscall !== "listen") {
        throw error;
      }

      const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

      switch (error.code) {
        case "EACCES":
          console.error(`${bind} requires elevated privileges`);
          process.exit(1);
          break;
        case "EADDRINUSE":
          console.error(`${bind} is already in use`);
          process.exit(1);
          break;
        default:
          throw error;
      }
    });
  }
};

