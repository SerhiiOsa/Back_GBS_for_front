exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      email: "oser.md@gmail.com",
      password_hash:
        "$2b$10$WeBUhpBl/.V7ZVNpD0MkC.iTZ6vrd8X7gwPtg15hKz/LhOwy2ymWe", //password: 1111
      is_super_admin: true,
    },
  ]);
};
