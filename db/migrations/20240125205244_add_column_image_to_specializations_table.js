exports.up = function (knex) {
  return knex.schema.alterTable("specializations", function (table) {
    table.string("image");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("specializations", function (table) {
    table.dropColumn("image");
  });
};
