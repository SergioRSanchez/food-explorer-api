//  NÃO SEI SE ESTÁ CERTO, ESTÁ RETORNANDO OS INGREDIENTES DE ACORDO COM O ID DO PRATO

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