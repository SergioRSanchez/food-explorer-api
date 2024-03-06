const { Router } = require("express");

const UserController = require("../controllers/UsersController");
const UserValidateController = require("../controllers/UserValidateController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const userRoutes = Router();
const userController = new UserController();
const userValidateController = new UserValidateController();

userRoutes.post("/", userController.create);
userRoutes.get("/validated", ensureAuthenticated, userValidateController.index);
userRoutes.put("/", ensureAuthenticated, userController.update);


module.exports = userRoutes;