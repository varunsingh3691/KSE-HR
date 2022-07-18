import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Sidebar from '../Sidebar/Sidebar';
import DefinedRoutes from '../../Auth/Protection/DefinedRoutes';

const Home = () => {
	return (
		<div>
			<Sidebar>
				<DefinedRoutes />
			</Sidebar>
		</div>
	);
};

export default Home;
