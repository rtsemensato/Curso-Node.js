const inquirer = require("inquirer");

inquirer
  .prompt([
    { name: "p1", message: "Qual a primeira nota? " },
    { name: "p2", message: "Qual a segunda nota? " },
  ])
  .then((answers) => {
    console.log(answers);
    const media = (parseFloat(answers.p1) + parseFloat(answers.p2)) / 2;

    console.log(`A média das notas é ${media}`);
  })
  .catch((err) => console.log(err));
