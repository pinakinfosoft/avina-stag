import { Router, RequestHandler } from "express";
import routesVersionOne from "../version-one/routes/index.route";
import webhookRoute from "../version-one/routes/webhook.route";
import adminRouteVersionOne from "../version-one/routes/admin/index.route";
import userRouteVersionOne  from "../version-one/routes/user/index.route";

/**
 * Route configuration interface
 */
export interface RouteConfig {
  path: string;
  router: () => Router;
  middlewares?: RequestHandler[];
  useCommonMiddlewares?: boolean; // Flag to determine if common middlewares should be applied
}

/**
 * Centralized route configuration
 * Add or modify routes here for easier management
 */
export const routesConfig: RouteConfig[] = [
  {
    path: "/api/webhook",
    router: webhookRoute,
    useCommonMiddlewares: false, // Webhooks don't need authentication
  },
  {
    path: "/api/v1",
    router: routesVersionOne,
    useCommonMiddlewares: true,
  },
  {
    path: "/api/v1/admin",
    router: adminRouteVersionOne ,
    useCommonMiddlewares: true,
  },
  {
    path: "/api/v1/user",
    router: userRouteVersionOne ,
    useCommonMiddlewares: true,
  },
];

/**
 * Sets up all routes on the Express application
 * @param app - Express application instance
 * @param commonMiddlewares - Middlewares to apply to protected routes
 */
export const setupRoutes = (
  app: Router,
  commonMiddlewares: RequestHandler[] = []
): void => {
  routesConfig.forEach((route) => {
    // Use route-specific middlewares if provided, otherwise use common middlewares if enabled
    const middlewares = route.middlewares 
      ? route.middlewares 
      : route.useCommonMiddlewares !== false 
        ? commonMiddlewares 
        : [];
    
    app.use(route.path, ...middlewares, route.router());
  });
};

