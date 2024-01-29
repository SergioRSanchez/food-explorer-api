const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class MealAvatarController {
  async update(request, response) {
    const { id } = request.params;

    const avatarFilename = request.file.filename;

    const diskStorage = new DiskStorage();

    const meal = await knex("meals").where({ id }).first();

    if (!meal) {
      throw new AppError("Only authenticated users can change avatar", 401);
    }

    if (meal.image) {
      await diskStorage.deleteFile(meal.image);
    }

    const filename = await diskStorage.saveFile(avatarFilename);
    meal.image = filename;

    await knex("meals").update(meal).where({ id });

    return response.json(meal);
  }
}


module.exports = MealAvatarController;