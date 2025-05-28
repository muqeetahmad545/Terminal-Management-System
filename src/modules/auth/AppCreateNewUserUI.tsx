import { Users } from 'lucide-react';
import {
	AppButton,
	AppInputField,
	AppInputLabel,
	AppInputWrapper,
	AppInputWrapperFlexContainer,
	AppListHeader,
} from '../../presentation/shared';
import { ChangeEvent, useEffect, useState } from 'react';
import { AuthInterFace } from '../../domain/models/Login';

import { AuthRepositry } from '../../data/repositries/Auth/AuthRepositry';
import { AuthUseCases } from '../../domain/usecases/auth/AuthUseCases';

import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { APIErrorMessageResonse } from '../../utills/APIErrorResponseMessage';
import { useParams } from 'react-router-dom';

const initialPayload = {
	first_name: '',
	last_name: '',
	email: '',
	role: 'Admin',
	phone: '',
	status: 'Active',
};

const AppCreateNewUserUI = () => {
	//? STATES
	const [userPayload, setUserPayload] = useState<AuthInterFace>(initialPayload);
	const [errors, setErrors] = useState<{ [key: string]: string }>({}); // Initialize errors as an object

	//? HOOKS
	const { id } = useParams();

	//? REPO INSTANCES
	const authRepositry = new AuthRepositry();
	const authUseCases = new AuthUseCases(authRepositry);

	//? HANDLERS

	// INPUT CHANGE
	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUserPayload((prev) => ({ ...prev, [name]: value }));
	};

	// FORM SUBMIT
	const onSubmitForm = async () => {
		try {
			const data = id
				? await authUseCases.UpdateUser(parseInt(id), userPayload)
				: await authUseCases.CreateNewUser(userPayload);

			if (!data.success) {
				setErrors(data.errors || {});
			}
			if (data.success) {
				toast.success(data.data?.message ?? '');
				setUserPayload(id ? userPayload : initialPayload);
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				APIErrorMessageResonse(error);
			}
		}
	};

	// FINDLE SINGEL USER
	const findSingleUser = async (id: number) => {
		const data = await authUseCases.FindSingleUSer(id);

		setUserPayload((prev) => ({
			...prev,
			first_name: data.first_name,
			last_name: data.last_name,
			email: data.email,
			phone: data.phone,
			role: data.role,
		}));
	};

	//? EFFECTS
	useEffect(() => {
		if (id) findSingleUser(parseInt(id ?? '') || 0);
	}, [id]);
	return (
		<div className='p-5 bg-white rounded-md'>
			<AppListHeader
				appListTitle='Create User'
				applistTitleIcon={<Users />}
				appIsDisplay={false}
			/>

			<div className='mt-10'>
				<AppInputWrapperFlexContainer>
					<AppInputWrapper>
						<AppInputLabel appInoutLabelText='First Name' />
						<AppInputField
							appInputValue={userPayload.first_name}
							appInputName='first_name'
							appOnInputChnage={onInputChange}
						/>
						<span className='inline-block text-xs text-red-500'>
							{errors.first_name}
						</span>
					</AppInputWrapper>
					<AppInputWrapper>
						<AppInputLabel appInoutLabelText='Last Name' />
						<AppInputField
							appInputValue={userPayload.last_name}
							appInputName='last_name'
							appOnInputChnage={onInputChange}
						/>
					</AppInputWrapper>
				</AppInputWrapperFlexContainer>
				<AppInputWrapperFlexContainer>
					<AppInputWrapper>
						<AppInputLabel appInoutLabelText='Email' />
						<AppInputField
							appInputValue={userPayload.email}
							appInputName='email'
							appOnInputChnage={onInputChange}
							appInputType='email'
						/>
					</AppInputWrapper>
					<AppInputWrapper>
						<AppInputLabel appInoutLabelText='Phone' />
						<AppInputField
							appInputValue={userPayload.phone}
							appInputName='phone'
							appOnInputChnage={onInputChange}
							appInputType='number'
						/>
					</AppInputWrapper>
				</AppInputWrapperFlexContainer>

				<div className='text-right actions'>
					<AppButton
						appBtnText={id ? 'Update' : 'Create'}
						appButtonOnClick={onSubmitForm}
					/>
				</div>
			</div>
		</div>
	);
};

export default AppCreateNewUserUI;
