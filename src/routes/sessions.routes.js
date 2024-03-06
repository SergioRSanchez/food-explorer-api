const { Router } = require("express");

const SessionsController = require("../controllers/SessionsController");

const sessionsRoutes = Router();

const sessionsController = new SessionsController();

sessionsRoutes.post("/", sessionsController.create);
sessionsRoutes.get("/", sessionsController.destroy);


module.exports = sessionsRoutes;