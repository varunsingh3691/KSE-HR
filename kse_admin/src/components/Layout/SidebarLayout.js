import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';

const SidebarLayout = (props) => {
	return (
		<Fragment>
			<Sidebar>
				<Outlet />
			</Sidebar>
		</Fragment>
	);
};

export default SidebarLayout;
