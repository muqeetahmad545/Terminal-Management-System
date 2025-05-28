import { UserFilterParams } from '../../../domain/models/Login';
import { Merchant } from '../../../domain/models/Merchant';
import { SuccessReponseInterface } from '../../../domain/models/Organization';

export interface I_MerchantRepositry {
	createMerchant(payload: Merchant): Promise<SuccessReponseInterface>;
	findAllMerchants(filterParams: UserFilterParams): Promise<Merchant[]>;
	findMerchantByPK(id: number): Promise<Merchant>;
	updateMerchant(
		payload: Merchant,
		id: number,
	): Promise<SuccessReponseInterface>;
	deleteMerchant(id: number): Promise<SuccessReponseInterface>;
}
