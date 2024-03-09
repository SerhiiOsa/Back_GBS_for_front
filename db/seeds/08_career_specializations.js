exports.seed = async function (knex) {
  await knex.raw(
    "TRUNCATE TABLE career_specializations RESTART IDENTITY CASCADE",
  );

  const videoToSpecializationsData = [
    {
      career_id: 1,
      specialization_id: 1,
    },
    {
      career_id: 2,
      specialization_id: 1,
    },
    {
      career_id: 3,
      specialization_id: 1,
    },
    {
      career_id: 4,
      specialization_id: 1,
    },
    {
      career_id: 5,
      specialization_id: 2,
    },
    {
      career_id: 6,
      specialization_id: 2,
    },
    {
      career_id: 7,
      specialization_id: 2,
    },
    {
      career_id: 8,
      specialization_id: 2,
    },
    {
      career_id: 5,
      specialization_id: 3,
    },
    {
      career_id: 6,
      specialization_id: 3,
    },
    {
      career_id: 7,
      specialization_id: 3,
    },
    {
      career_id: 8,
      specialization_id: 3,
    },
    {
      career_id: 5,
      specialization_id: 4,
    },
    {
      career_id: 6,
      specialization_id: 4,
    },
    {
      career_id: 7,
      specialization_id: 4,
    },
    {
      career_id: 8,
      specialization_id: 4,
    },
  ];

  for (const link of videoToSpecializationsData) {
    await knex("career_specializations").insert(link);
  }
};
