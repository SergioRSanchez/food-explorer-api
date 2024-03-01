exports.up = knex => knex.schema.createTable("meals", table => {
  table.increments("id");
  table.text("title");
  table.text("description");
  table.integer("price");
  // table.text("category");
  table.enum("category", ["bebida", "refeicao", "sobremesa"], { useNative: true, enumName: "categories" }).notNullable().defaultTo("refeicao");

  table.text("image");

  // table.integer("user_id").references("id").inTable("users");

  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});


exports.down = knex => knex.schema.dropTable("meals");
