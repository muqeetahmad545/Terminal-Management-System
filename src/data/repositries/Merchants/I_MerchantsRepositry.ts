import { UserFilterParams } from "../../../domain/models/Login";
import { Merchant } from "../../../domain/models/Merchant";
import { SuccessReponseInterface } from "../../../domain/models/Organization";

export interface I_MerchantRepositry {
  createMerchant(payload: Merchant): Promise<SuccessReponseInterface>;
  findAllMerchants(filterParams: UserFilterParams): Promise<Merchant[]>;
  findMerchantByPK(id: string): Promise<Merchant>;
  updateMerchant(
    payload: Merchant,
    id: string
  ): Promise<SuccessReponseInterface>;
  deleteMerchant(id: string): Promise<SuccessReponseInterface>;
}
