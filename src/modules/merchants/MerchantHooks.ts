import { useParams } from 'react-router-dom';
import { MerchantRepositry } from '../../data/repositries/Merchants/MerchantRepositry';
import { MerchantUseCases } from '../../domain/usecases/merchants/MerchantUseCases';
import { Merchant } from '../../domain/models/Merchant';
import { useEffect, useState } from 'react';
import { ConfigurationRepositry } from '../../data/repositries/Configurations/Configurations';
import { ConfigurationUseCases } from '../../domain/usecases/configurations/ConfigurationsUseCase';

export const useMerchant = () => {
	//? STATES
	const [merchants, setMerchants] = useState<Merchant[]>([]);
	const [recordStats, setRcordStats] = useState({ active: 0, inactive: 0 });
	//? INSTANCES
	const merchantRepo = new MerchantRepositry();
	const merchantUsecases = new MerchantUseCases(merchantRepo);
	const configReop = new ConfigurationRepositry();
	const configUseCases = new ConfigurationUseCases(configReop);

	const { id } = useParams();

	//? HANDLERS
	// FIND ALL
	const findAllMerchants = async () => {
		const data = await merchantUsecases.findAllMerchants({});
		setMerchants(data);

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

	//? EFFECTS
	useEffect(() => {
		// findAllMerchants();
	}, []);

	// ? RETURNS
	return {
		merchantUsecases,
		findAllMerchants,
		paramId: id,
		recordStats,
		setMerchants,
		merchants,
		configUseCases,
	};
};
