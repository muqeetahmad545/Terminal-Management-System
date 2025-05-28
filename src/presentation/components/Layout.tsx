import { ReactNode } from 'react';
import SideBar from './SideBar';
import Navbar from './Navbar';

interface LayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<div className=' sample-page'>
				<SideBar />
				<div className='float-right transition-all ease-in-out delay-75 rounded-md bg-gray-50 main-content'>
					<Navbar />
					<div className='px-[15px]  content h-screen '>{children}</div>
				</div>
			</div>
		</>
	);
};

export default Layout;
