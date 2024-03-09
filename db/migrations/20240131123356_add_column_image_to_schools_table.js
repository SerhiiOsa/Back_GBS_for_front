exports.up = function (knex) {
  return knex.schema.alterTable("schools", function (table) {
    table.string("image");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("schools", function (table) {
    table.dropColumn("image");
  });
};
