import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../store/auth-context';
import Layout from '../../components/Layout/Layout';
const LoginProtected = (props) => {
	// const location = useLocation();
	const authCtx = useContext(AuthContext);
	return !authCtx.isLoggedIn ? <Layout /> : <Navigate to="/home" replace />;
};
export default LoginProtected;
