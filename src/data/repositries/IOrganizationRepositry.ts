import {
  Organization,
  SuccessReponseInterface,
} from "../../domain/models/Organization";

export interface IOrganizationRepositry {
  createOrganization(
    organization: Organization
  ): Promise<SuccessReponseInterface>;
  getOrganization(): Promise<Organization[]>;

  updateOrganization(
    id: string,
    payload: Organization
  ): Promise<SuccessReponseInterface>;

  deleteOrganization(id: string): Promise<SuccessReponseInterface>;
  findOrganizationDetails(id: string): Promise<Organization>;
}
