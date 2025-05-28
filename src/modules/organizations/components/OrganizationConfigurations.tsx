import {
	Mail,
	MapPin,
	MessageSquareMore,
	Printer,
	QrCode,
	Settings,
	TabletSmartphone,
	Timer,
	Tv2,
} from 'lucide-react';
import { useEffect, useReducer, useState } from 'react';
import {
	AppButton,
	AppCardSettings,
	AppConfigTabsBar,
	AppListHeader,
} from '../../../presentation/shared';

import { Configurations } from '../../../domain/models/Configurations';
import toast from 'react-hot-toast';
import { useOrganizations } from './OrganizationHooks';

const initialState: Configurations = {
	validate_date_time: false,
	geo_location: false,
	stand_alone_mode: false,

	auto_print_merchant_copy: false,
	auto_print_customer_copy: false,
	qr_code_receipts: false,

	automatically_sms_receipts: false,
	automatically_email_receipts: false,
	card_present_terminal: false,
	type: 'Organization',
};

type Action =
	| { type: 'TOGGLE_CARD'; payload: keyof Configurations }
	| { type: 'UPDATE_STATE'; payload: Partial<Configurations> };

const cardReducer = (state: Configurations, action: Action) => {
	switch (action.type) {
		case 'TOGGLE_CARD':
			return { ...state, [action.payload]: !state[action.payload] };

		case 'UPDATE_STATE':
			return { ...state, ...action.payload };

		default:
			throw new Error(`Unhandled action type: `);
	}
};

const OrganizationConfigurations = () => {
	//? STATES

	const [state, dispatch] = useReducer(cardReducer, initialState);
	const [activeIndex, setActiveIndex] = useState(0);

	//? HOOKS
	const { oranizationId, configUseCases } = useOrganizations();

	//? HANDLERS
	const handleCardClick = (cardKey: keyof Configurations) => {
		dispatch({ type: 'TOGGLE_CARD', payload: cardKey });
	};

	// HANDLE UPDATE GENERAL SETTIGNS
	const handleUpdateGenrealSettings = async () => {
		const payload = {
			...state,
			organization_id: parseInt(oranizationId || ''),
			type: 'Organization',
		};
		const data = await configUseCases.makeConfiguration(payload);
		toast.success(data.message);
	};

	// FIND
	const getConfigurations = async () => {
		const data = await configUseCases.findConfigurations(
			parseInt(oranizationId || ''),
			'Organization',
			null,
			null,
			null,
		);
		dispatch({ type: 'UPDATE_STATE', payload: data });

		return data;
	};

	//? EFFECTS
	useEffect(() => {
		getConfigurations();
	}, []);
	return (
		<div className='p-5 bg-white rounded-md'>
			<AppListHeader
				appListTitle={`${
					state.organization?.name || 'Organization'
				} Configurations`}
				applistTitleIcon={<Settings />}
			/>
			<AppConfigTabsBar
				activeIndex={activeIndex}
				setActiveIndex={setActiveIndex}
			/>

			<div className='mt-10 content'>
				{/* GENERAL SETTINGS */}
				{activeIndex == 0 && (
					<>
						<div className='grid grid-cols-2 gap-5 text-sm'>
							<AppCardSettings
								appCardIcon={<Timer />}
								appCardMessage='Implement automated transaction blocking for terminals with
									inaccurate date and time settings.'
								appCardTitle='Validate date and time'
								appCardonClick={() => handleCardClick('validate_date_time')}
								appCardIsActive={state['validate_date_time']}
							/>
							<AppCardSettings
								appCardIcon={<MapPin />}
								appCardMessage='Allow the payemnt application to access the terminal location.'
								appCardTitle='Geo-location'
								appCardonClick={() => handleCardClick('geo_location')}
								appCardIsActive={state['geo_location']}
							/>
							<AppCardSettings
								appCardIcon={<Tv2 />}
								appCardMessage='Allow the application to independentaly initiate the payments without integration into a pont-of-sale system.'
								appCardTitle='Stand alone mode'
								appCardonClick={() => handleCardClick('stand_alone_mode')}
								appCardIsActive={state['stand_alone_mode']}
							/>
						</div>
					</>
				)}

				{/* RECEIPTS SETTINGS */}
				{activeIndex == 1 && (
					<div className='grid grid-cols-2 gap-5 text-sm'>
						<AppCardSettings
							appCardIcon={<Printer />}
							appCardMessage='Allow the application to auto print a merchant copy'
							appCardTitle='Auto print merchant copy'
							appCardIsActive={state['auto_print_merchant_copy']}
							appCardonClick={() => handleCardClick('auto_print_merchant_copy')}
						/>
						<AppCardSettings
							appCardIcon={<Printer />}
							appCardMessage='Alow the application to auto print customer copy'
							appCardTitle='Auto print cusotmer copy'
							appCardIsActive={state['auto_print_customer_copy']}
							appCardonClick={() => handleCardClick('auto_print_customer_copy')}
						/>
						<AppCardSettings
							appCardIcon={<QrCode />}
							appCardMessage='Allow the customers to scan a QR code to get their receipts'
							appCardTitle='QR code receipts'
							appCardIsActive={state['auto_print_customer_copy']}
							appCardonClick={() => handleCardClick('auto_print_customer_copy')}
						/>
					</div>
				)}
				{/* PAYMENT SETTINGS */}
				{activeIndex == 2 && (
					<div className='grid grid-cols-2 gap-5 text-sm'>
						<AppCardSettings
							appCardIcon={<MessageSquareMore />}
							appCardMessage='Allow the customer to recieve sms receipts'
							appCardTitle='SMS Receitps'
							appCardIsActive={state['automatically_sms_receipts']}
							appCardonClick={() =>
								handleCardClick('automatically_sms_receipts')
							}
						/>
						<AppCardSettings
							appCardIcon={<Mail />}
							appCardMessage='Allow the customer to recieve email receipts'
							appCardTitle='Email Receitps'
							appCardIsActive={state['automatically_email_receipts']}
							appCardonClick={() =>
								handleCardClick('automatically_email_receipts')
							}
						/>
						<AppCardSettings
							appCardIcon={<TabletSmartphone />}
							appCardMessage='Allow the customer to pay using a card on a terminal'
							appCardTitle='Card present terminal'
							appCardIsActive={state['card_present_terminal']}
							appCardonClick={() => handleCardClick('card_present_terminal')}
						/>
					</div>
				)}
				{/* TRANSACTION SETTINGS */}
				{activeIndex == 3 && <div>Transactios</div>}

				<div className='flex justify-end gap-3 p-3 mt-10 text-right rounded-md'>
					<AppButton
						appIsOutlineBtn={true}
						appBtnText='Back'
						appButtonOnClick={handleUpdateGenrealSettings}
					/>
					<AppButton
						appBtnText='Update '
						appButtonOnClick={handleUpdateGenrealSettings}
					/>
				</div>
			</div>
		</div>
	);
};

export default OrganizationConfigurations;
