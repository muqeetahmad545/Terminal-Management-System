import { ChevronRight, LogOut, Menu, Sparkles } from 'lucide-react';
import './styles.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { decodeToken } from 'react-jwt';
import { DecodedTokenInterface } from '../routes/ProtectedRoutes';
import { sidebarLinks } from '../../data/fakeData/SidebarLinks';

const SideBar = () => {
	const token = localStorage.getItem('token') || '';
	//? STATES
	const [isCollapsed, setIsCollapsed] = useState(false);

	//? Hooks
	const itemTextRef = useRef<(HTMLSpanElement | null)[]>([]);
	const mainSideBarRef = useRef<HTMLDivElement | null>(null);
	const decoded = decodeToken<DecodedTokenInterface>(token);
	const navigate = useNavigate();

	if (!decoded) {
		console.log('Token is still being decoded or is invalid.');
		// return null; // or a loading spinner if needed
	}
	// const role = decoded.role;
	const role = localStorage.getItem('role') || '';

	const RoleBasedMenus = sidebarLinks.filter((item) =>
		item.roles.includes(role),
	);

	//? HANDLERS
	const onMenuCollapse = () => {
		const maincontent = document.querySelector(
			'.main-content',
		) as HTMLElement | null;
		setIsCollapsed((prev) => !prev); // Toggle collapse state

		if (mainSideBarRef.current) {
			mainSideBarRef.current.style.width = isCollapsed ? '250px' : '80px';
			// Check if maincontent exists before updating its style
			if (maincontent) {
				maincontent.style.width = isCollapsed
					? 'calc(100% - 250px)'
					: 'calc(100% - 80px)';
			}
		}
	};
	return (
		<>
			<div
				ref={mainSideBarRef}
				className='main-sidebar w-[250px] fixed left-[0px] top-[0px] h-full theme-color transition-all ease-in-out delay-75'
			>
				<div className='relative flex items-center px-4 py-4 font-medium text-white brand'>
					<Sparkles className='inline-block mr-2 ' />
					{!isCollapsed && (
						<span
							className='transition-all delay-500 brand-name'
							style={{ minWidth: '100px', overflow: 'hidden' }}
						>
							Terminal
						</span>
					)}

					<span
						onClick={onMenuCollapse}
						className='absolute -translate-y-1/2 cursor-pointer right-2 top-1/2 handler'
					>
						{isCollapsed ? <ChevronRight size={20} /> : <Menu size={20} />}
					</span>
				</div>
				<ul className='relative mt-10'>
					{RoleBasedMenus.map((item, index) => (
						<li
							key={index}
							className='mb-5 text-white rounded-sm cursor-pointer item-list'
						>
							<NavLink
								className={({ isActive }) =>
									`flex items-center px-5  gap-4 p-2 rounded-sm ${
										isActive ? 'active-menu' : ''
									}`
								}
								to={item.url}
							>
								<span style={{ minWidth: '20px' }}>{item.icon}</span>
								<span
									className={`transition-all item-text ${
										isCollapsed ? 'hidden opacity-0' : 'block opacity-100'
									}`}
									ref={(el) => (itemTextRef.current[index] = el)} // Set ref for each element
								>
									{item.text}
								</span>
							</NavLink>
						</li>
					))}

					<li
						className='absolute bottom-0 flex items-center gap-3 p-2 px-5 text-white cursor-pointer'
						onClick={() => {
							localStorage.clear();
							navigate('/sign-in');
						}}
					>
						<LogOut size={20} />{' '}
						<span
							className={`transition-all item-text ${
								isCollapsed ? 'hidden opacity-0' : 'block opacity-100'
							}`}
						>
							Logout
						</span>
					</li>
				</ul>
			</div>
		</>
	);
};

export default SideBar;
