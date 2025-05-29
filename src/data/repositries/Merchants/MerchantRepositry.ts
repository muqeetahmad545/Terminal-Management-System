import { UserFilterParams } from "../../../domain/models/Login";
import { Merchant } from "../../../domain/models/Merchant";
import { SuccessReponseInterface } from "../../../domain/models/Organization";
import axiosInstance from "../../api/axiosInstance";
import { I_MerchantRepositry } from "./I_MerchantsRepositry";

export class MerchantRepositry implements I_MerchantRepositry {
  // CREATE
  async createMerchant(
    payload: Merchant | FormData
  ): Promise<SuccessReponseInterface> {
    const response = await axiosInstance.post<SuccessReponseInterface>(
      "merchants",
      payload
    );

    return response.data;
  }

  // FIND ALL
  async findAllMerchants(filterParams: UserFilterParams): Promise<Merchant[]> {
    const response = await axiosInstance.get<{ data: Merchant[] }>(
      "/merchants",
      { params: filterParams }
    );
    return response.data.data;
  }

  // FIND BY PK
  async findMerchantByPK(id: string): Promise<Merchant> {
    const response = await axiosInstance.get<{ data: Merchant }>(
      "merchants/" + id
    );
    return response.data.data;
  }

  // UPDATE
  async updateMerchant(
    payload: Merchant,
    id: string
  ): Promise<SuccessReponseInterface> {
    const response = await axiosInstance.put("merchants/" + id, payload);
    return response.data;
  }

  // DELETE
  async deleteMerchant(id: string): Promise<SuccessReponseInterface> {
    const response = await axiosInstance.delete("merchants/" + id);
    return response.data;
  }
}
