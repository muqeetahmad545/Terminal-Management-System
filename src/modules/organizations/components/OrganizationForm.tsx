import { Building2 } from 'lucide-react';
import {
	AppButton,
	AppInputField,
	AppInputLabel,
	AppInputWrapper,
	AppListHeader,
	AppSelectOptions,
	AppTextArea,
	AppValidationMessage,
} from '../../../presentation/shared';
import { useEffect, useState } from 'react';
import {
	Organization,
	OrganizationErrors,
} from '../../../domain/models/Organization';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import '../styles.css';
import toast from 'react-hot-toast';

import { useOrganizations } from './OrganizationHooks';
import { APIErrorMessageResonse } from '../../../utills/APIErrorResponseMessage';
import { AxiosError } from 'axios';
import { fakeDataInfo } from '../../../data/fakeData';

const initialPayload = {
	name: '',
	country: '',
	state: '',
	currency: '',
	address: '',
	postal_code: '',
	language: '',
	email: '',
	phone: '',
	status: 'Active',
	description: '',
};

const OrganizationForm = () => {
	//? STATES
	const [errors, setErros] = useState<OrganizationErrors>({});
	const [country, setCountry] = useState<string>('');
	const [region, setRegion] = useState<string>('');
	const [payload, setPayload] = useState<Organization>(initialPayload);

	//? HOOKS
	const { oranizationId, organizationUseCase, getOrganization } =
		useOrganizations();

	//? HANDLERS
	// INPUT CHANGE
	const onIputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;

		setPayload((prev) => ({ ...prev, [name]: value }));
	};

	// Handle Form Submit
	const handleCreateOrganization = async () => {
		setErros({});
		const organizationPayload = {
			...payload,
			country,
			state: region,
		};

		console.log(payload);
		// return;

		try {
			const data = oranizationId
				? await organizationUseCase.updateOrganization(
						(oranizationId),
						organizationPayload,
				  )
				: await organizationUseCase.create(organizationPayload);

			console.log(data);

			if (!data.success) {
				setErros(data.errors || {});
			}

			if (data.success) {
				setPayload(oranizationId ? payload : initialPayload);
				setCountry(oranizationId ? payload?.country || '' : '');
				setRegion(oranizationId ? payload?.state || '' : '');
				toast.success((await data.data)?.message || '');
			}
		} catch (error) {
			setPayload(payload);
			setCountry(payload?.country || '');
			setCountry(payload?.state || '');
			if (error instanceof AxiosError) APIErrorMessageResonse(error);
		}
	};

	// GET ORGNAIZATION DETAILS
	const organizationDetails = async () => {
		const data = await getOrganization((oranizationId || ''));
		setPayload((prev) => ({
			...prev,
			name: data.name,
			email: data.email,
			address: data.address,
			language: data.language,
			currency: data.currency,
			country: data.country,
			state: data.state,
			status: data.status,
			postal_code: data.postal_code,
			phone: data.phone,
			description: data.description,
		}));
		setCountry(data.country || '');
		setRegion(data.state || '');
	};

	// Handle Change Country
	const selectCountry = (val: string) => {
		setCountry(val);
		setPayload((prev) => ({ ...prev, country: val }));
	};

	// Hanlde Change State
	const selectRegion = (val: string) => {
		setRegion(val);
		setPayload((prev) => ({ ...prev, state: val }));
	};

	// Hanlde Language Select
	const onSelectLanguage = (language: string) => {
		setPayload((prev) => ({ ...prev, language: language }));
	};
	// Hanlde Currency Select
	const onSelectCurrency = (currency: string) => {
		setPayload((prev) => ({ ...prev, currency: currency }));
	};

	//? EFFECTS
	useEffect(() => {
		if (oranizationId) organizationDetails();
	}, [oranizationId]);
	return (
		<div className='p-5 bg-white rounded-md'>
			<AppListHeader
				appListTitle={`${oranizationId ? 'Update Orgonization' : 'Create Orgonization'}`}
				applistTitleIcon={<Building2 />}
				appIsDisplay={false}
			/>

			<div className='mt-10 form-container'>
				<div className='flex items-center justify-between gap-5'>
					<AppInputWrapper appIsError={errors.name ? true : false}>
						<AppInputLabel appInoutLabelText='Name' />
						<AppInputField
							appInputName='name'
							appInputValue={payload.name}
							appOnInputChnage={onIputChange}
							appInputType='text'
						/>
						<AppValidationMessage appValidationMessage={errors.name || ''} />
					</AppInputWrapper>
					<AppInputWrapper>
						<AppInputLabel appInoutLabelText='Email' />
						<AppInputField
							appInputName='email'
							appInputValue={payload.email}
							appOnInputChnage={onIputChange}
							appInputType='email'
						/>
						<AppValidationMessage appValidationMessage={errors.email || ''} />
					</AppInputWrapper>
					<AppInputWrapper>
						<AppInputLabel appInoutLabelText='Phone No' />
						<AppInputField
							appInputName='phone'
							appInputValue={payload.phone}
							appOnInputChnage={onIputChange}
							appInputType='number'
						/>
						<AppValidationMessage appValidationMessage={errors.phone || ''} />
					</AppInputWrapper>
				</div>

				<div className='flex items-center justify-between gap-5'>
					<AppInputWrapper>
						<AppInputLabel appInoutLabelText='Country' />
						{/* <AppInputField /> */}
						<CountryDropdown
							value={country}
							onChange={(val) => selectCountry(val)}
							classes='text-gray-700'
						/>
						<AppValidationMessage appValidationMessage={errors.country || ''} />
					</AppInputWrapper>
					<AppInputWrapper>
						<AppInputLabel appInoutLabelText='State' />
						{/* <AppInputField /> */}
						<RegionDropdown
							classes='text-gray-700'
							country={country}
							value={region}
							onChange={(val) => selectRegion(val)}
						/>
						<AppValidationMessage appValidationMessage={errors.state || ''} />
					</AppInputWrapper>
				</div>
				<div className='flex items-center justify-between gap-5'>
					<AppInputWrapper>
						<AppInputLabel appInoutLabelText='Street Address' />
						<AppInputField
							appInputName='address'
							appInputValue={payload.address}
							appOnInputChnage={onIputChange}
							appInputType='text'
						/>
						<AppValidationMessage appValidationMessage={errors.address || ''} />
					</AppInputWrapper>
					<AppInputWrapper>
						<AppInputLabel appInoutLabelText='Post Code' />
						<AppInputField
							appInputName='postal_code'
							appInputValue={payload.postal_code}
							appOnInputChnage={onIputChange}
							appInputType='number'
						/>
						<AppValidationMessage
							appValidationMessage={errors.postal_code || ''}
						/>
					</AppInputWrapper>
				</div>
				<AppInputWrapper>
					<AppInputLabel appInoutLabelText='Currency' />
					{/* <AppInputField
						appInputName='currency'
						appInputValue={payload.currency}
						appOnInputChnage={onIputChange}
						appInputType='text'
					/> */}
					<AppSelectOptions
						options={fakeDataInfo.currencies}
						defaultOption='Please choose language'
						value={payload.currency}
						onChange={onSelectCurrency}
					></AppSelectOptions>
					<AppValidationMessage appValidationMessage={errors.currency || ''} />
				</AppInputWrapper>

				<AppInputWrapper>
					<AppInputLabel appInoutLabelText='Language' />
					{/* <AppInputField
						appInputName='language'
						appInputValue={payload.language}
						appOnInputChnage={onIputChange}
						appInputType='text'
					/> */}
					<AppSelectOptions
						options={fakeDataInfo.languages}
						defaultOption='Please choose language'
						value={payload.language}
						onChange={onSelectLanguage}
					></AppSelectOptions>
					<AppValidationMessage appValidationMessage={errors.language || ''} />
				</AppInputWrapper>
				<AppInputWrapper appInputIsDescription={true}>
					<AppInputLabel appInoutLabelText='Description' />
					<AppTextArea
						appTextValue={payload.description || ''}
						appOnTextchange={onIputChange}
						appTextName='description'
					/>
				</AppInputWrapper>

				<div className='text-right actions'>
					<AppButton
						appBtnText={`${oranizationId ? 'Update' : 'Create'}`}
						appButtonOnClick={handleCreateOrganization}
					/>
				</div>
			</div>
		</div>
	);
};

export default OrganizationForm;
