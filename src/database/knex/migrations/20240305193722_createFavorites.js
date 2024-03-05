exports.up = knex => knex.schema.createTable("favorites", table => {
  table.increments("id");
  table.boolean("is_favorite");

  table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
  table.integer("meal_id").references("id").inTable("meals").onDelete("CASCADE");
});


exports.down = knex => knex.schema.dropTable("favorites");