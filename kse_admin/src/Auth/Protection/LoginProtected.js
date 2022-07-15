import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../store/auth-context';
const LoginProtected = (props) => {
	// const location = useLocation();
	const authCtx = useContext(AuthContext);
	return authCtx.isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};
export default LoginProtected;
