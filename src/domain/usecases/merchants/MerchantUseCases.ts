import * as Yup from "yup";
import { MerchantRepositry } from "../../../data/repositries/Merchants/MerchantRepositry";
import { merchantSchema } from "../../../utills/MerchantValidator";
import { Merchant } from "../../models/Merchant";
import { UserFilterParams } from "../../models/Login";

export class MerchantUseCases {
  constructor(private merchantRepo: MerchantRepositry) {}
  // CREATE
  async createMerchant(payload: Merchant | FormData) {
    const errors: { [key: string]: string } = {};

    // Check if payload is FormData
    if (payload instanceof FormData) {
      const data = await this.merchantRepo.createMerchant(payload);
      return data;
    }

    // validate merchant schema
    try {
      await merchantSchema.validate(payload, { abortEarly: false });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((err) => {
          if (err.path) errors[err.path] = err.message;
        });

        return errors;
      }
    }
    const data = await this.merchantRepo.createMerchant(payload);
    return data;
  }

  // FIND ALL
  async findAllMerchants(filterParams: UserFilterParams) {
    const data = await this.merchantRepo.findAllMerchants(filterParams);

    return data;
  }

  // FIND BY PK
  async findMerchantByPK(id: string) {
    const data = await this.merchantRepo.findMerchantByPK(id);
    return data;
  }

  // DELETE
  async deleteMerchant(id: string) {
    const data = await this.merchantRepo.deleteMerchant(id);
    return data;
  }

  // UPDATE
  async updateMerchant(payload: Merchant, id: string) {
    const data = await this.merchantRepo.updateMerchant(payload, id);
    return data;
  }
}
