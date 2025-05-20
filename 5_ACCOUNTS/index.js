//core modules
const fs = require('fs');

//módulos externos
const chalk = require('chalk');
const inquirer = require('inquirer');

operation();

function operation() {
	inquirer
		.prompt([
			{
				type: 'list',
				name: 'action',
				message: 'O que você deseja fazer? ',
				choices: ['Criar Conta', 'Consultar Saldo', 'Depositar', 'Sacar', 'Sair'],
			},
		])
		.then((answer) => {
			const action = answer.action;

			switch (action.toUpperCase()) {
				case 'CRIAR CONTA':
					createAccount();
					break;
				case 'CONSULTAR SALDO':
					consultBalance();
					break;
				case 'DEPOSITAR':
					deposit();
					break;
				case 'SACAR':
					withdraw();
					break;
				case 'SAIR':
					exitApp();
					break;
				default:
					console.log(chalk.bgRed.black('Ação inválida'));
					operation();
					return;
			}
		})
		.catch((err) => {
			console.log(err);
		});
}

function createAccount() {
	console.log(chalk.bgGreen.black('Parabéns por escolher nosso banco!'));
	console.log(chalk.green('Defina as opções da sua conta a seguir'));

	builtAccount();
}

function builtAccount() {
	inquirer
		.prompt([
			{
				name: 'accountName',
				message: 'Digite um nome para sua conta: ',
			},
		])
		.then((answer) => {
			const accountName = answer.accountName;
			console.info(accountName);

			if (!fs.existsSync('accounts')) {
				fs.mkdirSync('accounts');
			}

			if (fs.existsSync(`./accounts/${accountName.toLowerCase()}.json`)) {
				console.log(chalk.bgRed.black('Essa conta já existe, escolha outro nome!'));
				builtAccount();
				return;
			}

			fs.writeFileSync(`./accounts/${accountName.toLowerCase()}.json`, '{"balance": 0}', (err) =>
				console.log(err)
			);

			console.log(chalk.green('Parabéns, a sua conta foi criada!'));
			operation();
		})
		.catch((err) => {
			console.log(err);
		});
}

function deposit() {
	inquirer
		.prompt([
			{
				name: 'accountName',
				message: 'Qual o nome da sua conta? ',
			},
		])
		.then((answer) => {
			const accountName = answer.accountName;

			if (!checkAccount(accountName)) {
				deposit();
				return;
			}

			inquirer
				.prompt([
					{
						name: 'amount',
						message: 'Quanto você deseja depositar? ',
					},
				])
				.then((answer) => {
					const amount = answer.amount;

					addAmount(accountName, amount);
				})
				.catch((err) => console.log(err));
		})
		.catch((err) => console.log(err));
}

function consultBalance() {
	inquirer
		.prompt([
			{
				name: 'accountName',
				message: 'Qual o nome da sua conta? ',
			},
		])
		.then((answer) => {
			const accountName = answer.accountName;

			if (!checkAccount(accountName)) {
				consultBalance();
				return;
			}

			const accountData = getAccount(accountName);

			console.log(
				chalk.bgBlue.black(
					`O saldo da sua conta é: ${new Intl.NumberFormat('pt-BR', {
						style: 'currency',
						currency: 'BRL',
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					}).format(accountData.balance)}`
				)
			);
			operation();
		})
		.catch((err) => console.log(err));
}

function withdraw() {
	inquirer
		.prompt([
			{
				name: 'accountName',
				message: 'Qual o nome da sua conta? ',
			},
		])
		.then((answer) => {
			const accountName = answer.accountName;

			if (!checkAccount(accountName)) {
				withdraw();
				return;
			}

			inquirer
				.prompt([
					{
						name: 'amount',
						message: 'Quanto você deseja sacar? ',
					},
				])
				.then((answer) => {
					const amount = answer.amount;

					removeAmount(accountName, amount);
				})
				.catch((err) => console.log(err));
		})
		.catch((err) => console.log(err));
}

function exitApp() {
	console.log(chalk.bgBlue.black('Obrigado por utilizar o Accounts!'));
	process.exit();
}

function checkAccount(accountName) {
	if (!fs.existsSync(`accounts/${accountName.toLowerCase()}.json`)) {
		console.log(chalk.bgRed.black('Esta conta não existe, escolha outro nome!'));
		return false;
	}

	return true;
}

function addAmount(accountName, amount) {
	const accountData = getAccount(accountName);

	if (!amount) {
		console.log(chalk.bgRed.black('Ocorreu um erro! Tente novamente mais tarde'));
		return deposit();
	}

	accountData.balance = parseFloat(accountData.balance) + parseFloat(amount);

	fs.writeFileSync(`accounts/${accountName.toLowerCase()}.json`, JSON.stringify(accountData), (err) =>
		console.log(err)
	);

	console.log(
		chalk.green(
			`Foi depositado o valor de ${new Intl.NumberFormat('pt-BR', {
				style: 'currency',
				currency: 'BRL',
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			}).format(amount)} na sua conta!`
		)
	);

	return operation();
}

function removeAmount(accountName, amount) {
	const accountData = getAccount(accountName);

	if (!amount) {
		console.log(chalk.bgRed.black('Ocorreu um erro! Tente novamente mais tarde'));
		return operation();
	}

	if (accountData.balance < amount) {
		console.log(chalk.bgRed.black('Saldo da conta insuficiente, escolha uma quantia menor para sacar!'));
		return withdraw();
	}

	accountData.balance = parseFloat(accountData.balance) - parseFloat(amount);

	fs.writeFileSync(`accounts/${accountName.toLowerCase()}.json`, JSON.stringify(accountData), (err) =>
		console.log(err)
	);

	console.log(
		chalk.green(
			`Foi realizado um saque no valor de ${new Intl.NumberFormat('pt-BR', {
				style: 'currency',
				currency: 'BRL',
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			}).format(amount)} da sua conta!`
		)
	);

	return operation();
}

function getAccount(accountName) {
	const accountJSON = fs.readFileSync(`accounts/${accountName.toLowerCase()}.json`, {
		encoding: 'utf8',
		flag: 'r',
	});

	return JSON.parse(accountJSON);
}
