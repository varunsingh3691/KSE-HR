import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase-config';
import AuthContext from '../store/auth-context';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginForm = (props) => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ showPassword, setShowPassword ] = useState('password');
	const navigate = useNavigate();
	const navigateToRegister = () => {
		navigate('/register');
	};
	const authCtx = useContext(AuthContext);
	const loginSubmitHandler = async (e) => {
		e.preventDefault();
		//TODO enter validation for password
		try {
			signInWithEmailAndPassword(auth, email, password)
				.then((creds) => {
					const tokenData = creds._tokenResponse;
					const expirationTime = new Date(new Date().getTime() + +tokenData.expiresIn * 1000);
					authCtx.login(tokenData.idToken, expirationTime.toISOString());
					navigate('/home');
				})
				.catch((error) => {
					console.log(error);
				});
			// const url =
			// 	'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAsSFz0MgqjCmQOsOy-4oVyS_ude0yiRgU';

			// const response = await axios.post(url, {
			// 	email: email,
			// 	password: password,
			// 	returnSecureToke: true
			// });
			// console.log(response);

			// //TODO add notification feature for proper messages
			// if (response.status === 200) {
			// 	authCtx.login(response.data.idToken);
			// 	console.log('logged in');
			// 	navigate('/home ');
			// }

			setEmail('');
			setPassword('');
		} catch (error) {
			console.log(error); //TODO notification
		}
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
