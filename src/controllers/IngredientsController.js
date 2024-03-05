const knex = require("../database/knex");

class IngredientsController {
  async index(request, response) {
    const id = request.params.id;

    const ingredients = await knex("ingredients")
      .where({ meal_id: id })
      .groupBy("name");

    return response.json(ingredients)
  }
}


module.exports = IngredientsController;