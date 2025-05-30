import { useEffect, useState } from "react";
import {
//   AppButton,
  AppTransactionCardHeader,
  AppTransactionData,
} from "../../../presentation/shared";
import "../styles.css";
import { Transactions } from "../../../domain/models/Transactions";
import { TransactionRepositry } from "../../../data/repositries/Transactions/TransactionsRepositry";
import { TransactionUseCases } from "../../../domain/usecases/transactions/terminalUsecases";
import { useParams } from "react-router-dom";
import { transformDateTimeISO } from "../../../utills/TransformISODateTime";

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
    console.log("id", id);
    console.log(data);
    setTransaction(data);
  };

  //? EFFECTS
  useEffect(() => {
    getTransactionDetails();
  }, [id]);

  const createdAt = transaction?.createdAt;
  const warrantyExpiry = transaction?.terminal?.warranty_expiry;
  const fallbackDate = new Date().toISOString();
  const latitude = parseFloat(transaction?.latitude || "0");
  const longitude = parseFloat(transaction?.longitude || "0");
  const mapSrc = `https://maps.google.com/maps?q=${latitude},${longitude}&z=16&output=embed`;

  return (
    <div className="bg-gray-50">
      <div className="grid grid-cols-3 gap-5">
        {/* LEFT SIDE */}
        <div className="col-span-2">
          {/* TRANSACTION DETAILS */}
          <div className="grid grid-cols-2 gap-5 mb-5 ">
            <div className=" relative p-5 bg-white rounded-md shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 hover:bg-gray-50 transition-all duration-200">
        
            <div className="pb-5 border-b border-gray-200 transaction-header text-center">
            <strong className="text-5xl font-medium text-gray-600">
                  {transaction?.merchant?.organization?.currency} - {transaction?.amount}
                </strong>
                <p className="mt-2 text-sm text-gray-500">
                  {transformDateTimeISO(createdAt || fallbackDate).date}{" "}
                  {transformDateTimeISO(createdAt || fallbackDate).time}
                </p>
              </div>
              <div className="pb-5 mt-10 text-sm text-gray-500 border-b border-gray-200 transaction-card-data ">
                <AppTransactionData
                  appTransKey="Status"
                  appTransValue={transaction?.status || ""}
                  appIsTransBadge={true}
                />

                {/* <AppTransactionData
                  appTransKey="Type"
                  appTransValue="Sale Card"
                  appIsTransBadge={true}
                /> */}
                <AppTransactionData
                  appTransKey="Tender Type"
                  appTransValue={transaction?.tender_type || ""}
                  appIsTransBadge={true}
                />
              </div>

              {/* <div className='absolute left-0 flex justify-center w-full gap-4 px-5 bottom-5 transaction-actions'> */}
              <div className="pb-5 mt-5 text-sm  transaction-card-data">
              <AppTransactionData 
                  appTransKey="App Name"
                  appTransValue={transaction?.app_name || ""}
                  appIsTransBadge={true}
                /> 
                <AppTransactionData 
                  appTransKey="Transaction Type"
                  appTransValue={transaction?.transaction_type || ""}
                  appIsTransBadge={true}
                />
                {/* <AppButton appIsBtnRadius={true} appBtnText='Customer ' />
								<AppButton appIsBtnRadius={true} appBtnText='Merchant ' /> */}
                
							</div>
            </div>
            <div className="">
            <div className="p-5 mb-5 bg-white rounded-md shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 hover:bg-gray-50 transition-all duration-200">
            <AppTransactionCardHeader appTransactionCardTitle="Merchant Information" />
                <div className="transaction-card-data">
                  <AppTransactionData
                    appTransKey="Name"
                    appTransValue={transaction?.merchant.name || ""}
                  />
                  <AppTransactionData
                    appTransKey="MCC"
                    appTransValue={transaction?.merchant.mcc || ""}
                  />
                </div>
              </div>
              <div className="p-5 bg-white rounded-md shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 hover:bg-gray-50 transition-all duration-200">
              <AppTransactionCardHeader appTransactionCardTitle="Transactions" />
                <div className="transaction-card-data">
                  <AppTransactionData
                    appTransKey="RRN"
                    appTransValue={transaction?.rrn || "RRN-000"}
                  />
                  <AppTransactionData
                    appTransKey="Response"
                    appTransValue={transaction?.status || "4455335"}
                  />
                  <AppTransactionData
                    appTransKey="STAN"
                    appTransValue={transaction?.stan || "STAN-000"}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* EMV DETAILS */}
          <div className="p-5 mb-5 bg-white rounded-md shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 hover:bg-gray-50 transition-all duration-200">
          <AppTransactionCardHeader appTransactionCardTitle="EMV Details" />
            <div className="flex items-center justify-between gap-10 transaction-card-data">
              <div className="flex-1 ">
                <AppTransactionData
                  appTransKey="Entry Mode"
                  appTransValue={transaction?.emv_entry_mode || "Not Provided"}
                />
                <AppTransactionData
                  appTransKey="MID"
                  appTransValue={transaction?.emv_mid || "Not Provided"}
                />
                {/* <AppTransactionData
									appTransKey='CVM Condition code'
									appTransValue={transaction?.emv_mid || 'Not Provided'}
								/> */}
                <AppTransactionData
                  appTransKey="Auth"
                  appTransValue={transaction?.emv_auth || "Not Provided"}
                />
                <AppTransactionData
                  appTransKey="TVR"
                  appTransValue={transaction?.emv_tvr || "Not Provided"}
                />
              </div>
              <div className="flex-1 ">
                <AppTransactionData
                  appTransKey="TID"
                  appTransValue={transaction?.emv_tid || "Not Provided"}
                />
                <AppTransactionData
                  appTransKey="CVM Method"
                  appTransValue={transaction?.emv_cvm_method || "Not Provided"}
                />
                {/* <AppTransactionData
									appTransKey='CVM rule result'
									appTransValue='4455335'
								/> */}
                <AppTransactionData
                  appTransKey="AID"
                  appTransValue={transaction?.emv_aid ?? "Not Provided"}
                />
                <AppTransactionData
                  appTransKey="TSI"
                  appTransValue={transaction?.emv_tsi ?? "Not Provided"}
                />
              </div>
            </div>
          </div>

          {/* TERMINAL DETAILS */}
          <div className="p-5 mb-5 bg-white rounded-md shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 hover:bg-gray-50 transition-all duration-200">
          <AppTransactionCardHeader appTransactionCardTitle="Terminal information" />
            <div className="flex items-center justify-between gap-10 transaction-card-data">
              <div className="flex-1">
                <AppTransactionData
                  appTransKey="Manufacturer"
                  appTransValue={transaction?.terminal.manufacturer || ""}
                />
                <AppTransactionData
                  appTransKey="Serial number"
                  appTransValue={transaction?.terminal.serial_number || ""}
                />
                <AppTransactionData
                  appTransKey="App name"
                  appTransValue={transaction?.terminal.app_name || "APP-000"}
                />
                <AppTransactionData
                  appTransKey="OS version"
                  appTransValue={
                    transaction?.terminal.firmware_version || "V-000"
                  }
                />
                <AppTransactionData
                  appTransKey="Network name"
                  appTransValue={
                    transaction?.terminal.network_name || "NETWORK-000"
                  }
                />
                <AppTransactionData
                  appTransKey="Battery"
                  appTransValue={
                    transaction?.terminal.battery_percentage || "0"
                  }
                />
              </div>
              <div className="flex-1">
                <AppTransactionData
                  appTransKey="Model"
                  appTransValue={transaction?.terminal.model || "MODEL-000"}
                />
                <AppTransactionData
                  appTransKey="Friendly name"
                  appTransValue={
                    transaction?.terminal.display_name || "Not Provided"
                  }
                />
                <AppTransactionData
                  appTransKey="App version"
                  appTransValue={
                    transaction?.terminal.app_version || "Not Provided"
                  }
                />
                <AppTransactionData
                  appTransKey="Firmware version"
                  appTransValue={
                    transaction?.terminal.firmware_version || "FV-000"
                  }
                />
                <AppTransactionData
                  appTransKey="Warrenty expiry date"
                  // appTransValue='4455335'
                  appTransValue={
                    warrantyExpiry
                      ? transformDateTimeISO(warrantyExpiry).date
                      : "Not Provided"
                  }
                />
                <AppTransactionData
                  appTransKey="Network signal strength"
                  appTransValue={
                    transaction?.terminal.network_signal_strength || "0"
                  }
                />
              </div>
            </div>
          </div>
        </div>
        {/* RIGHT BAR SIDE */}
        <div className="col-span-1">
          {/* TIMELINE */}
          {/* <div className='p-5 mb-5 bg-white rounded-md'>
						<AppTransactionCardHeader appTransactionCardTitle='Timeline' />
					</div> */}

          {/* MAP */}
          {latitude !== 0 && longitude !== 0 && (
        <div className="p-5 mb-5 bg-white rounded-md shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 hover:bg-gray-50 transition-all duration-200">
            <AppTransactionCardHeader
              appIsTrasactionButton={true}
              appTransactionCardTitle="Map"
            />
            <div
              className="border border-gray-100 rounded-md overflow-hidden"
              style={{ height: "440px" }}
            >
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src={mapSrc}
                title="Transaction Location"
                loading="lazy"
              ></iframe>
            </div>

            <div className="mt-7 transaction-card-data">
              <AppTransactionData
                appTransKey="Latitude"
                appTransValue={transaction?.latitude || "0"}
              />
              <AppTransactionData
                appTransKey="Longitude"
                appTransValue={transaction?.longitude || "0"}
              />
            </div>
          </div>
          )}


          {/* PAYEMNY GATEWAY */}
          {/* <div className='p-5 bg-white rounded-md'>
						<AppTransactionCardHeader appTransactionCardTitle='Payment Gateway' />
						<div className='transaction-card-data'>
							<AppTransactionData
								appTransKey='Refrence'
								appTransValue='234FFGS4343'
							/>
						</div>
					</div> */}
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailsView;
