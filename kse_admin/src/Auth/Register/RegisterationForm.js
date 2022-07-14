import { Button, Col, Form, Row, Container } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import './Register.css';
import axios from 'axios';

const RegistrationForm = (props) => {
	const [ userData, setUserData ] = useState({
		email: '',
		password: '',
		fullName: '',
		address: '',
		mobile: '',
		gender: '',
		dob: null,
		doj: null,
		type: ''
	});
	const navigate = useNavigate();
	const [ showPassword, setShowPassword ] = useState('password');

	const navigateToLogin = () => {
		navigate('/login');
	};

	const submitHandler = async (e) => {
		e.preventDefault();

		//TODO enter validation for password
		try {
			const url =
				'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAsSFz0MgqjCmQOsOy-4oVyS_ude0yiRgU';

			const response = await axios.post(url, {
				email: userData.email,
				password: userData.password,
				returnSecureToke: true
			});
			console.log(response);
			setUserData({
				email: '',
				password: '',
				fullName: '',
				address: '',
				mobile: '',
				gender: '',
				dob: null,
				doj: null,
				type: ''
			});
			//TODO add notification feature for proper messages
			if (response.status === 200) {
				console.log('user created successfully'); //TODO notification
				navigate('/login');
			}
		} catch (error) {
			console.log(error); //TODO notification
		}
	};

	return (
		<Row className="mt-5">
			<Col lg={6} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
				<Form onSubmit={submitHandler}>
					<FloatingLabel controlId="floatingInputEmail" label="Email address" className="mb-3">
						<Form.Control
							value={userData.email}
							onChange={(e) => {
								setUserData((prev) => {
									return { ...prev, email: e.target.value };
								});
							}}
							type="email"
							placeholder="name@example.com"
						/>
					</FloatingLabel>

					<FloatingLabel controlId="floatingInputName" label="Full Name" className="mb-3">
						<Form.Control
							value={userData.fullName}
							onChange={(e) => {
								setUserData((prev) => {
									return { ...prev, fullName: e.target.value };
								});
							}}
							type="text"
							placeholder="Password"
						/>
					</FloatingLabel>

					<FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
						<Form.Control
							value={userData.password}
							onChange={(e) => {
								setUserData((prev) => {
									return { ...prev, password: e.target.value };
								});
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

					<FloatingLabel controlId="floatingInputAddress" label="Address" className="mb-3">
						<Form.Control
							type="text"
							value={userData.address}
							onChange={(e) => {
								setUserData((prev) => {
									return { ...prev, address: e.target.value };
								});
							}}
							placeholder="name@example.com"
						/>
					</FloatingLabel>

					<FloatingLabel controlId="floatingInputMobile" label="Mobile" className="mb-3">
						<Form.Control
							type="number"
							value={userData.mobile}
							onChange={(e) => {
								setUserData((prev) => {
									return { ...prev, mobile: e.target.value };
								});
							}}
							placeholder="name@example.com"
						/>
					</FloatingLabel>
					<FloatingLabel className="mb-3" controlId="floatingSelect" label="Gender">
						<Form.Select
							onChange={(e) => {
								setUserData((prev) => {
									return { ...prev, gender: e.target.value };
								});
							}}
							aria-label="Floating label select example"
						>
							<option>Select</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
						</Form.Select>
					</FloatingLabel>
					<label htmlFor="dob">Date of Birth</label>
					<DatePicker
						id="dob"
						className="form-control mb-3"
						selected={userData.dob}
						onChange={(date) => {
							setUserData((prev) => {
								return { ...prev, dob: date };
							});
						}}
					/>
					<label htmlFor="doj">Date of Joining</label>
					<DatePicker
						id="doj"
						className="form-control mb-3"
						selected={userData.doj}
						onChange={(date) => {
							setUserData((prev) => {
								return { ...prev, doj: date };
							});
						}}
					/>
					<FloatingLabel className="mb-3" controlId="floatingSelectType" label="Select Position">
						<Form.Select
							onChange={(e) => {
								setUserData((prev) => {
									return { ...prev, type: e.target.value };
								});
							}}
							aria-label="Floating label select example"
						>
							<option>Select</option>
							<option value="1">Admin</option>
							<option value="2">HOD</option>
							<option value="3">Teacher</option>
						</Form.Select>
					</FloatingLabel>
					<Container className="mt-3 p-0">
						<Button variant="primary btn-block" type="submit">
							Register
						</Button>
						<span> </span>
						<Button onClick={navigateToLogin} variant="outline-success" type="button">
							Back to Login
						</Button>
					</Container>
				</Form>
			</Col>
		</Row>
	);
};

export default RegistrationForm;
