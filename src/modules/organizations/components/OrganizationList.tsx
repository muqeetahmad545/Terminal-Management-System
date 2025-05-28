/* eslint-disable @typescript-eslint/no-unused-vars */
import { Building2, Edit, Settings, Settings2 } from 'lucide-react';
import {
	AppButton,
	AppInputWrapper,
	AppListActionIconWrapper,
	AppListFilterStatus,
	AppListHeader,
	AppListItem,
	AppListSearch,
	AppModal,
	AppModalDeleteContent,
	AppNoRecords,
	AppSelectOptions,
	AppStatusBadge,
} from '../../../presentation/shared';
import { useNavigate } from 'react-router-dom';
import { useOrganizations } from './OrganizationHooks';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { Organization } from '../../../domain/models/Organization';

const initialParams = {
	status: 'Active',
	name: '',
};

const OrganizationList = () => {
	//? STATES
	const [isDeleteOrganizationModel, setIsDeleteOrganizationModel] =
		useState<boolean>(false);
	const [isStatusModel, setIsStatusModel] = useState<boolean>(false);
	const [selectedOrganization, setSelectedOrganization] =
		useState<Organization>();
	const [filterParams, setFilterParams] = useState(initialParams);

	//? HOOKS
	const navigate = useNavigate();
	const {
		organizations,
		recordStats,
		setOrganizations,
		getOrganozations,
		organizationUseCase,
	} = useOrganizations();

	//? HANDLERS

	//DELETE
	const onDeleteOrganization = async (id: number) => {
		const data = organizationUseCase.deleteOrganization(id);
		if ((await data).status === 'success') {
			toast.success((await data).message);
			const filter = organizations.filter(
				(organization) => organization.id !== id,
			);

			setOrganizations(filter);
			setIsDeleteOrganizationModel(false);
			const updated_organizations = await getOrganozations();
			setOrganizations(updated_organizations);
		}
	};

	const handleStatusChange = (value: string) => {
		setFilterParams((prev) => ({ ...prev, status: value }));
	};

	//UPDATE STATUS
	const onUpdateOrganizationStatus = async () => {
		const data = await organizationUseCase.updateOrganization(
			selectedOrganization?.id || -1,
			{
				status: filterParams.status,
				name: selectedOrganization?.name || '',
			},
		);

		if (data.success) {
			toast.success(data.data?.message || '');
			setIsStatusModel(false);
			setFilterParams((prev) => ({ ...prev, status: 'Active' }));
			const updated_organizations = await getOrganozations();
			setOrganizations(updated_organizations);
		}
	};

	// GET LIST OF ORGANIZATIONS
	const getAllOrganization = async () => {
		const data = await getOrganozations();
		setOrganizations(data);
	};

	// ? EFFECTS
	useEffect(() => {
		getAllOrganization();
	}, []);

	return (
		<>
			<div className='flex items-center gap-5 mb-5 page-header'>
				<AppListSearch />
				<AppListFilterStatus
					appListActiveCount={recordStats.active}
					appListInactiveCount={recordStats.inactive}
				/>
			</div>
			<div className=' p-5 bg-white organizations  rounded-[5px] relative'>
				<AppListHeader
					applistTitleIcon={<Building2 />}
					appListTitle='organizations'
					appListNavigate={() => {
						navigate('../organizations/create');
					}}
					appIsDisplay={true}
				/>
				<ul className='sticky mt-5'>
					<AppListItem appIndex={Math.random()}>
						<span className='flex-1 py-1 text-sm font-medium text-gray-600'>
							Organization
						</span>
						<span className='flex-1 text-sm font-medium text-gray-600'>
							Country
						</span>
						<span className='flex-1 text-sm font-medium text-gray-600'>
							State
						</span>
						<span className='flex-1 text-sm font-medium text-gray-600'>
							Currency
						</span>
						<span className='flex-1 text-sm font-medium text-gray-600'>
							Status
						</span>
						<span className='flex-1 text-sm font-medium max-w-[112px] text-left text-gray-600'>
							Actions
						</span>
					</AppListItem>
				</ul>
				<ul className='mt-1'>
					{organizations.length ? (
						organizations.map((org, index) => (
							<AppListItem key={index} appIndex={index}>
								{/* <AppListCounter index={index} /> */}
								<span className='flex-1 text-sm'>{org.name}</span>
								<span className='flex-1 text-sm'>{org.country}</span>
								<span className='flex-1 text-sm'>{org.state}</span>
								<span className='flex-1 text-sm'>{org.currency}</span>
								<span className='flex-1 text-sm'>
									<AppStatusBadge appStatus={org.status || ''} />
								</span>
								<div className='flex items-center justify-end flex-1 gap-2 actions max-w-[112px]'>
									<AppListActionIconWrapper
										actionClick={() => {
											navigate('edit/' + org.id);
										}}
									>
										<Edit size={18} />
									</AppListActionIconWrapper>
									{/* <AppListActionIconWrapper
										actionClick={() => {
											setIsDeleteOrganizationModel(true);
											setSelectedOrganization(org);
										}}
									>
										<Trash2 className='cursor-pointer' size={18} />
									</AppListActionIconWrapper> */}
									<AppListActionIconWrapper
										actionClick={() => {
											navigate('configurations/' + org.id);
										}}
									>
										<Settings className='cursor-pointer' size={18} />
									</AppListActionIconWrapper>
									<AppListActionIconWrapper
										actionClick={() => {
											setIsStatusModel(true);
											setSelectedOrganization(org);
										}}
									>
										<Settings2 className='cursor-pointer' size={18} />
									</AppListActionIconWrapper>
								</div>
							</AppListItem>
						))
					) : (
						<AppNoRecords />
					)}
				</ul>
			</div>

			{isDeleteOrganizationModel && (
				<AppModal
					appModalTitle='Delete Organization'
					apponModalClosed={() => setIsDeleteOrganizationModel(false)}
				>
					<div>
						<AppModalDeleteContent appModalEntity='Organization' />
						<div className='flex justify-center gap-4 m-auto mt-10 actions'>
							<AppButton
								appBtnText='Cancel'
								appIsOutlineBtn={true}
								appButtonOnClick={() => setIsDeleteOrganizationModel(false)}
							/>
							<AppButton
								appBtnText='Delete'
								appButtonOnClick={() =>
									onDeleteOrganization(selectedOrganization?.id || -1)
								}
							/>
						</div>
					</div>
				</AppModal>
			)}

			{/* STATUS UPDATE */}
			{isStatusModel && (
				<AppModal
					appModalTitle='Update Status of Organization'
					apponModalClosed={() => setIsStatusModel(false)}
				>
					<AppInputWrapper>
						<AppSelectOptions
							options={[
								{ label: 'Active', value: 'Active' },
								{ label: 'Inactive', value: 'Inactive' },
								{ label: 'Suspended', value: 'Suspended' },
							]}
							defaultOption='Active'
							onChange={handleStatusChange}
						/>
					</AppInputWrapper>
					<AppButton
						appBtnText='Update'
						appButtonOnClick={onUpdateOrganizationStatus}
					/>
				</AppModal>
			)}
		</>
	);
};

export default OrganizationList;
