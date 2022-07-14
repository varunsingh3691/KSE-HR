import './App.css';
import React from 'react';

import { Route, Routes } from 'react-router-dom';
import Login from './Auth/Login/Login';
import Register from './Auth/Register/Register';
import Home from './components/Home/Home';
import Layout from './components/Layout';
import Missing from './components/Missing';
function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				{/* public routes */}
				<Route path="/" element={<Login />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				{/* protected routes */}
				<Route path="/Home" element={<Home />} />
				{/*catch all others*/}
				<Route path="/*" element={<Missing />} />
			</Route>
		</Routes>
	);
}

export default App;
