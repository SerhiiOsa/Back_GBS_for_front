exports.up = function (knex) {
  return knex.schema.alterTable("school_specializations", function (table) {
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("school_specializations", function (table) {
    table.dropColumn("created_at");
  });
};
