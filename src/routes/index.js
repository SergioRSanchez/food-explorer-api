const { Router } = require("express");

const usersRouter = require("./users.routes");
const mealsRouter = require("./meals.routes");
const sessionsRoutes = require("./sessions.routes");
const ingredientsRoutes = require("./ingredients.routes");

const routes = Router();
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRoutes);
routes.use('/meals', mealsRouter);
routes.use('/ingredients', ingredientsRoutes);


module.exports = routes;