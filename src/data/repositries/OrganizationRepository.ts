import { AxiosError } from "axios";
import {
  Organization,
  SuccessReponseInterface,
} from "../../domain/models/Organization";
import axiosInstance from "../api/axiosInstance";
import { IOrganizationRepositry } from "./IOrganizationRepositry";
export class OrganizationRepository implements IOrganizationRepositry {
  //CREATE
  async createOrganization(
    organization: Organization
  ): Promise<SuccessReponseInterface> {
    try {
      const response = await axiosInstance.post<SuccessReponseInterface>(
        "/organizations",
        organization
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("instance", error);

        throw error;
      }
      throw error; // Re-throw unknown errors
    }
  }

  // GET ALL
  async getOrganization(): Promise<Organization[]> {
    const response = await axiosInstance.get<{ data: Organization[] }>(
      "/organizations"
    );
    return response.data.data;
  }

  // DELETE
  async deleteOrganization(id: string): Promise<SuccessReponseInterface> {
    const repsonse = await axiosInstance.delete("/organizations/" + id);

    return repsonse.data;
  }

  // UPDATE
  async updateOrganization(
    id: string,
    payload: Organization
  ): Promise<SuccessReponseInterface> {
    const response = await axiosInstance.put(`/organizations/${id}`, payload);
    return response.data;
  }

  // DETAILS
  async findOrganizationDetails(id: string): Promise<Organization> {
    const response = await axiosInstance.get<{ data: Organization }>(
      "/organizations/" + id
    );
    return response.data.data;
  }
}
