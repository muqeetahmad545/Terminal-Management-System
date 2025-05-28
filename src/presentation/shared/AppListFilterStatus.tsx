interface AppListFilterStatusProps {
	appListActiveCount: number;
	appListInactiveCount: number;
}
const AppListFilterStatus = ({
	appListActiveCount,
	appListInactiveCount,
}: AppListFilterStatusProps) => {
	return (
		<div className='relative   flex items-center justify-between  p-4  bg-white w-[255px] rounded-md modules-filter-status'>
			<div className='text-center'>
				<strong className='block text-sm font-normal text-gray-500'>
					<span className='inline-block w-2 h-2 mr-1 bg-green-500 rounded-full'></span>{' '}
					Active <span className='font-medium'>{appListActiveCount}</span>
				</strong>
			</div>
			<div className='text-center'>
				<strong className='block text-sm font-normal text-gray-500'>
					<span className='inline-block w-2 h-2 mr-1 bg-red-500 rounded-full'></span>
					Inactive <span className='font-medium'>{appListInactiveCount}</span>
				</strong>
			</div>
		</div>
	);
};

export default AppListFilterStatus;
