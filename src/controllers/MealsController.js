const knex = require("../database/knex");

class MealsController {
  async create(request, response) {
    const { title, description, price, ingredients, category, image } = request.body;

    const [meal_id] = await knex("meals").insert({
      title,
      description,
      price,
      category,
      image,
    })

    const ingredientsInsert = ingredients.map(name => {
      return {
        meal_id,
        name
      }
    })

    await knex("ingredients").insert(ingredientsInsert);

    return response.json(meal_id)
  }

  async show(request, response) {
    const { id } = request.params;

    const meal = await knex("meals").where({ id }).first();
    const ingredients = await knex("ingredients").where({ meal_id: id }).orderBy("name");

    return response.json({
      ...meal,
      ingredients
    })
  }

  async update(request, response) {
    const { title, description, ingredientsList, price, category } = request.body;
    const { id } = request.params;

    const meal = await knex("meals").where({ id }).first();
    const ingredients = await knex("ingredients").where({ meal_id: id });

    if (!meal) {
      throw new AppError("Meal doesn't exist", 401);
    }

    meal.title = title ?? meal.title;
    meal.description = description ?? meal.description;
    meal.price = price ?? meal.price;
    meal.category = category ?? meal.category;

    if (ingredientsList) {
      const ingredientsInsert = ingredientsList.map(name => {
        return {
          meal_id: id,
          name
        }
      })

      await knex("ingredients").where({ meal_id: id }).delete();
      await knex("ingredients").insert(ingredientsInsert);
    }

    await knex("meals").update(meal).where({ id });

    return response.status(200).json();
    // return response.json(meal);
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("meals").where({ id }).delete();

    return response.json();
  }

  async index(request, response) {
    const { title } = request.query;

    const meals = await knex("meals")
      .distinct("meals.id", "meals.title", "meals.description", "meals.price", "meals.category", "meals.image")
      .leftJoin("ingredients", "meals.id", "ingredients.meal_id")
      .whereLike("meals.title", `%${title}%`)
      .orWhereLike("ingredients.name", `%${title}%`);

    return response.json(meals);
  }
};


module.exports = MealsController;