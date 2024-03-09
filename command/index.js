const { program } = require("commander");
const commandController = require("../src/controller/command");

program
  .command("createSuperadmin <login> <password>")
  .description("Create/change super admin")
  .action(async (login, password) => {
    await commandController.createSuperadmin(login, password);

    console.log("Super admin created");
  });

program.parse(process.argv);
