const { Router } = require("express");
const multer = require("multer");

const uploadConfig = require("../configs/upload");
const MealsController = require("../controllers/MealsController");
const MealAvatarController = require("../controllers/MealAvatarController")

const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const mealsRoutes = Router();
const upload = multer(uploadConfig.MULTER);
const mealsController = new MealsController();
const mealAvatarController = new MealAvatarController();

// mealsRoutes.use(ensureAuthenticated);

mealsRoutes.get('/', mealsController.index);
mealsRoutes.post('/', mealsController.create);
mealsRoutes.get('/:id', mealsController.show);
mealsRoutes.delete('/:id', mealsController.delete);
mealsRoutes.patch('/:id/avatar', ensureAuthenticated, upload.single("avatar"), mealAvatarController.update);


module.exports = mealsRoutes;