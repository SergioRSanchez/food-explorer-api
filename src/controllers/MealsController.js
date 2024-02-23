const knex = require("../database/knex");

class MealsController {
  async create(request, response) {
    const { title, description, price, ingredients, category, image } = request.body;
    // const user_id = request.user.id;

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

    return response.json()
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
    const { title, description, ingredientsList, price } = request.body;
    const { id } = request.params;

    const meal = await knex("meals").where({ id }).first();
    const ingredients = await knex("ingredients").where({ meal_id: id });
    // const ingredients = await knex("ingredients").where({ meal_id: id });

    if (!meal) {
      throw new AppError("Meal doesn't exist", 401);
    }

    meal.title = title ?? meal.title;
    meal.description = description ?? meal.description;
    meal.price = price ?? meal.price;

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

    // return response.status(200).json();
    return response.json(meal);
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("meals").where({ id }).delete();

    return response.json();
  }

  async index(request, response) {
    const { title, ingredients } = request.query;

    let meals

    if (ingredients) {
      const filterIngredients = ingredients.split(',').map(ingredient => ingredient.trim());

      meals = await knex("ingredients")
        .select([
          "meals.id",
          "meals.title",
          "meals.description",
          "meals.price",
          "meals.category",
          "meals.image",
        ])
        .where("ingredients.name", "like", `%${filterIngredients}%`)
        .whereLike("meals.title", `%${title}%`)
        .whereIn("name", filterIngredients)
        .innerJoin("meals", "meals.id", "ingredients.meal_id")
        .groupBy("meals.id")
        .orderBy("meals.title")
    } else {
      meals = await knex("meals")
        .whereLike("title", `%${title}%`)
    }

    //  talvez tenha que fazer um meals with ingredients


    return response.json(meals);
  }
};


module.exports = MealsController;