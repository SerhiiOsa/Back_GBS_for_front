exports.up = function (knex) {
  return knex.schema.createTable("video_specializations", function (table) {
    table.increments("id").primary();
    table.integer("video_id").unsigned().notNullable();
    table.integer("specialization_id").unsigned().notNullable();
    table.foreign("video_id").references("id").inTable("videos");
    table
      .foreign("specialization_id")
      .references("id")
      .inTable("specializations");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("video_specializations");
};
