import { Button, Col, Form, Row, Container } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

const RegistrationForm = (props) => {
	const [ selectedDOB, setSelectedDOB ] = useState(null);
	const [ selectedDOJ, setSelectedDOJ ] = useState(null);
	// const [ userData, setUserData ] = useState();
	const navigate = useNavigate();
	const [ showPassword, setShowPassword ] = useState('password');
	const navigateToLogin = () => {
		navigate('/login');
	};
	const onSubmitHandler = (e) => {
		e.preventDefault();
	};
	const typeSelectHandler = (e) => {
		console.log(e.target.value);
	};
	return (
		<Row className="mt-5">
			<Col lg={6} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
				<Form onSubmit={onSubmitHandler}>
					<FloatingLabel controlId="floatingInputEmail" label="Email address" className="mb-3">
						<Form.Control type="email" placeholder="name@example.com" />
					</FloatingLabel>

					<FloatingLabel controlId="floatingInputName" label="Full Name" className="mb-3">
						<Form.Control type="text" placeholder="Password" />
					</FloatingLabel>

					<FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
						<Form.Control type={showPassword} placeholder="Password" />
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
						<Form.Control type="email" placeholder="name@example.com" />
					</FloatingLabel>

					<FloatingLabel controlId="floatingInputMobile" label="Mobile" className="mb-3">
						<Form.Control type="email" placeholder="name@example.com" />
					</FloatingLabel>
					<FloatingLabel className="mb-3" controlId="floatingSelect" label="Gender">
						<Form.Select aria-label="Floating label select example">
							<option>Select</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
						</Form.Select>
					</FloatingLabel>
					<label htmlFor="dob">Date of Birth</label>
					<DatePicker
						id="dob"
						className="form-control mb-3"
						selected={selectedDOB}
						onChange={(date) => {
							setSelectedDOB(date);
						}}
					/>
					<label htmlFor="doj">Date of Joining</label>
					<DatePicker
						id="doj"
						className="form-control mb-3"
						selected={selectedDOJ}
						onChange={(date) => {
							setSelectedDOJ(date);
						}}
					/>
					<FloatingLabel className="mb-3" controlId="floatingSelectType" label="Gender">
						<Form.Select onChange={typeSelectHandler} aria-label="Floating label select example">
							<option>Select</option>
							<option value="Admin">Admin</option>
							<option value="HOD">HOD</option>
							<option value="Teacher">Teacher</option>
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
