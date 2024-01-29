const { Router } = require("express");

const IngredientsController = require("../controllers/IngredientsController");

const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const ingredientsRoutes = Router();

const ingredientsController = new IngredientsController();

ingredientsRoutes.get('/:id', ensureAuthenticated, ingredientsController.index);


module.exports = ingredientsRoutes;