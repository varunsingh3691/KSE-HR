import { NavLink } from 'react-router-dom';
import { FaBars, FaHome, FaUser } from 'react-icons/fa';
import { MdMessage } from 'react-icons/md';
import { BiAnalyse } from 'react-icons/bi';
import { AiFillHeart } from 'react-icons/ai';
import { BsCartCheck } from 'react-icons/bs';
import { Fragment, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SidebarMenu from './SidebarMenu';
import './Sidebar.css';
const routes = [
	{
		path: '/users',
		name: 'Users',
		icon: <FaUser />
	},
	{
		path: '/messages',
		name: 'Messages',
		icon: <MdMessage />
	},
	{
		path: '/analytics',
		name: 'Analytics',
		icon: <BiAnalyse />
	},
	{
		path: '/order',
		name: 'Order',
		icon: <BsCartCheck />
	},

	{
		path: '/saved',
		name: 'Saved',
		icon: <AiFillHeart />
	}
	// {
	// 	path: '/settings',
	// 	name: 'Settings',
	// 	icon: <BiCog />,
	// 	exact: true,
	// 	subRoutes: [
	// 		{
	// 			path: '/settings/profile',
	// 			name: 'Profile ',
	// 			icon: <FaUser />
	// 		},
	// 		{
	// 			path: '/settings/2fa',
	// 			name: '2FA',
	// 			icon: <FaLock />
	// 		},
	// 		{
	// 			path: '/settings/billing',
	// 			name: 'Billing',
	// 			icon: <FaMoneyBill />
	// 		}
	// 	]
	// }
];

const Sidebar = ({ children }) => {
	const [ isOpen, setIsOpen ] = useState(false);
	const toggle = () => setIsOpen(!isOpen);
	const showAnimation = {
		hidden: {
			width: 0,
			opacity: 0,
			transition: {
				duration: 0.5
			}
		},
		show: {
			opacity: 1,
			width: 'auto',
			transition: {
				duration: 0.5
			}
		}
	};

	return (
		<Fragment>
			<div className="main-container">
				<motion.div
					animate={{
						width: isOpen ? '200px' : '45px',

						transition: {
							duration: 0.5,
							type: 'spring',
							damping: 10
						}
					}}
					className={`sidebar `}
				>
					<div className="top_section">
						<AnimatePresence>
							{isOpen && (
								<motion.h1
									variants={showAnimation}
									initial="hidden"
									animate="show"
									exit="hidden"
									className="logo"
								>
									KSE
								</motion.h1>
							)}
						</AnimatePresence>

						<div className="bars">
							<FaBars onClick={toggle} />
						</div>
					</div>

					<section className="routes">
						{routes.map((route, index) => {
							if (route.subRoutes) {
								return (
									<SidebarMenu
										setIsOpen={setIsOpen}
										route={route}
										showAnimation={showAnimation}
										isOpen={isOpen}
									/>
								);
							}

							return (
								<NavLink
									to={route.path}
									key={index}
									className={(navData) => (navData.isActive ? 'link active' : 'link')}
								>
									<div className="icon">{route.icon}</div>
									<AnimatePresence>
										{isOpen && (
											<motion.div
												variants={showAnimation}
												initial="hidden"
												animate="show"
												exit="hidden"
												className="link_text"
											>
												{route.name}
											</motion.div>
										)}
									</AnimatePresence>
								</NavLink>
							);
						})}
					</section>
				</motion.div>

				<main>{children}</main>
			</div>
		</Fragment>
	);
};

export default Sidebar;
