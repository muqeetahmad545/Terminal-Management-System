import { Moon, Settings, SunDim } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
	//? STATES
	const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
	//? HNALDERS
	const handleOnThemeToggle = (e: React.MouseEvent<HTMLSpanElement>) => {
		console.log(e.target);
		setIsDarkMode((prev) => !prev);
		document.documentElement.classList.toggle('dark');
	};
	return (
		<>
			<div className='flex items-center justify-between p-3 px-[15px] mb-5 border-b text-gray-500'>
				<div>
					<strong className='font-bold text-gray-700'>
						Terminal Management System
					</strong>
				</div>
				<div className='flex gap-3'>
					<div className='relative flex gap-1 p-1 border rounded-full items-center-md light-mode'>
						<span
							onClick={handleOnThemeToggle}
							className={`relative z-10 flex items-center w-full gap-2 p-1 px-2 text-sm cursor-pointer ${
								isDarkMode ? 'text-gray-500' : 'text-white'
							} `}
						>
							<SunDim className='inline-block' size={18} /> Light
						</span>
						<span
							style={{
								transform: `translateX(${
									isDarkMode ? '100%' : '0%'
								}) translateY(-50%)`,
							}}
							className={`absolute 
							 z-0 w-[75px] p-1 px-2 transition-all delay-100  rounded-full active-tab contrast-color h-7 top-1/2`}
						></span>
						<span
							onClick={handleOnThemeToggle}
							className={`z-10 flex items-center gap-2 p-1 px-2 relative w-full text-sm cursor-pointer  ${
								isDarkMode ? 'text-white' : 'text-gray-500'
							}`}
						>
							<Moon className='inline-block' size={18} /> Dark
						</span>
					</div>
					<div className='flex items-center gap-3 profile-settings'>
						<span className='flex items-center justify-center w-10 h-10 border rounded-full'>
							<Settings className='inline-block' />
						</span>
						<img
							className='w-10 h-10 border rounded-full'
							src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwRPWpO-12m19irKlg8znjldmcZs5PO97B6A&s'
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Navbar;
