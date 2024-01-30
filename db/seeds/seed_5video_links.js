exports.seed = async function (knex) {
  await knex.raw(
    "TRUNCATE TABLE video_specializations RESTART IDENTITY CASCADE",
  );

  const videoToSpecializationsData = [
    {
      video_id: 1,
      specialization_id: 4,
    },
    {
      video_id: 2,
      specialization_id: 4,
    },
    {
      video_id: 3,
      specialization_id: 4,
    },
    {
      video_id: 4,
      specialization_id: 2,
    },
    {
      video_id: 5,
      specialization_id: 2,
    },
    {
      video_id: 6,
      specialization_id: 2,
    },
  ];

  for (const link of videoToSpecializationsData) {
    await knex("video_specializations").insert(link);
  }
};
