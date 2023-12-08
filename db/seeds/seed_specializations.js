exports.seed = async function (knex) {
  await knex.raw("ALTER SEQUENCE specializations_id_seq RESTART WITH 1");
  await knex("specializations").del();

  const specializationsData = [
    {
      node_name: "Software Developer/Engineer",
      description:
        "Розробники ПЗ проектують, розробляють і тестують програмні додатки. Вони використовують різні мови програмування та інструменти розробки",
      parent_id: null,
    },
    {
      node_name: "Web developer",
      description: "Розробники веб додатків",
      parent_id: null,
    },
    {
      node_name: "Front-end Developer",
      description: "створюють інтерфейс користувача для вебсайтів і додатків",
      parent_id: 2,
    },
    {
      node_name: "React Front-end developer",
      description: "Використовує бібліотеку React",
      parent_id: 3,
    },
    {
      node_name: "Angular Front-end developer",
      description: "Використовує framwork angular",
      parent_id: 3,
    },
    {
      node_name: "Back-end Developer",
      description: "працюють над серверною частиною додатків",
      parent_id: 2,
    },
  ];

  for (const specialization of specializationsData) {
    await knex("specializations").insert(specialization);
  }
};
