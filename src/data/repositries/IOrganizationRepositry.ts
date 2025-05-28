import {
	Organization,
	SuccessReponseInterface,
} from '../../domain/models/Organization';

export interface IOrganizationRepositry {
	createOrganization(
		organization: Organization,
	): Promise<SuccessReponseInterface>;
	getOrganization(): Promise<Organization[]>;

	updateOrganization(
		id: number,
		payload: Organization,
	): Promise<SuccessReponseInterface>;

	deleteOrganization(id: number): Promise<SuccessReponseInterface>;
	findOrganizationDetails(id: number): Promise<Organization>;
}
