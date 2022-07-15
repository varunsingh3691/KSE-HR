import { createContext, useState } from 'react';

const AuthContext = createContext({
	token: '',
	isLoggedIn: false,
	login: (token) => {},
	logout: () => {}
});

export const AuthContextProvider = (props) => {
	const initialToken = localStorage.getItem('token');
	const [ token, setToken ] = useState(initialToken);
	const userIsLoggedIn = !!token;

	const loginHandler = (token) => {
		localStorage.setItem('token', token);
		setToken(token);
	};
	const registerHandler = (token) => {
		localStorage.setItem('token', token);
		setToken(token);
	};
	const logoutHandler = () => {
		setToken(null);
		localStorage.clear();
	};
	const contextValue = {
		token: token,
		isLoggedIn: userIsLoggedIn,
		login: loginHandler,
		logout: logoutHandler,
		register: registerHandler
	};
	return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};
export default AuthContext;
