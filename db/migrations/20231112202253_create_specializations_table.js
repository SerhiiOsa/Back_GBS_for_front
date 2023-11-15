exports.up = function (knex) {
  return knex.schema.createTable("specializations", function (table) {
    table.increments("id").primary();
    table.string("node_name").unique().notNullable();
    table.text("description").notNullable();
    table.integer("parent_id").unsigned();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.foreign("parent_id").references("id").inTable("specializations");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("specializations");
};
