const { Router } = require("express");

const MealsController = require("../controllers/MealsController");

const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const mealsRoutes = Router();

const mealsController = new MealsController();

// mealsRoutes.use(ensureAuthenticated);

mealsRoutes.get('/', mealsController.index);
mealsRoutes.post('/', mealsController.create);
mealsRoutes.get('/:id', mealsController.show);
mealsRoutes.delete('/:id', mealsController.delete);


module.exports = mealsRoutes;