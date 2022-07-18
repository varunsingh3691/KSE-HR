import { Button, Col, Form, Row, Container } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState, useContext } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import './Register.css';
import { useEffect } from 'react';
import AuthContext from '../store/auth-context';
import { auth, db } from '../../firebase-config';
import { doc, setDoc, getDocs, collection } from 'firebase/firestore';
const RegistrationForm = (props) => {
	const [ showPassword, setShowPassword ] = useState('password');
	const [ userData, setUserData ] = useState({
		email: '',
		password: '',
		fullName: '',
		address: '',
		mobile: '',
		gender: '',
		doj: null,
		type: 3,
		HODDept: '',
		teachingDept: ''
	});
	const [ preExistingHODs, setPreExistingHODs ] = useState([]);
	const [ isHOD, setIsHOD ] = useState(false);
	const navigate = useNavigate();
	// const currentCollection = collection(db, 'Users');
	const navigateToLogin = () => {
		navigate('/login');
	};
	useEffect(() => {
		const fetchData = async () => {
			const querySnapshot = await getDocs(collection(db, 'HOD'));
			setPreExistingHODs(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
		};
		fetchData();
	}, []);
	const authCtx = useContext(AuthContext);

	const submitHandler = async (e) => {
		e.preventDefault();

		//TODO add handling for null values in dropdowns
		//TODO enter validation for password

		try {
			if (isHOD) {
				console.log(preExistingHODs);
				preExistingHODs.forEach((HOD) => {
					if (HOD.hod_of_department === userData.HODDept && HOD.is_valid) {
						throw new Error('HOD already assigned');
					}
				});
			}
			const response = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
			if (isHOD) {
				await setDoc(doc(db, 'HOD', response.user.email), {
					address: userData.address,
					date_of_joining: userData.doj,
					email: userData.email,
					full_name: userData.fullName,
					gender: userData.gender,
					is_valid: true,
					user_type_ID: 2,
					user_ID: response.user.uid,
					hod_of_department: userData.HODDept,
					teaching_dept: userData.teachingDept
				});
			}

			const userDetailsStored = await setDoc(doc(db, 'Users', response.user.email), {
				address: userData.address,
				date_of_joining: userData.doj,
				email: userData.email,
				full_name: userData.fullName,
				gender: userData.gender,
				is_valid: true,
				user_type_ID: isHOD ? 2 : 3,
				user_ID: response.user.uid,
				teaching_dept: userData.teachingDept
			});
			if (userDetailsStored) {
				console.log('User Details Stored'); //TODO notification
			}
			setUserData({
				email: '',
				password: '',
				fullName: '',
				address: '',
				mobile: '',
				gender: '',
				dob: null,
				doj: null,
				type: '',
				HODDept: ''
			});
			//TODO add notification feature for proper messages
			navigateToLogin();
		} catch (error) {
			console.log(error); //TODO notification !important
		}
	};

	return (
		<Row className="mt-5">
			<Col lg={6} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
				<Form>
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
							<option value={null}>Select</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
						</Form.Select>
					</FloatingLabel>
					<FloatingLabel
						className="mb-3"
						controlId="floatingTeachingDept"
						label="Select Department you are teaching"
					>
						<Form.Select
							onChange={(e) => {
								setUserData((prev) => {
									return { ...prev, teachingDept: e.target.value };
								});
							}}
							aria-label="Floating label select example"
						>
							<option value={null}>Select</option>
							<option value="Computer">Computer</option>
							<option value="ENTC">ENTC</option>
							<option value="Mechanical">Mechanical</option>
						</Form.Select>
					</FloatingLabel>
					<DatePicker
						placeholderText="Date Of Joining"
						className="form-control mb-3"
						selected={userData.doj}
						onChange={(date) => {
							setUserData((prev) => {
								return { ...prev, doj: date };
							});
						}}
					/>
					<Container className="p-1 rounded">
						<Form.Check
							inline
							value={isHOD}
							onChange={(e) => {
								setIsHOD(!isHOD);
							}}
							label="HOD"
							name="group1"
							type="checkbox"
							id={`isHOD`}
						/>
						{isHOD ? (
							<FloatingLabel className="mb-3" controlId="floatingHODDept" label="Select Department">
								<Form.Select
									onChange={(e) => {
										setUserData((prev) => {
											return { ...prev, HODDept: e.target.value };
										});
									}}
									aria-label="Floating label select example"
								>
									<option value={null}>Select</option>
									<option value="Computer">Computer</option>
									<option value="ENTC">ENTC</option>
									<option value="Mechanical">Mechanical</option>
								</Form.Select>
							</FloatingLabel>
						) : null}
					</Container>
					<Container className="mt-3 p-0">
						<Button onClick={submitHandler} variant="primary btn-block" type="button">
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
