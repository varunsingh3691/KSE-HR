import './App.css';
import React, { useEffect } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Auth/Login/Login';
import Register from './Auth/Register/Register';
function App() {
	useEffect(() => {
		return () => {
			loading();
		};
	}, []);

	const loading = (props) => {
		return <div> i am loading</div>;
	};

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
