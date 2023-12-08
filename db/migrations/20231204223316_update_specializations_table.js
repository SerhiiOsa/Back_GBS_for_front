exports.up = function (knex) {
  return knex.schema.alterTable("specializations", function (table) {
    table.text("extended_description");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("specializations", function (table) {
    table.dropColumn("extended_description");
  });
};
