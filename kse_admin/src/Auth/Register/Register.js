import React from 'react';
import { Container } from 'react-bootstrap';
import RegistrationForm from './RegisterationForm';

const Register = () => {
	return (
		<Container>
			<h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">Register</h1>
			<RegistrationForm />
		</Container>
	);
};

export default Register;
