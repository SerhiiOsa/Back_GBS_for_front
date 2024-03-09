exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      email: "oser.md@gmail.com",
      password_hash:
        "$2a$10$Pn.ZDplt0XdMuVyx9.jR3eMZP0ZDMSg5BCRpYcOYY.hq2c2/jJfJG", //password: 11111111
      is_super_admin: true,
    },
  ]);
};
