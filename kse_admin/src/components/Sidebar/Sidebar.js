import React, { useState, useContext } from 'react';

//import react pro sidebar components
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';

//import icons from react icons
import { FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi';
import { GoDashboard } from 'react-icons/go';
import { FcLeave } from 'react-icons/fc';
import { FiUsers } from 'react-icons/fi';
import { FiSettings } from 'react-icons/fi';
import { BsFillCalendarCheckFill } from 'react-icons/bs';
import { FaBuromobelexperte } from 'react-icons/fa';
//import sidebar css from react-pro-sidebar module and our custom css
import 'react-pro-sidebar/dist/css/styles.css';
import './Sidebar.css';
import AuthContext from '../../Auth/store/auth-context';

const items = [
	{
		name: 'Dashboard',
		icon: <GoDashboard />,
		isActive: true
	},
	{
		name: 'On Leaves',
		icon: <FcLeave />,
		isActive: false
	},
	{
		name: 'Users',
		icon: <FiUsers />,
		isActive: false
	},
	{
		name: 'Settings',
		icon: <FiSettings />,
		isActive: false
	},
	{
		name: 'Leaves',
		icon: <BsFillCalendarCheckFill />,
		isActive: false
	},
	{
		name: 'Apply',
		icon: <FaBuromobelexperte />,
		isActive: false
	}
];
const Sidebar = () => {
	const [ menuCollapse, setMenuCollapse ] = useState(false);

	const authCtx = useContext(AuthContext);
	//create a custom function that will change menucollapse state from false to true and true to fals
	const menuIconClick = () => {
		//condition checking to change state from true to false and vice versa
		menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
	};
	const menuItems = items.map((item) => {
		return (
			<MenuItem active={item.isActive} icon={item.icon}>
				{item.name}
			</MenuItem>
		);
	});
	const logoutHandler = () => {
		authCtx.logout();
	};
	return (
		<div id="header">
			<ProSidebar collapsed={menuCollapse}>
				<SidebarHeader>
					<div className="logotext">
						{/* small and big change using menucollapse state */}
						<p>{menuCollapse ? 'Logo' : 'Big Logo'}</p>
					</div>
					<div className="closemenu" onClick={menuIconClick}>
						{menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
					</div>
				</SidebarHeader>
				<SidebarContent>
					<Menu iconShape="square">{menuItems}</Menu>
				</SidebarContent>
				<SidebarFooter>
					<Menu iconShape="square">
						<MenuItem onClick={logoutHandler} icon={<FiLogOut />}>
							Logout
						</MenuItem>
					</Menu>
				</SidebarFooter>
			</ProSidebar>
		</div>
	);
};

export default Sidebar;
