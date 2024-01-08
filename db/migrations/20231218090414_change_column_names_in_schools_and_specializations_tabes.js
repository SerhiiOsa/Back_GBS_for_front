exports.up = function (knex) {
  return knex.schema
    .alterTable("specializations", function (table) {
      table.renameColumn("node_name", "name");
    })
    .alterTable("schools", function (table) {
      table.renameColumn("school_name", "name");
    });
};

exports.down = function (knex) {
  return knex.schema
    .alterTable("specializations", function (table) {
      table.renameColumn("name", "node_name");
    })
    .alterTable("schools", function (table) {
      table.renameColumn("name", "school_name");
    });
};
