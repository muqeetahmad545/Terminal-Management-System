import {
	ArrowRight,
	Edit,
	Settings,
	TabletSmartphone,
	Trash2,
} from 'lucide-react';
import {
	AppButton,
	AppInputLabel,
	AppInputWrapper,
	AppListActionIconWrapper,
	AppListFilterStatus,
	AppListHeader,
	AppListItem,
	AppListSearch,
	AppModal,
	AppSelectOptions,
	AppStatusBadge,
} from '../../../presentation/shared';
import { useNavigate } from 'react-router-dom';
import { useTerminals } from '../TerminalHooks';
import { ChangeEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useMerchant } from '../../merchants/MerchantHooks';
import { UserFilterParams } from '../../../domain/models/Login';

// Define the type for the organization options
interface MerchantOption {
	label: string;
	value: string;
}

const initialParams = {
	allocated: 'true',
	status: 'Active',
};

const TerminalsList = () => {
	//? STATES
	const [isDeleteModel, setIsDeleteModel] = useState<boolean>(false);
	const [isFilterModel, setIsFilterModel] = useState<boolean>(false);
	const [isAllocated, setIsAllocated] = useState<boolean>(true);
	const [terminalId] = useState<number>();
	const [merchants, setMerchants] = useState<MerchantOption[]>([]);
	const [filterParams, setFilterParams] =
		useState<UserFilterParams>(initialParams);
	//? HOOKS
	const navigate = useNavigate();
	const {
		terminals,
		terminalUseCases,
		fetchAllTerminals,
		setTerminals,
		recordStats,
	} = useTerminals();
	const { findAllMerchants } = useMerchant();

	// ?HANDLERS
	// DELETE TERMINAL
	const onDeleteTerminal = async () => {
		if (!terminalId) return;
		const data = await terminalUseCases.deleteTerminal(terminalId.toString());
		if (data.status === 'success') {
			toast.success(data.message);
			setIsDeleteModel(false);
			fetchAllTerminals();
		}
	};

	// MERCHANTS UPLOAD
	const onMerchantsUpload = async (e: ChangeEvent<HTMLInputElement>) => {
		const { files } = e.target;
		if (files && files.length > 0) {
			const formdata = new FormData();
			formdata.append('terminals', files[0]);
			const data = await terminalUseCases.createTerminal(formdata);
			if (data.status == 'success') {
				toast.success(data.message);
				fetchAllTerminals();
			}
		}
	};

	// Find All Merchants
	const getMerchants = async () => {
		const data = await findAllMerchants();
		const res = data.map((merchant) => ({
			label: merchant.name,
			value: merchant.id?.toString() || '',
		}));
		setMerchants(res);
	};

	// Handle Allocation
	const handleAllocation = () => {
		setIsAllocated((prev) => !prev);
		setFilterParams((prev) => ({
			...prev,
			merchant_id: null,
			allocated: prev.allocated === 'true' ? 'false' : 'true', // Toggle allocated
		}));
	};

	// Handle Status Change
	const handleStatusChange = (value: string) => {
		setFilterParams((prev) => ({ ...prev, status: value }));
	};

	// Handle Merchant Change
	const handleMerchantChange = (value: string) => {
		setFilterParams((prev) => ({ ...prev, merchant_id: value }));
	};

	// Handle Filter Data
	const onFilterTerminals = async () => {
		const data = await terminalUseCases.findAllTerminals(filterParams);
		setTerminals(data);
	};

	//? EFFECTS
	useEffect(() => {
		// getMerchants();
		fetchAllTerminals();
	}, []);
	return (
		<>
			<div className='flex items-center gap-5 mb-5 page-header'>
				<AppListSearch
					appListFilterClick={() => {
						setIsFilterModel(true);
						getMerchants();
					}}
				/>

				<AppListFilterStatus
					appListActiveCount={recordStats.active}
					appListInactiveCount={recordStats.inactive}
				/>
			</div>
			<div className=' p-5 bg-white organizations  rounded-[10px] border mb-5 '>
				<AppListHeader
					applistTitleIcon={<TabletSmartphone />}
					appListTitle='terminals'
					appIsDisplay={true}
					appListNavigate={() => {
						navigate('create');
					}}
					appIsFileUpload={true}
					appFileUploading={(e) => onMerchantsUpload(e)}
				/>
				<ul className='sticky mt-5 '>
					<AppListItem>
						<span className='flex-1 py-1 text-sm font-medium text-gray-600 '>
							Terminal Name
						</span>
						<span className='flex-1 text-sm font-medium text-gray-600 '>
							Serial No
						</span>
						<span className='flex-1 text-sm font-medium text-gray-600 '>
							Manufacturer
						</span>
						<span className='flex-1 text-sm font-medium text-gray-600 '>
							Model
						</span>

						<span className='flex-1 text-sm font-medium text-gray-600 '>
							Status
						</span>
						<span className='flex-1 text-sm font-medium text-left max-w-[112px] text-gray-600 '>
							Actions
						</span>
					</AppListItem>
				</ul>
				<ul className='mt-5'>
					{terminals.map((terminal, index) => (
						<AppListItem key={index} appIndex={index}>
							{/* <AppListCounter index={index} /> */}
							<span className='flex-1 text-sm'>{terminal.display_name}</span>
							<span className='flex-1 text-sm'>{terminal.serial_number}</span>
							<span className='flex-1 text-sm'>{terminal.manufacturer}</span>
							<span className='flex-1 text-sm'>{terminal.model}</span>
							<span className='flex-1 text-sm'>
								<AppStatusBadge appStatus={terminal.status || ''} />
							</span>
							<div className='flex items-center justify-end flex-1 gap-2 actions max-w-[112px]'>
								<AppListActionIconWrapper
									actionClick={() => {
										navigate('edit/' + terminal.uuid);
									}}
								>
									<Edit size={18} />
								</AppListActionIconWrapper>
								<AppListActionIconWrapper
									actionClick={() => {
										localStorage.setItem(
											'merchant_id',
											terminal.merchant_id?.toString() || '',
										);
										localStorage.setItem(
											'organization_id',
											terminal.merchant?.organization_id?.toString() || '',
										);
										navigate('configurations/' + terminal.id);
									}}
								>
									<Settings className='cursor-pointer' size={18} />
								</AppListActionIconWrapper>
								{/* <AppListActionIconWrapper
									actionClick={() => {
										setIsDeleteModel(true);
										setTerminalId(terminal.id);
									}}
								>
									<Trash2 className='cursor-pointer' size={18} />
								</AppListActionIconWrapper> */}
								<AppListActionIconWrapper>
									<ArrowRight className='cursor-pointer' size={18} />
								</AppListActionIconWrapper>
							</div>
						</AppListItem>
					))}
				</ul>
			</div>

			{isDeleteModel && (
				<AppModal
					appModalTitle='Delete Terminal'
					apponModalClosed={() => setIsDeleteModel(false)}
				>
					<div className='text-center'>
						<span className='flex items-center justify-center w-10 h-10 m-auto bg-red-100 rounded-full'>
							<Trash2 className='text-red-500' size={20} />
						</span>

						<div className='mt-4 text-sm text-gray-500'>
							<p>Are you sure to delete the terminal ?</p>
							<p>This process cannot be undone</p>
						</div>

						<div className='flex justify-center gap-5 m-auto mt-10 actions'>
							<AppButton
								appBtnText='Delete'
								appButtonOnClick={() => onDeleteTerminal()}
							/>
							<AppButton
								appBtnText='Cancel'
								appIsOutlineBtn
								appButtonOnClick={() => setIsDeleteModel(false)}
							/>
						</div>
					</div>
				</AppModal>
			)}

			{isFilterModel && (
				<AppModal
					appModalTitle='Filter Terminals'
					apponModalClosed={() => setIsFilterModel(false)}
				>
					<div>
						<label className='inline-flex items-center mb-10 cursor-pointer'>
							<span className='mr-3 text-sm font-medium text-gray-500 dark:text-gray-300'>
								Unallocated
							</span>
							<input
								type='checkbox'
								value=''
								className='sr-only peer'
								checked={isAllocated}
								onChange={handleAllocation}
							/>
							<div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
							<span className='text-sm font-medium text-gray-500 ms-3 dark:text-gray-300'>
								Allocated
							</span>
						</label>
						{isAllocated && (
							<AppInputWrapper>
								<AppInputLabel appInoutLabelText='Select Merchant' />
								<AppSelectOptions
									defaultOption='Select Merchant'
									className='relative '
									options={merchants}
									onChange={handleMerchantChange}
								/>
							</AppInputWrapper>
						)}

						<AppInputWrapper>
							<AppInputLabel appInoutLabelText='Select Status' />
							<AppSelectOptions
								defaultOption='Active'
								className='relative '
								options={[
									{ value: 'Active', label: 'Active' },
									{ value: 'Inactive', label: 'Inactive' },
									{ value: 'Suspended', label: 'Suspended' },
								]}
								onChange={handleStatusChange}
							/>
						</AppInputWrapper>

						<div className='flex gap-4 actions'>
							<AppButton
								appBtnText='Filter'
								appButtonOnClick={() => onFilterTerminals()}
							/>
							<AppButton
								appIsOutlineBtn={true}
								appBtnText='Clear'
								appButtonOnClick={() => {
									fetchAllTerminals();
									setIsFilterModel(false);
								}}
							/>
						</div>
					</div>
				</AppModal>
			)}
		</>
	);
};

export default TerminalsList;
