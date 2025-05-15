import chalk from "chalk";
import inquirer from "inquirer";

inquirer
  .prompt([
    {
      name: "nome",
      message: "Insira seu nome: ",
    },
    {
      name: "idade",
      message: "Insira sua idade: ",
    },
  ])
  .then((answers) => {
    if (!answers.nome) throw new Error("O nome é obrigatório");
    if (!answers.idade) throw new Error("A idade é obrigatória");

    console.log(
      chalk.bgYellow.black.bold(
        `O nome do usuário é ${answers.nome} e sua idade é ${answers.idade} anos.`
      )
    );
  })
  .catch((err) => console.log(chalk.bgRed.black(`Erro: ${err}`)));
