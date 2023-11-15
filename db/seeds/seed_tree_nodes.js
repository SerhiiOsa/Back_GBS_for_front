exports.seed = async function (knex) {
  await knex("specializations").del();
  await knex("specializations").insert([
    {
      id: 1,
      node_name: "Software Developer/Engineer",
      description:
        "Розробники ПЗ проектують, розробляють і тестують програмні додатки. Вони використовують різні мови програмування та інструменти розробки",
      parent_id: null,
    },
    {
      id: 2,
      node_name: "Web developer",
      description: "Розробники веб додатків",
      parent_id: null,
    },
    {
      id: 3,
      node_name: "Front-end Developer",
      description: "створюють інтерфейс користувача для вебсайтів і додатків",
      parent_id: 2,
    },
    {
      id: 4,
      node_name: "React Front-end developer",
      description: "Використовує бібліотеку React",
      parent_id: 3,
    },
    {
      id: 5,
      node_name: "Angular Front-end developer",
      description: "Використовує framwork angular",
      parent_id: 3,
    },
    {
      id: 6,
      node_name: "Back-end Developer",
      description: "працюють над серверною частиною додатків",
      parent_id: 2,
    },
  ]);
};
