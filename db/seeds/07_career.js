exports.seed = async function (knex) {
  await knex.raw("ALTER SEQUENCE career_id_seq RESTART WITH 1");
  await knex("career").del();

  const careerLevelsData = [
    {
      name: "trainee",
      training_term: 1000,
    },
    {
      name: "junior",
      training_term: 2000,
    },
    {
      name: "middle",
      training_term: 5000,
    },
    {
      name: "senior",
      training_term: 10000,
    },
    {
      name: "trainee",
      training_term: 200,
    },
    {
      name: "junior",
      training_term: 500,
    },
    {
      name: "middle",
      training_term: 1500,
    },
    {
      name: "senior",
      training_term: 5000,
    },
  ];

  for (const careerLevel of careerLevelsData) {
    await knex("career").insert(careerLevel);
  }
};
