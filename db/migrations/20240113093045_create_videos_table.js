exports.up = function (knex) {
  return knex.schema.createTable("videos", function (table) {
    table.increments("id").primary();
    table.string("name").unique().notNullable();
    table.string("link").unique().notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("videos");
};