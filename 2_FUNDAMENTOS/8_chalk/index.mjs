import chalk from "chalk";

const nota = 5;

console.log(chalk.green("Teste"));

if (nota >= 7) {
  console.log(chalk.green.bold("Parabéns, você foi aprovado!"));
} else {
  console.log(chalk.bgRedBright.black("Você precisa fazer recuperação"));
}
