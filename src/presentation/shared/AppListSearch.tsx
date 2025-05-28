import { Filter, Search } from 'lucide-react';

interface AppListSearchProps {
	appListSearchClik?: (e: React.MouseEvent<HTMLSpanElement>) => void;
	appListFilterClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}
const AppListSearch = ({
	appListSearchClik,
	appListFilterClick,
}: AppListSearchProps) => {
	return (
		<div className='flex items-center flex-1 gap-3 p-2 text-gray-500 bg-white rounded-md'>
			<span
				onClick={appListFilterClick}
				className='flex items-center justify-center h-10 border rounded-md cursor-pointer w-9 hover:bg-gray-200'
			>
				<Filter size={20} />
			</span>
			<div className='relative w-full h-10 p-2 px-3 border rounded-md search '>
				<label
					className='absolute top-0 z-10 inline-block px-3 text-xs -translate-y-1/2 bg-white left-5'
					htmlFor=''
				>
					Search Data
				</label>

				<input
					type='text'
					className='absolute top-0 left-0 w-full h-full px-3 text-sm rounded-md'
				/>

				<span
					onClick={appListSearchClik}
					className='absolute top-0 flex items-center justify-center h-full cursor-pointer right-2'
				>
					<Search size={20} />
				</span>
			</div>
		</div>
	);
};

export default AppListSearch;
