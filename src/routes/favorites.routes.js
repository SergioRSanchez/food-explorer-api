const { Router } = require("express");

const FavoritesController = require("../controllers/FavoritesController");

const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const favoritesRoutes = Router();

const favoritesController = new FavoritesController();

favoritesRoutes.get('/', ensureAuthenticated, favoritesController.index);
favoritesRoutes.post('/:id', ensureAuthenticated, favoritesController.create);
favoritesRoutes.delete('/:id', ensureAuthenticated, favoritesController.delete);


module.exports = favoritesRoutes;