import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase-config';
import AuthContext from '../store/auth-context';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
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
			const response = await signInWithEmailAndPassword(auth, email, password);

			const tokenData = response._tokenResponse;
			const expirationTime = new Date(new Date().getTime() + +tokenData.expiresIn * 1000);

			const docRef = doc(db, 'Users', email);
			const userVerificaion = await getDoc(docRef);
			if (!userVerificaion.exists()) {
				console.log('No such document!'); //TODO no such user notification
			}
			const userDetails = userVerificaion.data();

			authCtx.storeData(userDetails.user_ID, userDetails.teaching_dept, userDetails.user_type_ID);
			authCtx.login(tokenData.idToken, expirationTime.toISOString());
			if (userDetails.user_type_ID === 2) {
				const hodDocRef = doc(db, 'HOD', email);
				const hodVerification = await getDoc(hodDocRef);
				if (!hodVerification.exists()) {
					console.log('No such document!'); //TODO no such user hod contact support
				}
				const hodDetails = hodVerification.data();
				console.log(hodDetails);
				localStorage.setItem('HOD', hodDetails.hod_of_department);
			}
			navigate('/home');

			// //TODO add notification feature for proper messages
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
