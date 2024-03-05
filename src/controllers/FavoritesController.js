const knex = require("../database/knex");

class FavoritesController {
  async index(request, response) {
    const user_id = request.user.id;

    const favorites = await knex("favorites").where({ user_id });

    return response.json(favorites)
  }

  async create(request, response) {
    const { id } = request.params;
    const user_id = request.user.id;

    await knex("favorites").insert({
      meal_id: id,
      user_id,
      is_favorite: true
    });

    return response.json()
  }

  async delete(request, response) {
    const { id } = request.params;
    const user_id = request.user.id;

    await knex("favorites").where({ meal_id: id, user_id }).delete();

    return response.json()
  }
}

module.exports = FavoritesController