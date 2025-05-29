import * as Yup from "yup";
import { IOrganizationRepositry } from "../../../data/repositries/IOrganizationRepositry";

import {
  Organization,
  SuccessReponseInterface,
} from "../../models/Organization";
import { organizationSchema } from "../../../utills/OrganizationValidator";
import { AxiosError } from "axios";

export class OrganizationUseCases {
  constructor(private organRepo: IOrganizationRepositry) {}

  async create(organization: Organization) {
    const errors: { [key: string]: string } = {};

    // Validate the organization object using Yup
    try {
      await organizationSchema.validate(organization, { abortEarly: false });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((err) => {
          if (err.path) errors[err.path] = err.message;
        });

        return { success: false, errors };
      }
    }

    // Attempt to create the organization via the repository
    try {
      const data = await this.organRepo.createOrganization(organization);
      return { success: true, data };
    } catch (error) {
      // Handle API errors
      if (error instanceof AxiosError) {
        throw error;
      }
      if (error instanceof Error) {
        return { success: false, errors: { message: error.message } };
      }

      throw new Error("Unknown error occurred");
    }

    const data = this.organRepo.createOrganization(organization);
    return { success: true, data };
  }

  async findAll(): Promise<Organization[]> {
    return this.organRepo.getOrganization();
  }

  // DELETE
  async deleteOrganization(id: string) {
    const data = this.organRepo.deleteOrganization(id);
    return data;
  }

  // UPDATE
  async updateOrganization(
    id: string,
    payload: Organization
  ): Promise<{
    success: boolean;
    data: SuccessReponseInterface;
    errors?: { [key: string]: string };
  }> {
    const data = await this.organRepo.updateOrganization(id, payload);
    return { success: true, data };
  }

  // GET SINGEL ORGANIZATIOM
  async findSingleOrganization(uuid: string) {
    const data = this.organRepo.findOrganizationDetails(uuid);
    return data;
  }
}
