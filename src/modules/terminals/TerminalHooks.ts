import { useState } from 'react';
import { TerminalRepositery } from '../../data/repositries/Terminals/TerminalRepositry';
import { TerminalUseCases } from '../../domain/usecases/terminals/terminalUseCases';
import { Terminal } from '../../domain/models/Terminals';
import { useParams } from 'react-router-dom';
import { ConfigurationRepositry } from '../../data/repositries/Configurations/Configurations';
import { ConfigurationUseCases } from '../../domain/usecases/configurations/ConfigurationsUseCase';

export const useTerminals = () => {
	//? STATES
	const [terminals, setTerminals] = useState<Terminal[]>([]);
	const [recordStats, setRcordStats] = useState({ active: 0, inactive: 0 });

	//? INSTANCES
	const termnalRepo = new TerminalRepositery();
	const terminalUseCases = new TerminalUseCases(termnalRepo);
	const configReop = new ConfigurationRepositry();
	const configUseCases = new ConfigurationUseCases(configReop);

	const { id } = useParams();

	//? HANDLERS
	const fetchAllTerminals = async () => {
		const data = await terminalUseCases.findAllTerminals({});
		setTerminals(data);
		const inActiveUsersCount = data.filter(
			(user) => user.status === 'Inactive',
		).length;
		const activeUsersCount = data.filter(
			(user) => user.status === 'Active',
		).length;

		setRcordStats({
			inactive: inActiveUsersCount,
			active: activeUsersCount,
		});
		return data;
	};

	//? RETURN
	return {
		terminals,
		setTerminals,
		terminalUseCases,
		id,
		fetchAllTerminals,
		recordStats,
		configUseCases,
	};
};
