import { TabletSmartphone } from 'lucide-react';
import {
	AppButton,
	AppInputField,
	AppInputLabel,
	AppInputWrapper,
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

// Define the type for the organization options
interface MerchantOption {
	label: string;
	value: string;
}

const initialPayload = {
	serial_number: '',
	model: '',
	manufacturer: '',
	created_from_portal: true,
	merchant_id: undefined,
	status: 'Active',
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
		setTerminalPayload((prev) => ({ ...prev, [name]: value }));
	};

	// FIND MERCHANTS
	const findMerchants = async () => {
		const data = await findAllMerchants();
		const res = data.map((merchant) => ({
			label: merchant.name,
			value: merchant.id?.toString() || '',
		}));
		setMerchnats(res);
	};

	// HANDLE MERCHANT CHANGE
	const onMerchantChange = (value: string) => {
		setTerminalPayload((prev) => ({ ...prev, merchant_id: parseInt(value) }));
	};

	// HANDLE CREATE TERMINAL
	const onCreateTerminal = async () => {
		try {
			const data = id
				? await terminalUseCases.updateTerminal(terminalPayload, parseInt(id))
				: await terminalUseCases.createTerminal(terminalPayload);

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
		const data = await terminalUseCases.findOneTerminalByPK(parseInt(id || ''));

		setTerminalPayload((prev) => ({
			...prev,
			serial_number: data.serial_number,
			model: data.model,
			manufacturer: data.manufacturer,
			merchant_id: data.merchant_id,
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
	return (
		<div className='p-5 bg-white rounded-md'>
			<AppListHeader
				appListTitle='Create Terminal'
				applistTitleIcon={<TabletSmartphone />}
				appIsDisplay={false}
			/>

			<div className='mt-10'>
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
				<AppInputWrapper>
					<AppInputLabel appInoutLabelText='Display Name' />
					<AppInputField />
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
