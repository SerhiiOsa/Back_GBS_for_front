exports.up = function (knex) {
  return knex.schema
    .createTable("schools", function (table) {
      table.increments("id").primary();
      table.string("school_name").unique().notNullable();
      table.string("description").notNullable();
      table.string("link").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("school_specializations", function (table) {
      table.increments("id").primary();
      table.integer("school_id").unsigned().notNullable();
      table.integer("specialization_id").unsigned().notNullable();
      table.foreign("school_id").references("id").inTable("schools");
      table
        .foreign("specialization_id")
        .references("id")
        .inTable("specializations");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("school_specializations").dropTable("schools");
};
