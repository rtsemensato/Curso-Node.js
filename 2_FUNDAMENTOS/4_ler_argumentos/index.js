console.log(process.argv);

const args = process.argv.splice(2);

const nome = args[0].split("=")[1];
const idade = args[1].split("=")[1];

console.log(`O nome dele é ${nome} e ele tem ${idade} anos!`);
