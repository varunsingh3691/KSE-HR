import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const LoginForm = (props) => {
	const [ email, setEmail ] = useState('');
	const [ showPassword, setShowPassword ] = useState('password');
	const [ password, setPassword ] = useState('');

	const navigate = useNavigate();

	const navigateToRegister = () => {
		navigate('/register');
	};
	const loginSubmitHandler = (e) => {
		e.preventDefault();
		console.log(email, password);
	};

	return (
		<Row className="mt-5">
			<Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
				<Form onSubmit={loginSubmitHandler}>
					<FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
						<Form.Control
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							type="email"
							placeholder="name@example.com"
						/>
					</FloatingLabel>
					<FloatingLabel className="mb-2" controlId="floatingPassword" label="Password">
						<Form.Control
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							type={showPassword}
							placeholder="Password"
						/>
					</FloatingLabel>
					<Form.Group className="mb-3" controlId="formBasicCheckbox">
						<Form.Check
							onChange={(e) => {
								if (showPassword === 'password') {
									setShowPassword('text');
								} else {
									setShowPassword('password');
								}
							}}
							type="switch"
							id="custom-switch"
							label="Show Password"
						/>
					</Form.Group>

					<Container className="mt-3 p-0">
						<Button variant="success btn-block" type="submit">
							Login
						</Button>
						<span> </span>
						<Button onClick={navigateToRegister} className="ml-3" variant="outline-primary">
							Register
						</Button>
					</Container>
				</Form>
			</Col>
		</Row>
	);
};

export default LoginForm;
