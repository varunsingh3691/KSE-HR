import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../store/auth-context';

import SidebarLayout from '../../components/Layout/SidebarLayout';
const LoginProtected = (props) => {
	// const location = useLocation();
	const authCtx = useContext(AuthContext);
	return authCtx.isLoggedIn ? <SidebarLayout /> : <Navigate to="/" replace />;
};
export default LoginProtected;
