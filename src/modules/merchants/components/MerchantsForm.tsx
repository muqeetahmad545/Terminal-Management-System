import {
	AppButton,
	AppInputField,
	AppInputLabel,
	AppInputWrapper,
	AppInputWrapperFlexContainer,
	AppListHeader,
	AppSelectOptions,
	AppValidationMessage,
} from '../../../presentation/shared';
import { Users } from 'lucide-react';
import { useOrganizations } from '../../organizations/components/OrganizationHooks';
import { useEffect, useState } from 'react';
import { Merchant } from '../../../domain/models/Merchant';
import { useMerchant } from '../MerchantHooks';
import toast from 'react-hot-toast';
import { APIErrorMessageResonse } from '../../../utills/APIErrorResponseMessage';
import { AxiosError } from 'axios';

const initialPayload = {
	name: '',
	mcc: '',
	address: '',
	pin: '',
	email: '',
	phone: '',
	organization_id: null,
	status: 'Active',
};

// Define the type for the organization options
interface OrganizationOption {
	label: string;
	value: string;
}

const MerchantsForm = () => {
	//? STATES
	const [organizations, setOrganizations] = useState<OrganizationOption[]>([]);
	const [merchantPayload, setMerchantPayload] =
		useState<Merchant>(initialPayload);

	const [errors, setErrors] = useState<Merchant>();

	//? HOOKS
	const { getOrganozations } = useOrganizations();
	const { merchantUsecases, paramId } = useMerchant();

	//? HANDLERS

	//HANDLE INPUT CHANGE
	const onHandleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setMerchantPayload((prev) => ({ ...prev, [name]: value }));
	};
	// ORGANIZATION CHANGE
	const onOrganizationChange = (value: string) => {
		setMerchantPayload((prev) => ({
			...prev,
			organization_id: parseInt(value),
		}));
	};

	// HANDLE CREATE MERCHANT
	const onCreateMerchant = async () => {
		try {
			const data = paramId
				? await merchantUsecases.updateMerchant(
						merchantPayload,
						parseInt(paramId),
				  )
				: await merchantUsecases.createMerchant(merchantPayload);

			const errorsData = data as unknown as Merchant;
			setErrors(errorsData);

			if (data.status == 'success') {
				toast.success(data.message);
				setMerchantPayload(paramId ? merchantPayload : initialPayload);

				//
				setMerchantPayload((prev) => ({
					...prev,
					organization_id: paramId
						? merchantPayload.organization_id
						: parseInt(organizations[0].value),
				}));
			}
		} catch (error) {
			const axiosEror = error as AxiosError;
			APIErrorMessageResonse(axiosEror);
		}
	};

	// GET LIST OF ORGANIZATIONS
	const getAllOrganization = async () => {
		const data = await getOrganozations();
		const res = data.map((organization) => ({
			label: organization.name,
			value: organization.id?.toString() || '',
		}));
		setOrganizations(res);

		// SET DEFAULT ORGANIZATION ID
		if (data.length)
			setMerchantPayload((prev) => ({ ...prev, organization_id: data[0].id }));
	};

	// FIND MERCHANT DETAILS
	const findMerchantDetails = async () => {
		const data = await merchantUsecases.findMerchantByPK(
			parseInt(paramId || ''),
		);

		setMerchantPayload({
			name: data.name,
			email: data.email,
			mcc: data.mcc,
			phone: data.phone,
			pin: data.pin,
			organization_id: data.organization_id,
			address: data.address,
			status: data.status,
		});
	};

	// HANDLE STATUS CHANGE
	const handleStatusChange = (value: string) => {
		setMerchantPayload((prev) => ({ ...prev, status: value }));
	};

	// ? EFFECTS
	useEffect(() => {
		getAllOrganization();
	}, []);
	useEffect(() => {
		if (paramId) findMerchantDetails();
	}, [paramId]);

	return (
		<div className='p-5 bg-white rounded-md'>
			<AppListHeader
				appListTitle='Create Merchant'
				applistTitleIcon={<Users />}
				appIsDisplay={false}
			/>

			<div className='mt-10'>
				<AppInputWrapperFlexContainer>
					<AppInputWrapper>
						<AppInputLabel appInoutLabelText='Name' />
						<AppInputField
							appInputName='name'
							appInputValue={merchantPayload.name}
							appOnInputChnage={onHandleInputChange}
							appInputType='text'
						/>
						<AppValidationMessage appValidationMessage={errors?.name || ''} />
					</AppInputWrapper>
					<AppInputWrapper>
						<AppInputLabel appInoutLabelText='Email' />
						<AppInputField
							appInputName='email'
							appInputValue={merchantPayload.email}
							appOnInputChnage={onHandleInputChange}
							appInputType='email'
						/>
						<AppValidationMessage appValidationMessage={errors?.email || ''} />
					</AppInputWrapper>
				</AppInputWrapperFlexContainer>
				{/* <AppInputWrapper>
					<AppInputLabel appInoutLabelText='MID' />
					<AppInputField name />
				</AppInputWrapper> */}
				<AppInputWrapperFlexContainer>
					<AppInputWrapper>
						<AppInputLabel appInoutLabelText='Category Code' />
						<AppInputField
							appInputName='mcc'
							appInputType='text'
							appInputValue={merchantPayload.mcc}
							appOnInputChnage={onHandleInputChange}
						/>
						<AppValidationMessage appValidationMessage={errors?.mcc || ''} />
					</AppInputWrapper>
					<AppInputWrapper>
						<AppInputLabel appInoutLabelText='PIN' />
						<AppInputField
							appInputName='pin'
							appInputType='text'
							appInputValue={merchantPayload.pin}
							appOnInputChnage={onHandleInputChange}
						/>
						<AppValidationMessage appValidationMessage={errors?.pin || ''} />
					</AppInputWrapper>
				</AppInputWrapperFlexContainer>
				<AppInputWrapperFlexContainer>
					<AppInputWrapper>
						<AppInputLabel appInoutLabelText='Phone' />
						<AppInputField
							appInputName='phone'
							appInputValue={merchantPayload.phone}
							appInputType='number'
							appOnInputChnage={onHandleInputChange}
						/>
						<AppValidationMessage appValidationMessage={errors?.phone || ''} />
					</AppInputWrapper>
					<AppInputWrapper>
						<AppInputLabel appInoutLabelText='Organization' />
						<AppSelectOptions
							options={organizations}
							defaultOption='Please select organization'
							onChange={onOrganizationChange}
							value={merchantPayload.organization_id?.toString()}
						/>
					</AppInputWrapper>
				</AppInputWrapperFlexContainer>
				<AppInputWrapper>
					<AppInputLabel appInoutLabelText='Address' />
					<AppInputField
						appInputName='address'
						appInputValue={merchantPayload.address}
						appInputType='text'
						appOnInputChnage={onHandleInputChange}
					/>
					<AppValidationMessage appValidationMessage={errors?.address || ''} />
				</AppInputWrapper>

				{paramId && (
					<AppInputWrapper>
						<AppInputLabel appInoutLabelText='Status' />
						<AppSelectOptions
							value={merchantPayload.status}
							defaultOption='Active'
							className='relative'
							onChange={handleStatusChange}
							options={[
								{ label: 'Active', value: 'Active' },
								{ label: 'Inactive', value: 'Inactive' },
								{ label: 'Suspended', value: 'Suspended' },
							]}
						/>
					</AppInputWrapper>
				)}

				<div className='text-right actions'>
					<AppButton
						appBtnText={paramId ? 'Update' : 'Create'}
						appButtonOnClick={onCreateMerchant}
					/>
				</div>
			</div>
		</div>
	);
};

export default MerchantsForm;
