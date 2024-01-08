exports.up = function (knex) {
  return knex.schema.alterTable("schools", function (table) {
    table.text("description").notNullable().alter();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("schools", function (table) {
    table.string("description").notNullable().alter();
  });
};
