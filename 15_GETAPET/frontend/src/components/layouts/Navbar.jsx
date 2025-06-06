import React, { useContext } from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import Logo from '../../assets/img/logo.png';
import { Context } from '../../context/UserContext';

function Navbar() {
	const { authenticated, logout } = useContext(Context);

	return (
		<nav className={styles.navbar}>
			<div className={styles.navbar_logo}>
				<img src={Logo} alt="Get A Pet" />
			</div>
			<h2>Get A Pet</h2>
			<ul>
				<li>
					<Link to="/">Adotar</Link>
				</li>
				{authenticated && (
					<>
						<Link to="/user/profile">Perfil</Link>
						<li onClick={logout}>Sair</li>
					</>
				)}
				{!authenticated && (
					<>
						<li>
							<Link to="/login">Entrar</Link>
						</li>
						<li>
							<Link to="/register">Cadastrar</Link>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
}

export default Navbar;
