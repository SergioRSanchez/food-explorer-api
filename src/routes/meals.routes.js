const { Router } = require("express");
const multer = require("multer");

const uploadConfig = require("../configs/upload");
const MealsController = require("../controllers/MealsController");
const MealAvatarController = require("../controllers/MealAvatarController")

const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const verifyUserAuthorization = require("../middleware/verifyUserAuthorization");

const mealsRoutes = Router();
const upload = multer(uploadConfig.MULTER);
const mealsController = new MealsController();
const mealAvatarController = new MealAvatarController();

mealsRoutes.use(ensureAuthenticated);

mealsRoutes.get('/', mealsController.index);
mealsRoutes.post('/', verifyUserAuthorization("admin"), mealsController.create);
mealsRoutes.get('/:id', mealsController.show);
mealsRoutes.delete('/:id', verifyUserAuthorization("admin"), mealsController.delete);
mealsRoutes.patch('/:id/avatar', verifyUserAuthorization("admin"), upload.single("avatar"), mealAvatarController.update);
mealsRoutes.put('/:id', verifyUserAuthorization("admin"), mealsController.update);


module.exports = mealsRoutes;