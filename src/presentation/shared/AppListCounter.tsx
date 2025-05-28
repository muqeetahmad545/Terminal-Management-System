interface AppListCounterProps {
	index: number;
}
const AppListCounter = ({ index }: AppListCounterProps) => {
	return (
		<span className='text-xs contrast-color rounded-[4px] p-1 text-white w-6 h-6 flex justify-center items-center'>
			{index + 1}
		</span>
	);
};

export default AppListCounter;
