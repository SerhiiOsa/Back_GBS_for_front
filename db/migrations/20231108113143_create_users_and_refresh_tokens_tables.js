exports.up = function (knex) {
  return knex.schema
    .createTable("users", function (table) {
      table.increments("id").primary();
      table.string("email").unique().notNullable();
      table.string("password_hash").notNullable();
      table.boolean("is_super_admin").notNullable();
    })
    .createTable("refresh_tokens", function (table) {
      table.increments("id").primary();
      table.integer("user_id").unsigned().notNullable();
      table.string("token").notNullable();
      table.timestamp("expires_at");
      table.foreign("user_id").references("users.id");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("refresh_tokens").dropTable("users");
};
