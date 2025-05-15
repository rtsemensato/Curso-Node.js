import chalk from "chalk";
import inquirer from "inquirer";

inquirer
  .prompt([
    {
      name: "Nome",
      message: "Insira seu nome: ",
    },
    {
      name: "Idade",
      message: "Insira sua idade: ",
    },
  ])
  .then((answers) => {
    console.log(
      chalk.bgYellow.black.bold(
        `O nome do usuário é ${answers["Nome"]}. Ele tem ${answers["Idade"]}`
      )
    );
  })
  .catch((err) => console.log(chalk.bgRed.black(`Erro: ${err}`)));
