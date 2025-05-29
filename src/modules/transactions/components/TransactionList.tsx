import { ArrowRight, Banknote } from 'lucide-react';
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
	AppSelectOptions,
	TransactionStatus,
} from '../../../presentation/shared';
import { useNavigate } from 'react-router-dom';
import { TransactionRepositry } from '../../../data/repositries/Transactions/TransactionsRepositry';
import { TransactionUseCases } from '../../../domain/usecases/transactions/terminalUsecases';
import { useEffect, useState } from 'react';
import { Transactions } from '../../../domain/models/Transactions';
import { transformDateTimeISO } from '../../../utills/TransformISODateTime';
import { useMerchant } from '../../merchants/MerchantHooks';
import { UserFilterParams } from '../../../domain/models/Login';

// Define the type for the organization options
interface MerchnatOption {
	label: string;
	value: string;
}

const initialParams = {
	status: '',
	merchant_id: null,
};
const TransactionList = () => {
	//? HOOKS
	const navigate = useNavigate();
	const { findAllMerchants } = useMerchant();

	//? STATES
	const [transactions, setTransaction] = useState<Transactions[]>([]);
	const [isFilterModel, setIsFilterModel] = useState<boolean>(false);
	const [merchants, setMerchants] = useState<MerchnatOption[]>([]);
	const [filterParams, setFilterParams] =
		useState<UserFilterParams>(initialParams);

	//? INSATANCES
	const transactionRepo = new TransactionRepositry();
	const transactionUsecases = new TransactionUseCases(transactionRepo);

	//? HANDLER
	const getAllTransaction = async () => {
		const data = await transactionUsecases.findTransactions({});
		setTransaction(data);
	};

	const getAllMerchants = async () => {
		const merchants = await findAllMerchants();
		const res = merchants.map((merchant) => ({
			label: merchant.name || '',
			value: merchant.id?.toString() || '',
		}));
		setMerchants(res);
	};

	// HANDLE STATUS CHANGE
	const handleStatusChange = (value: string) => {
		setFilterParams({
			...filterParams,
			status: value,
		});
	};

	// HANDLE MERCHANT CHANGE
	const handleMerchantChange = (value: string) => {
		setFilterParams({
			...filterParams,
			merchant_id: parseInt(value),
		});
	};

	// FILTER RECORDS
	const onFilterRecordsData = async (params: UserFilterParams) => {
		console.log(params);
		const data = await transactionUsecases.findTransactions(params);
		setTransaction(data);
	};

	//? EFFECTS
	useEffect(() => {
		getAllTransaction();
	}, []);
	return (
		<>
			<div className='flex items-center gap-5 mb-5 page-header'>
				<AppListSearch
					appListFilterClick={() => {
						setIsFilterModel(true);
						getAllMerchants();
					}}
				/>

				<AppListFilterStatus
					appListActiveCount={20}
					appListInactiveCount={30}
				/>
			</div>
			<div className=' bg-white  rounded-[5px] p-5'>
				<AppListHeader
					applistTitleIcon={<Banknote />}
					appListTitle='transactions'
				/>
				<ul className='sticky mt-5'>
					<AppListItem>
						<span className='flex-1 py-1 text-sm font-medium text-gray-600'>
							Merchant
						</span>
						<span className='flex-1 text-sm font-medium text-gray-600'>
							Amount
						</span>	
						<span className='flex-1 text-sm font-medium text-gray-600'>
							App Name
						</span>
						<span className='flex-1 text-sm font-medium text-gray-600'>
							Tender
						</span>
						<span className='flex-1 text-sm font-medium text-gray-600'>
							Date
						</span>
						<span className='flex-1 text-sm font-medium text-gray-600'>
							Status
						</span>
						<span className='flex-1 max-w-[112px] text-sm font-medium w-[112px] text-gray-600'>
							Actions
						</span>
					</AppListItem>
				</ul>
				<ul className='mt-5 ul-list'>
					{transactions.map((payment, index) => (
						<AppListItem appIndex={index}>
							{/* <AppListCounter index={index} /> */}
							<p className='flex flex-1 gap-2 text-sm'>
								<span className='block font-medium'>
									{payment.merchant.name}
								</span>
							</p>
							<span className='flex-1 text-sm'>
								{payment.amount.toFixed(2)}
							</span>
							<span className='flex-1 text-sm'>{payment.app_name}</span>
							<span className='flex-1 text-sm'>{payment.tender_type}</span>
							<span className='flex-1 text-sm'>
								{transformDateTimeISO(payment.createdAt).date +
									' ' 
									// + transformDateTimeISO(payment.createdAt).time
									}
							</span>
							<TransactionStatus transactionStatus={payment.status} />
							<div className='flex items-center flex-1 max-w-[112px] justify-between gap-2 actions'>
								<AppListActionIconWrapper
									actionClick={() => {
										navigate('/transaction/' + payment.uuid);
									}}
								>
									<ArrowRight className='cursor-pointer' size={18} />
								</AppListActionIconWrapper>
							</div>
						</AppListItem>
					))}
				</ul>
			</div>
			{isFilterModel && (
				<AppModal
					apponModalClosed={() => setIsFilterModel(false)}
					appModalTitle='Filter Transaction'
				>
					<div>
						<AppInputWrapper>
							<AppInputLabel appInoutLabelText='status' />
							<AppSelectOptions
								options={[
									{ value: 'Approved', label: 'Approved' },
									{ value: 'Declined', label: 'Declined' },
									{ value: 'Reversed', label: 'Reversed' },
									{ value: 'Refunded', label: 'Refunded' },
									{ value: 'Failed', label: 'Failed' },
									{ value: 'Voided', label: 'Voided' },
								]}
								defaultOption='Select Status'
								className='relative'
								onChange={handleStatusChange}
							/>
						</AppInputWrapper>
						<AppInputWrapper>
							<AppInputLabel appInoutLabelText='merchant' />
							<AppSelectOptions
								options={merchants}
								defaultOption='Select merchant'
								className='relative'
								onChange={handleMerchantChange}
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
									getAllTransaction();
									setIsFilterModel(false);
									setFilterParams(initialParams);
								}}
							/>
						</div>
					</div>
				</AppModal>
			)}
		</>
	);
};

export default TransactionList;
