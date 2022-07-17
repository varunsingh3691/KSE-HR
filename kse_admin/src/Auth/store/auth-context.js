import { createContext, useState, useEffect, useCallback } from 'react';
let logoutTimer;
const AuthContext = createContext({
	token: '',
	isLoggedIn: false,
	login: (token) => {},
	logout: () => {}
});
const calculateRemainingTime = (expirationTime) => {
	const currentTime = new Date().getTime();
	const adjExpirationTime = new Date(expirationTime).getTime();
	const remainingDuration = adjExpirationTime - currentTime;
	return remainingDuration;
};
const retrieveStoredToken = () => {
	const storedToken = localStorage.getItem('token');
	const storedExpirationTime = localStorage.getItem('expirationTime');
	const remainingTime = calculateRemainingTime(storedExpirationTime);
	if (remainingTime <= 0) {
		localStorage.removeItem('token');
		localStorage.removeItem('expirationTime');
		return null;
	}
	return {
		token: storedToken,
		duration: remainingTime
	};
};
export const AuthContextProvider = (props) => {
	const tokenData = retrieveStoredToken();
	let initialToken;
	if (tokenData) {
		initialToken = tokenData.token;
	}

	const [ token, setToken ] = useState(initialToken);
	const userIsLoggedIn = !!token;

	const logoutHandler = useCallback(() => {
		setToken(null);
		localStorage.clear();
		if (logoutTimer) {
			clearTimeout(logoutTimer);
		}
	}, []);
	const loginHandler = (token, expirationTime) => {
		console.log(expirationTime);
		setToken(token);
		localStorage.setItem('token', token);
		localStorage.setItem('expirationTime', expirationTime);
		const remainingTime = calculateRemainingTime(expirationTime);
		logoutTimer = setTimeout(logoutHandler, remainingTime);
	};
	const registerHandler = (token, expirationTime) => {
		setToken(token);
		localStorage.setItem('token', token);
	};
	useEffect(
		() => {
			if (tokenData) {
				console.log(tokenData.duration);
				logoutTimer = setTimeout(logoutHandler, tokenData.duration);
			}
		},
		[ tokenData, logoutHandler ]
	);
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
