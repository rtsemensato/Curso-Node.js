import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
	return (
		<nav>
			<ul>
				<li>
					<Link to="/">Adotar</Link>
				</li>
				<li>
					<Link to="/login">Entrar</Link>
				</li>
				<li>
					<Link to="/register">Cadastrar</Link>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;
