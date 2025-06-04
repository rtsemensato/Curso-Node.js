import React, { useContext, useState } from 'react';
import styles from '../../form/Form.module.css';
import Input from '../../form/Input';
import { Link } from 'react-router-dom';
import { Context } from '../../../context/UserContext';

function Register() {
	const { register } = useContext(Context);

	const [user, setUser] = useState({});

	const handleChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		//enviar o usuário para o banco
		register(user);
	};

	return (
		<section className={styles.form_container}>
			<h1>Register</h1>
			<form onSubmit={handleSubmit}>
				<Input
					text="Nome"
					type="text"
					name="name"
					placeholder="Digite o seu nome"
					value={user.name}
					handleOnChange={handleChange}
				/>
				<Input
					text="Telefone"
					type="text"
					name="phone"
					placeholder="Digite o seu telefone"
					value={user.phone}
					handleOnChange={handleChange}
				/>
				<Input
					text="E-mail"
					type="email"
					name="email"
					placeholder="Digite o seu e-mail"
					value={user.email}
					handleOnChange={handleChange}
				/>
				<Input
					text="Senha"
					type="password"
					name="password"
					placeholder="Digite a sua senha"
					value={user.password}
					handleOnChange={handleChange}
				/>
				<Input
					text="Confirmação de senha"
					type="password"
					name="confirmpassword"
					placeholder="Confirme a sua senha"
					value={user.confirmpassword}
					handleOnChange={handleChange}
				/>
				<input type="submit" value="Cadastrar" />
			</form>
			<p>
				Já tem conta? <Link to="/login">Clique aqui.</Link>
			</p>
		</section>
	);
}

export default Register;
