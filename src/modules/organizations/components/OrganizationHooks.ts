import { useState } from 'react';
import { OrganizationRepository } from '../../../data/repositries/OrganizationRepository';
import { Organization } from '../../../domain/models/Organization';
import { OrganizationUseCases } from '../../../domain/usecases/organizations/OrganizationUseCases';
import { useParams } from 'react-router-dom';
import { ConfigurationRepositry } from '../../../data/repositries/Configurations/Configurations';
import { ConfigurationUseCases } from '../../../domain/usecases/configurations/ConfigurationsUseCase';

export const useOrganizations = () => {
	//? INSTANCES
	const repo = new OrganizationRepository();
	const configRepo = new ConfigurationRepositry();
	const orgUseCases = new OrganizationUseCases(repo);
	const configUseCases = new ConfigurationUseCases(configRepo);

	//? HOOKS
	const { id } = useParams();

	//? STATES
	const [organizations, setOrganizations] = useState<Organization[]>([]);
	const [recordStats, setRcordStats] = useState({ active: 0, inactive: 0 });

	//? HANDLERS
	// GET LIST OF ORGANIZATIONS
	const getOrganozations = async () => {
		const data = await orgUseCases.findAll();
		const inActiveOrgs = data.filter((org) => org.status === 'Inactive').length;
		const activeOrgs = data.filter((org) => org.status === 'Active').length;
		setOrganizations(data);
		setRcordStats({ active: activeOrgs, inactive: inActiveOrgs });

		return data;
	};

	// GET ORGANIZATION ==== id
	const getOrganization = async (id: number) => {
		const data = await orgUseCases.findSingleOrganization(id);
		return data;
	};

	return {
		organizations,
		recordStats,
		setOrganizations,
		getOrganozations,
		organizationUseCase: orgUseCases,
		oranizationId: id,
		getOrganization,
		configUseCases,
	};
};
