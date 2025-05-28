import { Trash2 } from 'lucide-react';
interface AppModalDeleteContentInterface {
	appModalEntity: string;
}

const AppModalDeleteContent = ({
	appModalEntity,
}: AppModalDeleteContentInterface) => {
	return (
		<div className='text-center text-gray-500 content'>
			<span className='flex items-center justify-center w-10 h-10 m-auto mb-3 bg-red-100 rounded-full'>
				<Trash2 size={20} className='text-red-500' />
			</span>
			<strong className='font-medium text-gray-800'>
				Delete {appModalEntity}
			</strong>
			<p className='mt-2 text-sx'>
				Are you sure to delete this {appModalEntity}?
			</p>
			<p className='text-sx '>this process cannot be undone</p>
		</div>
	);
};

export default AppModalDeleteContent;
