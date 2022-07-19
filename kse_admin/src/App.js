import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Auth/Login/Login';
import Home from './components/Home/Home';
import Register from './Auth/Register/Register';
import LoginProtected from './Auth/Protection/LoginProtected';
import PublicRoutes from './Auth/Protection/PublicRoutes';
import Missing from './components/Missing';
function App() {
	return (
		<Routes>
			{/* public routes */}
			<Route element={<PublicRoutes />}>
				<Route path="/" element={<Login />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Route>
			{/* protected routes */}
			<Route element={<LoginProtected />}>
				<Route path="/*" element={<Missing />} />
				<Route path="/users" element={<Home />} />
				<Route path="/users" element={<Home />} />
				<Route path="/users" element={<Home />} />
			</Route>
		</Routes>
	);
}

export default App;
