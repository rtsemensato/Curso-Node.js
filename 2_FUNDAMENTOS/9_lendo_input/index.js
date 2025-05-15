const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question(
  "Qual sua linguagem de programação favorita? ",
  (language) => {
    if (language.toUpperCase() === "JAVA") {
      console.log("Poxa, que triste saber que vc já morreu por dentro =(");
    } else {
      console.log(`A minha linguagem de programação favorita é ${language}`);
    }

    readline.close();
  }
);
