exports.seed = async function (knex) {
  await knex.raw(
    "TRUNCATE TABLE school_specializations RESTART IDENTITY CASCADE",
  );

  const schoolToSpecializationsData = [
    {
      school_id: 1,
      specialization_id: 1,
    },
    {
      school_id: 1,
      specialization_id: 2,
    },
    {
      school_id: 1,
      specialization_id: 3,
    },
    {
      school_id: 1,
      specialization_id: 4,
    },
    {
      school_id: 2,
      specialization_id: 1,
    },
    {
      school_id: 2,
      specialization_id: 2,
    },
    {
      school_id: 2,
      specialization_id: 3,
    },
    {
      school_id: 2,
      specialization_id: 4,
    },
    {
      school_id: 3,
      specialization_id: 2,
    },
    {
      school_id: 3,
      specialization_id: 4,
    },
  ];

  for (const link of schoolToSpecializationsData) {
    await knex("school_specializations").insert(link);
  }
};
