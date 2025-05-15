const minimist = require("minimist");

const args = minimist(process.argv.slice(2));

console.log("args: ", args);

const nome = args["nome"];
const profissao = args["profissao"];

console.log(nome);
console.log(profissao);

console.log(`O nome dele é ${nome} e sua profissão é ${profissao}`);
