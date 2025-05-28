import { useEffect, useState } from 'react';
import {
	AppButton,
	AppTransactionCardHeader,
	AppTransactionData,
} from '../../../presentation/shared';
import '../styles.css';
import { Transactions } from '../../../domain/models/Transactions';
import { TransactionRepositry } from '../../../data/repositries/Transactions/TransactionsRepositry';
import { TransactionUseCases } from '../../../domain/usecases/transactions/terminalUsecases';
import { useParams } from 'react-router-dom';
import { transformDateTimeISO } from '../../../utills/TransformISODateTime';

const TransactionDetailsView = () => {
	//? HOOKS
	const { id } = useParams();

	//? STATES
	const [transaction, setTransaction] = useState<Transactions>();

	//? INSATANCES
	const transactionRepo = new TransactionRepositry();
	const transactionUsecases = new TransactionUseCases(transactionRepo);

	//? HANDLERS
	const getTransactionDetails = async () => {
		if (!id) return;
		const data = await transactionUsecases.findTransactionByID(id);
		console.log("id",id)
		console.log(data);
		setTransaction(data);
	};

	//? EFFECTS
	useEffect(() => {
		getTransactionDetails();
	}, [id]);

	const createdAt = transaction?.createdAt;
    const fallbackDate = new Date().toISOString()
	return (
		<div className='bg-gray-50'>
			<div className='grid grid-cols-3 gap-5'>
				{/* LEFT SIDE */}
				<div className='col-span-2'>
					{/* TRANSACTION DETAILS */}
					<div className='grid grid-cols-2 gap-5 mb-5'>
						<div className='relative p-5 bg-white rounded-md col-span-2ddd'>
							<div className='pb-5 border-b border-gray-100 transaction-header'>
								<strong className='text-xl font-medium text-gray-600 '>
									PKR - {transaction?.amount}
								</strong>
								<p className='mt-2 text-sm text-gray-500'>
  {transformDateTimeISO(createdAt || fallbackDate).date}{' '}
  {transformDateTimeISO(createdAt || fallbackDate).time}
</p>
							</div>
							<div className='pb-5 mt-5 text-sm text-gray-500 border-b border-gray-100 transaction-card-data'>
								<AppTransactionData
									appTransKey='Status'
									appTransValue={transaction?.status || ''}
									appIsTransBadge={true}
								/>
								<AppTransactionData
									appTransKey='Type'
									appTransValue='Sale Card'
									appIsTransBadge={true}
								/>
								<AppTransactionData
									appTransKey='Tender Type'
									appTransValue={transaction?.tender_type || ''}
									appIsTransBadge={true}
								/>
							</div>

							{/* <div className='absolute left-0 flex justify-center w-full gap-4 px-5 bottom-5 transaction-actions'>
								<AppButton appIsBtnRadius={true} appBtnText='Customer ' />
								<AppButton appIsBtnRadius={true} appBtnText='Merchant ' />
							</div> */}
						</div>
						<div className=''>
							<div className='p-5 mb-5 bg-white rounded-md'>
								<AppTransactionCardHeader appTransactionCardTitle='Merchant Information' />
								<div className='transaction-card-data'>
									<AppTransactionData
										appTransKey='Name'
										appTransValue={transaction?.merchant.name || ''}
									/>
									<AppTransactionData
										appTransKey='Type'
										appTransValue='ISO Merchant'
									/>
								</div>
							</div>
							<div className='p-5 bg-white rounded-md'>
								<AppTransactionCardHeader appTransactionCardTitle='Transactions' />
								<div className='transaction-card-data'>
									<AppTransactionData
										appTransKey='RRN'
										appTransValue={transaction?.rrn || 'RRN-000'}
									/>
									<AppTransactionData
										appTransKey='Response'
										appTransValue='4455335'
									/>
									<AppTransactionData
										appTransKey='STAN'
										appTransValue={transaction?.stan || 'STAN-000'}
									/>
								</div>
							</div>
						</div>
					</div>

					{/* EMV DETAILS */}
					<div className='p-5 mb-5 bg-white rounded-md'>
						<AppTransactionCardHeader appTransactionCardTitle='EMV Details' />
						<div className='flex items-center justify-between gap-10 transaction-card-data'>
							<div className='flex-1 '>
								<AppTransactionData
									appTransKey='Entity Mode'
									appTransValue='4455335'
								/>
								<AppTransactionData appTransKey='MID' appTransValue='4455335' />
								<AppTransactionData
									appTransKey='CVM Condition code'
									appTransValue='4455335'
								/>
								<AppTransactionData
									appTransKey='Auth'
									appTransValue='4455335'
								/>
								<AppTransactionData appTransKey='TVR' appTransValue='4455335' />
							</div>
							<div className='flex-1 '>
								<AppTransactionData appTransKey='TID' appTransValue='4455335' />
								<AppTransactionData
									appTransKey='CVM Method'
									appTransValue='4455335'
								/>
								<AppTransactionData
									appTransKey='CVM rule result'
									appTransValue='4455335'
								/>
								<AppTransactionData appTransKey='AID' appTransValue='4455335' />
								<AppTransactionData appTransKey='TSI' appTransValue='4455335' />
							</div>
						</div>
					</div>

					{/* TERMINAL DETAILS */}
					<div className='p-5 mb-5 bg-white rounded-md'>
						<AppTransactionCardHeader appTransactionCardTitle='Terminal information' />
						<div className='flex items-center justify-between gap-10 transaction-card-data'>
							<div className='flex-1'>
								<AppTransactionData
									appTransKey='Manufacturer'
									appTransValue={transaction?.terminal.manufacturer || ''}
								/>
								<AppTransactionData
									appTransKey='Serial number'
									appTransValue={transaction?.terminal.serial_number || ''}
								/>
								<AppTransactionData
									appTransKey='App name'
									appTransValue={transaction?.terminal.app_name || 'APP-000'}
								/>
								<AppTransactionData
									appTransKey='OS version'
									appTransValue={
										transaction?.terminal.firmware_version || 'V-000'
									}
								/>
								<AppTransactionData
									appTransKey='Network name'
									appTransValue={
										transaction?.terminal.network_name || 'NETWORK-000'
									}
								/>
								<AppTransactionData
									appTransKey='Battery'
									appTransValue={
										transaction?.terminal.battery_percentage || '0'
									}
								/>
							</div>
							<div className='flex-1'>
								<AppTransactionData
									appTransKey='Model'
									appTransValue={transaction?.terminal.model || 'MODEL-000'}
								/>
								<AppTransactionData
									appTransKey='Friendly name'
									appTransValue='4455335'
								/>
								<AppTransactionData
									appTransKey='App version'
									appTransValue='4455335'
								/>
								<AppTransactionData
									appTransKey='Firmware version'
									appTransValue={
										transaction?.terminal.firmware_version || 'FV-000'
									}
								/>
								<AppTransactionData
									appTransKey='Warrenty expiry date'
									appTransValue='4455335'
								/>
								<AppTransactionData
									appTransKey='Network signal strength'
									appTransValue={
										transaction?.terminal.network_signal_strength || '0'
									}
								/>
							</div>
						</div>
					</div>
				</div>
				{/* RIGHT BAR SIDE */}
				<div className='col-span-1'>
					{/* TIMELINE */}
					<div className='p-5 mb-5 bg-white rounded-md'>
						<AppTransactionCardHeader appTransactionCardTitle='Timeline' />
					</div>

					{/* MAP */}
					<div className='p-5 mb-5 bg-white rounded-md'>
						<AppTransactionCardHeader
							appIsTrasactionButton={true}
							appTransactionCardTitle='Map'
						/>
						<img
							className='border border-gray-100 rounded-md'
							src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Lahore_Map.PNG/1200px-Lahore_Map.PNG'
							alt=''
						/>
						<div className='mt-7 transaction-card-data'>
							<AppTransactionData
								appTransKey='Latitude'
								appTransValue='445.4456'
							/>
							<AppTransactionData
								appTransKey='Longitude'
								appTransValue='12.456'
							/>
						</div>
					</div>

					{/* PAYEMNY GATEWAY */}
					<div className='p-5 bg-white rounded-md'>
						<AppTransactionCardHeader appTransactionCardTitle='Payment Gateway' />
						<div className='transaction-card-data'>
							<AppTransactionData
								appTransKey='Refrence'
								appTransValue='234FFGS4343'
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TransactionDetailsView;
