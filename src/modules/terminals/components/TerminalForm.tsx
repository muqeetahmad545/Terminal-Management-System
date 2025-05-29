import { TabletSmartphone } from 'lucide-react';
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
import { useEffect, useState } from 'react';
import { useMerchant } from '../../merchants/MerchantHooks';
import { Terminal } from '../../../domain/models/Terminals';
import { useTerminals } from '../TerminalHooks';
import toast from 'react-hot-toast';
import { APIErrorMessageResonse } from '../../../utills/APIErrorResponseMessage';
import { AxiosError } from 'axios';
import { transformDateTimeISO } from '../../../utills/TransformISODateTime';

// Define the type for the organization options
interface MerchantOption {
	label: string;
	value: string;
}

const initialPayload = {
	serial_number: '',
	manufacturer: '',
	model: '',
	created_from_portal: true,
	merchant_id: '',
	status: 'Active',
	display_name: '',
	app_name: '',
	os_name: '',
	firmware_version: '',
	network_name: '',
	battery_percentage: 0,
	network_signal_strength: '',
	warranty_expiry: '',
	app_version: '',
};

const TerminalForm = () => {
	//? STATES
	const [merchants, setMerchnats] = useState<MerchantOption[]>([]);
	const [terminalPayload, setTerminalPayload] =
		useState<Terminal>(initialPayload);
	const [errors, setErrors] = useState<Terminal>();
	//? HOOKS
	const { findAllMerchants } = useMerchant();
	const { terminalUseCases, id } = useTerminals();

	//? HANDLERS

	// HANDLE INPUT CHANGE
	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
	
		let newValue: string | number = value;
	
		if (name === 'battery_percentage') {
			const num = Number(value);
			newValue = isNaN(num) ? 0 : Math.min(Math.max(num, 0), 100); // clamp between 0–100
		}
	
		setTerminalPayload((prev) => ({
			...prev,
			[name]: name === 'battery_percentage' ? newValue : value,
		}));
	};
	

	// FIND MERCHANTS
	const findMerchants = async () => {
		const data = await findAllMerchants();
		const res = data.map((merchant) => ({
			label: merchant.name,
			value: merchant.uuid || '',
		}));
		setMerchnats(res);
	};

	// HANDLE MERCHANT CHANGE
	const onMerchantChange = (value: string) => {
		setTerminalPayload((prev) => ({ ...prev, merchant_id: (value) }));
	};

	// HANDLE CREATE TERMINAL
	const onCreateTerminal = async () => {
		try {
			const data = id
				? await terminalUseCases.updateTerminal(terminalPayload, (id))
				: await terminalUseCases.createTerminal(terminalPayload);

				console.log()
			const validationErrors = data as unknown as Terminal;
			setErrors(validationErrors);

			if (data.status === 'success') {
				toast.success(data.message);
				setTerminalPayload(id ? terminalPayload : initialPayload);
			}
		} catch (error) {
			const axiosEror = error as AxiosError;
			APIErrorMessageResonse(axiosEror);
		}
	};

	// Find Terminal Details
	const findTerminalDetails = async () => {
		const data = await terminalUseCases.findOneTerminalByPK((id as any));

		setTerminalPayload((prev) => ({
			...prev,
			serial_number: data.serial_number,
			model: data.model,
			manufacturer: data.manufacturer,
			merchant_id: data.merchant?.uuid || '', 
			display_name: data.display_name,
			app_name: data.app_name,
			os_name: data.os_name,
			firmware_version: data.firmware_version,
			network_name: data.network_name,
			battery_percentage: data.battery_percentage,
			network_signal_strength: data.network_signal_strength,
			warranty_expiry: data.warranty_expiry,
			app_version: data.app_version,
		}));
	};

	// Handle status change
	const handleStatusChange = (value: string) => {
		setTerminalPayload((prev) => ({ ...prev, status: value }));
	};

	//? EFFECTS
	useEffect(() => {
		findMerchants();
	}, []);

	useEffect(() => {
		if (id) {
			findTerminalDetails();
		}
	}, [id]);
	const todayDate = transformDateTimeISO(new Date().toISOString()).date;

	return (
		<div className='p-5 bg-white rounded-md'>
			<AppListHeader
				appListTitle={id ? 'Updated Terminal' : 'Create Terminal'}
				applistTitleIcon={<TabletSmartphone />}
				appIsDisplay={false}
			/>

			<div className='mt-10'>
				<AppInputWrapperFlexContainer>
				<AppInputWrapper>
					<AppInputLabel appInoutLabelText='Serial No' />
					<AppInputField
						appInputName='serial_number'
						appInputValue={terminalPayload.serial_number}
						appInputType='text'
						appOnInputChnage={onInputChange}
					/>
					<AppValidationMessage
						appValidationMessage={errors?.serial_number || ''}
					/>
				</AppInputWrapper>
				<AppInputWrapper>
					<AppInputLabel appInoutLabelText='Manufacturer' />
					<AppInputField
						appInputName='manufacturer'
						appInputValue={terminalPayload.manufacturer}
						appInputType='text'
						appOnInputChnage={onInputChange}
					/>
					<AppValidationMessage
						appValidationMessage={errors?.manufacturer || ''}
					/>
				</AppInputWrapper>
				</AppInputWrapperFlexContainer>
				<AppInputWrapperFlexContainer>
				<AppInputWrapper>
					<AppInputLabel appInoutLabelText='Display Name' />
					<AppInputField
						appInputName='display_name'
						appInputValue={terminalPayload.display_name}
						appInputType='text'
						appOnInputChnage={onInputChange}
					/>
					<AppValidationMessage appValidationMessage={errors?.display_name || ''} />
				</AppInputWrapper>
				<AppInputWrapper>
					<AppInputLabel appInoutLabelText='Model' />
					<AppInputField
						appInputName='model'
						appInputValue={terminalPayload.model}
						appInputType='text'
						appOnInputChnage={onInputChange}
					/>
					<AppValidationMessage appValidationMessage={errors?.model || ''} />
				</AppInputWrapper>
				</AppInputWrapperFlexContainer>	
				<AppInputWrapperFlexContainer>
				<AppInputWrapper>
					<AppInputLabel appInoutLabelText='App Name' />
					<AppInputField
						appInputName='app_name'
						appInputValue={terminalPayload.app_name}
						appInputType='text'
						appOnInputChnage={onInputChange}
					/>
					<AppValidationMessage appValidationMessage={errors?.app_name || ''} />
				</AppInputWrapper>
				<AppInputWrapper>
					<AppInputLabel appInoutLabelText='OS Name' />
					<AppInputField
						appInputName='os_name'
						appInputValue={terminalPayload.os_name}
						appInputType='text'
						appOnInputChnage={onInputChange}
					/>
					<AppValidationMessage appValidationMessage={errors?.os_name || ''} />
				</AppInputWrapper>
				</AppInputWrapperFlexContainer>	<AppInputWrapperFlexContainer>
				<AppInputWrapper>
					<AppInputLabel appInoutLabelText='Firmware version' />
					<AppInputField
						appInputName='firmware_version'
						appInputValue={terminalPayload.firmware_version}
						appInputType='text'
						appOnInputChnage={onInputChange}
					/>
					<AppValidationMessage appValidationMessage={errors?.firmware_version || ''} />
				</AppInputWrapper>
				<AppInputWrapper>
					<AppInputLabel appInoutLabelText='Network Name' />
					<AppInputField
						appInputName='network_name'
						appInputValue={terminalPayload.network_name}
						appInputType='text'
						appOnInputChnage={onInputChange}
					/>
					<AppValidationMessage appValidationMessage={errors?.network_name || ''} />
				</AppInputWrapper>
				</AppInputWrapperFlexContainer>	<AppInputWrapperFlexContainer>
				<AppInputWrapper>
					<AppInputLabel appInoutLabelText='Battery Percentage' />
					<AppInputField
						appInputName='battery_percentage'
						appInputValue={terminalPayload.battery_percentage}
						appInputType='number'
						appOnInputChnage={onInputChange}
					/>
					<AppValidationMessage appValidationMessage={errors?.battery_percentage || ''} />
				</AppInputWrapper>
				<AppInputWrapper>
					<AppInputLabel appInoutLabelText='Network Signal Strength' />
					<AppInputField
						appInputName='network_signal_strength'
						appInputValue={terminalPayload.network_signal_strength}
						appInputType='text'
						appOnInputChnage={onInputChange}
					/>
					<AppValidationMessage appValidationMessage={errors?.network_signal_strength || ''} />
				</AppInputWrapper>
				</AppInputWrapperFlexContainer>
					<AppInputWrapperFlexContainer>
				<AppInputWrapper>
					<AppInputLabel appInoutLabelText='Warranty Expiry' />
					<AppInputField
						appInputName='warranty_expiry'
						appInputValue={
							terminalPayload.warranty_expiry
							  ? transformDateTimeISO(terminalPayload.warranty_expiry).date
							  : ''
						  }
						appInputType='date' 
						appInputMin={todayDate}   
						appOnInputChnage={onInputChange}
					/>
					<AppValidationMessage appValidationMessage={errors?.warranty_expiry || ''} />
				</AppInputWrapper>	
				
			<AppInputWrapper>
					<AppInputLabel appInoutLabelText='App Version' />
					<AppInputField
						appInputName='app_version'
						appInputValue={terminalPayload.app_version}
						appInputType='text'
						appOnInputChnage={onInputChange}
					/>
					<AppValidationMessage appValidationMessage={errors?.app_version || ''} />
				</AppInputWrapper>
			
				</AppInputWrapperFlexContainer>
				<AppInputWrapper>
					<AppInputLabel appInoutLabelText='Merchant' />
					<AppSelectOptions
						value={terminalPayload?.merchant_id?.toString()}
						onChange={onMerchantChange}
						options={merchants}
					/>
				</AppInputWrapper>
				{id && (
					<AppInputWrapper>
						<AppInputLabel appInoutLabelText='Status' />
						<AppSelectOptions
							value={terminalPayload.status}
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
						appBtnText={id ? 'Updated' : 'Create'}
						appButtonOnClick={onCreateTerminal}
					/>
				</div>
			</div>
		</div>
	);
};

export default TerminalForm;
