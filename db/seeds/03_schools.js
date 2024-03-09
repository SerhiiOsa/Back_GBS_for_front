exports.seed = async function (knex) {
  await knex.raw("ALTER SEQUENCE schools_id_seq RESTART WITH 1");
  await knex("schools").del();

  const schoolsData = [
    {
      name: "Vinnytsia IT Academy",
      description:
        "Бажаєш вивчити програмування, тестування, веб-дизайн і налаштований наполегливо навчатись, щоб гарантовано отримати перспективну роботу - тобі до нас. Ми готуємо ІТ-шників відповідно до реальних сучасних вимог ІТ-ринку. Базові і профільні предмети викладають досвідчені викладачі. Практикуючі програмісти-ментори передають неоціненний практичний досвід на реальних проектах.",
      link: "https://www.ita.in.ua",
    },
    {
      name: "INTITA",
      description:
        "Бажаєш отримати певну спеціалізацію чи пройти окремий курс, модуль, заняття чи тест від конкретного освітнього провайдера - обирай навчання разом з INTITA.",
      link: "https://intita.com",
    },
    {
      name: "IT 404 Academy",
      description: "Якісне навчання IT-спеціальностям для дорослих та дітей",
      link: "https://www.404itacademy.com",
    },
  ];

  for (const school of schoolsData) {
    await knex("schools").insert(school);
  }
};
