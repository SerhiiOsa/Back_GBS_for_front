exports.seed = async function (knex) {
  await knex.raw("ALTER SEQUENCE videos_id_seq RESTART WITH 1");
  await knex("videos").del();

  const videosData = [
    {
      name: "Графічний дизайнер. Плюси та мінуси професії.",
      link: "https://www.youtube.com/watch?v=CcQ6aSAT2CI",
    },
    {
      name: "Хто такий та чим займається графічний дизайнер?",
      link: "https://www.youtube.com/watch?v=h9CUNPvKcE8",
    },
    {
      name: "Урок 1. Основи UI UX Що таке UI UX Design",
      link: "https://www.youtube.com/watch?v=18QjS3Gm-RU",
    },
    {
      name: "Хто Такі Тестувальники в IT | QA – Це?",
      link: "https://www.youtube.com/watch?v=9kroxfWXVaM",
    },
    {
      name: "Переваги та недоліки професії тестувальника ПЗ",
      link: "https://www.youtube.com/watch?v=FKAdWAhbIUc",
    },
    {
      name: "ПРИКЛАД ТЕСТУВАННЯ ПЗ (QA) - Що робить тестувальник",
      link: "https://www.youtube.com/watch?v=yqPVcM-4JJk",
    },
  ];

  for (const video of videosData) {
    await knex("videos").insert(video);
  }
};
