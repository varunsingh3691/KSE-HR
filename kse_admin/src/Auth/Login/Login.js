import LoginForm from './LoginForm';
import { Container } from 'react-bootstrap';

const Login = (props) => {
	return (
		<Container>
			<h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">Admin Login</h1>
			<LoginForm />
		</Container>
	);
};

export default Login;
