import React, { useState, useContext } from 'react';
import styles from '../../form/Form.module.css';
import { Context } from '../../../context/UserContext';
import Input from '../../form/Input';
import { Link } from 'react-router-dom';

function Login() {
	const { login } = useContext(Context);
	const [user, setUser] = useState({});

	const handleChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		login(user);
	};

	return (
		<section className={styles.form_container}>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
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
				<input type="submit" value="Entrar" />
			</form>
			<p>
				Não tem conta? <Link to="/register">Clique aqui.</Link>
			</p>
		</section>
	);
}

export default Login;
