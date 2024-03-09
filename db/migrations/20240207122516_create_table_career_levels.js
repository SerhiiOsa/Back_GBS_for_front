exports.up = function (knex) {
  return knex.schema
    .createTable("career", function (table) {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.integer("training_term").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
      table.unique(["name", "training_term"]);
    })
    .createTable("career_specializations", function (table) {
      table.increments("id").primary();
      table.integer("career_id").unsigned();
      table.integer("specialization_id").unsigned();
      table.foreign("career_id").references("id").inTable("career");
      table
        .foreign("specialization_id")
        .references("id")
        .inTable("specializations");
      table.unique(["career_id", "specialization_id"]);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("career_specializations").dropTable("career");
};
