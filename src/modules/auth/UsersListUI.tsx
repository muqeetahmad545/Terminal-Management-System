import { ArrowRight, Edit, Trash2, Users } from 'lucide-react';
import {
	AppButton,
	AppInputField,
	AppInputLabel,
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
} from '../../presentation/shared';
import { useNavigate } from 'react-router-dom';

import { ChangeEvent, useState } from 'react';
import { AuthInterFace, UserFilterParams } from '../../domain/models/Login';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { APIErrorMessageResonse } from '../../utills/APIErrorResponseMessage';
import { useAuthUser } from './hooks/AuthUserHooks';

const initialParams = {
	status: 'Active',
	role: 'Admin',
};

const UsersListUI = () => {
	//? STATES
	const [isStatusModal, setIsStatusModal] = useState<boolean>(false);
	const [isFilterModal, setIsFilterModal] = useState<boolean>(false);
	const [isDeleteUserModal, setIsDeleteUserModal] = useState<boolean>(false);
	const [selectedUser, setSelectedUser] = useState<AuthInterFace>();
	const [filterParams, setFilterParams] = useState(initialParams);

	//? HOOKS
	const navigate = useNavigate();
	const { users, FetchAllUsers, recordStats, setUsers, authUseCases } =
		useAuthUser();

	// DELETE USER
	const onDeleteUser = async (id: number) => {
		try {
			const data = await authUseCases.DeleteUser(id);

			if (data.status == 'success') {
				const filter = users.filter((user) => user.id !== id);
				toast.success(data.message);
				setUsers(filter);
				FetchAllUsers();
				setIsDeleteUserModal(false);
			}
		} catch (error) {
			if (error instanceof AxiosError) APIErrorMessageResonse(error);
		}
	};

	// UPDATE USER STATUS
	const onUpdateUserStatus = async () => {
		const data = await authUseCases.UpdateUser(selectedUser?.id ?? 0, {
			status: filterParams.status,
			email: selectedUser?.email || '',
		});
		toast.success(data.data?.message || '');
		// Update the status in the local state
		// setUsers((prevUser) =>
		// 	prevUser.map((user) =>
		// 		user.id === selectedUser?.id ? { ...user, status } : user,
		// 	),
		// );
		setIsStatusModal(false);
		FetchAllUsers();
		setFilterParams((prev) => ({ ...prev, status: 'Active' }));
	};

	// ON FILTER INPUT CHANGE
	const onfilterChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setFilterParams((prev) => ({ ...prev, [name]: value }));
	};

	const handleStatusChange = (value: string) => {
		setFilterParams((prev) => ({ ...prev, status: value }));
	};

	// ON FILTER RECORD
	const onFilterRecordsData = async (filterParams: UserFilterParams) => {
		const data = await authUseCases.FetchAllUsers(filterParams);
		toast.success('Filter applied successfully');
		setUsers(data);
	};

	return (
		<>
			<div className='flex items-center gap-5 mb-5 page-header'>
				<AppListSearch
					appListSearchClik={() => {
						console.log('merchantez');
					}}
					appListFilterClick={() => setIsFilterModal(true)}
				/>

				<AppListFilterStatus
					appListActiveCount={recordStats.active}
					appListInactiveCount={recordStats.inactive}
				/>
				{/* 
				<div
					onClick={() => FetchAllUsers()}
					className='p-3 text-gray-500 bg-white border rounded-full cursor-pointer hover:text-orange-500'
				>
					<RefreshCcwDot size={20} />
				</div> */}
			</div>

			<div className=' p-5 bg-white organizations  rounded-[5px] relative '>
				<AppListHeader
					applistTitleIcon={<Users />}
					appListTitle='users'
					appListNavigate={() => {
						navigate('create');
					}}
					appIsDisplay={true}
				/>

				<ul className='sticky mt-5'>
					<AppListItem appIndex={9990099}>
						<span className='flex-1 py-1 text-sm font-medium text-gray-600'>
							Name
						</span>
						<span className='flex-1 text-sm font-medium text-gray-600'>
							Email
						</span>
						<span className='flex-1 text-sm font-medium text-gray-600'>
							Contact
						</span>
						<span className='flex-1 text-sm font-medium text-gray-600'>
							Role
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
					{users.length ? (
						users.map((user, index) => (
							<AppListItem key={index} appIndex={index}>
								{/* <AppListCounter index={index} /> */}
								<span className='flex-1 text-sm'>
									{user.first_name + ' ' + user.last_name}
								</span>
								<span className='flex-1 text-sm'>{user.email}</span>
								<span className='flex-1 text-sm'>{user.phone}</span>
								<span className='flex-1 text-sm'>{user.role}</span>
								<span className='flex-1 text-sm'>
									<AppStatusBadge appStatus={user.status || ''} />
								</span>
								<div className='flex items-center justify-between max-w-[112px] flex-1 gap-2 actions'>
									<AppListActionIconWrapper
										actionClick={() => navigate('./edit/' + user.id)}
									>
										<Edit size={18} />
									</AppListActionIconWrapper>
									<AppListActionIconWrapper
										actionClick={() => {
											setIsDeleteUserModal(true);
											setSelectedUser(user);
										}}
									>
										<Trash2 className='cursor-pointer' size={18} />
									</AppListActionIconWrapper>
									<AppListActionIconWrapper
										actionClick={() => {
											setIsStatusModal(true);
											setSelectedUser(user);
										}}
									>
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

			{isDeleteUserModal && (
				<AppModal
					appModalTitle='Delete User'
					apponModalClosed={() => setIsDeleteUserModal(false)}
				>
					<div>
						<AppModalDeleteContent appModalEntity='User' />
						<div className='flex justify-center gap-4 m-auto mt-10 actions'>
							<AppButton
								appBtnText='Cancel'
								appIsOutlineBtn={true}
								appButtonOnClick={() => setIsDeleteUserModal(false)}
							/>
							<AppButton
								appBtnText='Delete'
								appButtonOnClick={() => onDeleteUser(selectedUser?.id ?? -1)}
							/>
						</div>
					</div>
				</AppModal>
			)}

			{isStatusModal && (
				<AppModal
					apponModalClosed={() => {
						setIsStatusModal(false);
						setFilterParams((prev) => ({ ...prev, status: 'Active' }));
					}}
					appModalTitle='Change status of user'
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
						appButtonOnClick={onUpdateUserStatus}
					/>
				</AppModal>
			)}

			{/* FILTER MODAL */}
			{isFilterModal && (
				<AppModal
					apponModalClosed={() => {
						setIsFilterModal(false);
						setFilterParams((prev) => ({ ...prev, status: 'Active' }));
					}}
					appModalTitle='Filter Users'
				>
					<div className=''>
						<AppInputWrapper>
							<AppInputLabel appInoutLabelText='Role' />
							<AppInputField
								appInputName='role'
								appOnInputChnage={onfilterChange}
								appInputValue={filterParams.role}
							/>
						</AppInputWrapper>
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

						<div className='flex gap-4 actions'>
							<AppButton
								appBtnText='Filter'
								appButtonOnClick={() => onFilterRecordsData(filterParams)}
							/>
							<AppButton
								appIsOutlineBtn={true}
								appBtnText='Clear'
								appButtonOnClick={() => {
									FetchAllUsers();
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

export default UsersListUI;
