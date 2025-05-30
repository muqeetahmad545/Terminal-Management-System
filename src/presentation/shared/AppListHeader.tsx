import { PlusCircle, Upload } from 'lucide-react';
import { ReactNode } from 'react';

interface AppListHeaderProps {
	appListTitle: string;
	applistTitleIcon: ReactNode;
	appListNavigate?: (e: React.MouseEvent) => void;
	appFileUploading?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	appIsDisplay?: boolean;
	appIsFileUpload?: boolean;
}
const AppListHeader = ({
	appListTitle,
	applistTitleIcon,
	appListNavigate,
	appIsDisplay,
	appIsFileUpload,
	appFileUploading,
}: AppListHeaderProps) => {
	return (
		<div className='flex items-center justify-between gap-20 mb-1'>
			<strong className='flex items-center gap-2 font-medium text-gray-700 capitalize'>
				{applistTitleIcon}
				{appListTitle}
			</strong>
			<div className='flex items-center gap-2'>
				{appIsDisplay && (
					<div
						onClick={appListNavigate}
						className='text-gray-500 cursor-pointer actions border border-gray-300 p-2 rounded-md bg-[#223354] hover:bg-[#f89100] hover:text-white'
						>
						<PlusCircle className='inline-block text-white ' size={17} />{' '}
						<span className='text-sm text-white'>Add new {appListTitle}</span>
					</div>
				)}
				{appIsFileUpload && (
					<div>
						<span className='relative flex items-center justify-center w-8 h-8 overflow-hidden rounded-md cursor-pointer hover:bg-gray-50'>
							<Upload size={17} className='text-gray-500' />
							<input
								onChange={appFileUploading}
								type='file'
								id='avatar'
								name='avatar'
								className='absolute inset-0 z-10 w-full h-full opacity-0 cursor-pointer'
							></input>
						</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default AppListHeader;
