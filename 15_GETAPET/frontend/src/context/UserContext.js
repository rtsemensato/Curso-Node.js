import React, { createContext } from 'react';

import useAuth from '../hooks/useAuth';

const Context = createContext();

function UserProvider({ children }) {
	const { register, authenticated, login, logout } = useAuth();

	return <Context.Provider value={{ register, authenticated, login, logout }}>{children}</Context.Provider>;
}

export { Context, UserProvider };
