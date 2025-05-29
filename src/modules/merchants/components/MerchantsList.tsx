import { ArrowRight, Edit, Settings, Trash2, Users } from 'lucide-react';
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
	AppNoRecords,
	AppSelectOptions,
	AppStatusBadge,
} from '../../../presentation/shared';
import '../styles.css';
import { useNavigate } from 'react-router-dom';
import { useMerchant } from '../MerchantHooks';
import { ChangeEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { UserFilterParams } from '../../../domain/models/Login';
import { useOrganizations } from '../../organizations/components/OrganizationHooks';

const initialParams = {
	status: 'Active',
	organization_id: null,
};

// Define the type for the organization options
interface OrganizationOption {
	label: string;
	value: string;
}

const MerchantsList = () => {
	//? STATES

	const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
	const [isFilterModal, setIsFilterModal] = useState<boolean>(false);
	const [merchantId] = useState<string | number | any>();
	const [filterParams, setFilterParams] =
		useState<UserFilterParams>(initialParams);
	const [organizations, setOrganizations] = useState<OrganizationOption[]>([]);
	//? HOOKS
	const navigate = useNavigate();
	const {
		findAllMerchants,
		merchantUsecases,
		merchants,
		setMerchants,
		recordStats,
	} = useMerchant();
	const { getOrganozations } = useOrganizations();

	//? HANDLERS

	// DELETE MERCAHNT
	const onDeleteMerchant = async (id: string) => {
		const data = await merchantUsecases.deleteMerchant(id);
		if (data.status == 'success') {
			toast.success(data.message);

			findAllMerchants();
			setIsDeleteModal(false);
		}
	};

	// GET ORGANIZATIONS
	const getAllOrganization = async () => {
		const data = await getOrganozations();
		const res = data.map((organization) => ({
			label: organization.name,
			value: organization.id?.toString() || '',
		}));
		setOrganizations(res);

		setFilterParams((prev) => ({
			...prev,
			organization_id: parseInt(res[0].value),
		}));
	};

	// HANDLER FILTER STATUS CHANGE
	const handleStatusChange = (value: string) => {
		setFilterParams((prev) => ({ ...prev, status: value }));
	};
	const handleOrganizationChange = (value: string) => {
		setFilterParams((prev) => ({
			...prev,
			organization_id: parseInt(value),
		}));
	};

	// FILTER MERCHANTES ====> CALL API
	const onFilterRecordsData = async (filterParams: UserFilterParams) => {
		const data = await merchantUsecases.findAllMerchants(filterParams);
		setMerchants(data);
	};

	// HANDLE MULTIPLE MERCHANTS UPLOAD
	const onFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
		const { files } = e.target;
		if (files && files.length > 0) {
			const formdata = new FormData();
			formdata.append('merchants', files[0]);

			const data = await merchantUsecases.createMerchant(formdata);
			if (data.status == 'success') {
				toast.success(data.message);
				findAllMerchants();
			}
		}
	};

	//? EFFECTS
	useEffect(() => {
		findAllMerchants();
	}, []);

	return (
		<>
			<div className='flex items-center gap-5 mb-5 page-header'>
				<AppListSearch
					appListSearchClik={() => {
						console.log('merchantez');
					}}
					appListFilterClick={() => {
						setIsFilterModal(true);
						getAllOrganization();
					}}
				/>

				<AppListFilterStatus
					appListActiveCount={recordStats.active}
					appListInactiveCount={recordStats.inactive}
				/>
			</div>
			<div className=' p-5 bg-white organizations  rounded-[5px] relative '>
				<AppListHeader
					applistTitleIcon={<Users />}
					appListTitle='merchants'
					appListNavigate={() => {
						navigate('create');
					}}
					appIsDisplay={true}
					appIsFileUpload={true}
					appFileUploading={(e) => {
						onFileUpload(e);
					}}
				/>
				<ul className='sticky mt-5'>
					<AppListItem>
						<span className='flex-1 py-1 text-sm font-medium text-gray-600'>
							Name
						</span>
						<span className='flex-1 text-sm font-medium text-gray-600'>
							Email
						</span>
						{/* <span className='flex-1 text-sm font-medium text-gray-600'>
							Organization
						</span> */}
						<span className='flex-1 text-sm font-medium text-gray-600'>
							Organization
						</span>
						<span className='flex-1 text-sm font-medium text-gray-600'>
							Contact
						</span>
						<span className='flex-1 text-sm font-medium text-gray-600'>
							PIN Code
						</span>
						<span className='flex-1 text-sm font-medium text-gray-600'>
							Status
						</span>
						<span className='flex-1 max-w-[112px] text-sm font-medium w-[70px] text-gray-600'>
							Actions
						</span>
					</AppListItem>
				</ul>
				<ul className='mt-5'>
					{merchants.length ? (
						merchants.map((merchant, index) => (
							<AppListItem key={index} appIndex={index}>
								{/* <AppListCounter index={index} /> */}
								<span className='flex-1 text-sm '>{merchant.name}</span>
								<span className='flex-1 text-sm'>{merchant.email}</span>
								{/* <span className='flex-1 text-sm'>
									{merchant.organization?.name}
								</span> */}
								<span className='flex-1 text-sm'>
									{merchant.organization?.name}
								</span>
								<span className='flex-1 text-sm'>{merchant.phone}</span>
								<span className='flex-1 text-sm'>{merchant.pin}</span>
								<span className='flex-1 text-sm'>
									<AppStatusBadge appStatus={merchant.status || ''} />
								</span>
								<div className='flex items-center justify-between max-w-[112px] flex-1 gap-2 actions'>
									<AppListActionIconWrapper
										actionClick={() => {
											navigate(`edit/${merchant.uuid}`);
										}}
									>
										<Edit size={18} />
									</AppListActionIconWrapper>
									<AppListActionIconWrapper
										actionClick={() => {
											console.log(merchant.organization_id);
											localStorage.setItem(
												'merchant_id',
												merchant.id?.toString() || '',
											);
											localStorage.setItem(
												'organization_id',
												merchant.organization_id?.toString() || '',
											);

											navigate('configurations/' + merchant.id);
										}}
									>
										<Settings className='cursor-pointer' size={18} />
									</AppListActionIconWrapper>
									{/* <AppListActionIconWrapper
										actionClick={() => {
											setIsDeleteModal(true);
											setMerchantId(merchant.id);
										}}
									>
										<Trash2 className='cursor-pointer' size={18} />
									</AppListActionIconWrapper> */}
									<AppListActionIconWrapper>
										<ArrowRight className='cursor-pointer' size={18} />
									</AppListActionIconWrapper>
								</div>
							</AppListItem>
						))
					) : (
						<AppNoRecords />
					)}
				</ul>
			</div>
			{isDeleteModal && (
				<AppModal
					appModalTitle='Delete Merchant'
					apponModalClosed={() => setIsDeleteModal(false)}
				>
					<div className='text-center'>
						<span className='flex items-center justify-center w-10 h-10 m-auto bg-red-100 rounded-full'>
							<Trash2 className='text-red-500' size={20} />
						</span>

						<div className='mt-4 text-sm text-gray-500'>
							<p>Are you sure to delete the merchant ?</p>
							<p>This process cannot be undone</p>
						</div>

						<div className='flex justify-center gap-5 m-auto mt-10 actions'>
							<AppButton
								appBtnText='Delete'
								appButtonOnClick={() => onDeleteMerchant(merchantId || -1)}
							/>
							<AppButton
								appBtnText='Cancel'
								appIsOutlineBtn
								appButtonOnClick={() => setIsDeleteModal(false)}
							/>
						</div>
					</div>
				</AppModal>
			)}

			{isFilterModal && (
				<AppModal
					appModalTitle='Filter Merchants'
					apponModalClosed={() => setIsFilterModal(false)}
				>
					<div>
						<AppInputWrapper>
							<AppInputLabel appInoutLabelText='Status' />
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
						<AppInputWrapper>
							<AppInputLabel appInoutLabelText='Organization' />
							<AppSelectOptions
								defaultOption='Active'
								className='relative '
								options={organizations}
								onChange={handleOrganizationChange}
							/>
						</AppInputWrapper>

						<div className='flex gap-4 actions'>
							<AppButton
								appBtnText='Filter'
								appButtonOnClick={() => onFilterRecordsData(filterParams)}
							/>
							<AppButton
								appIsOutlineBtn={true}
								appBtnText='Clear'
								appButtonOnClick={() => {
									findAllMerchants();
									setIsFilterModal(false);
								}}
							/>
						</div>
					</div>
				</AppModal>
			)}
		</>
	);
};

export default MerchantsList;
