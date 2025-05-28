import { TerminalRepositery } from '../../../data/repositries/Terminals/TerminalRepositry';
import { terminalSchema } from '../../../utills/TerminalValidator';
import { UserFilterParams } from '../../models/Login';
import { Terminal } from '../../models/Terminals';
import * as Yup from 'yup';

export class TerminalUseCases {
	constructor(private terminalRepo: TerminalRepositery) {}

	// CREATE
	async createTerminal(payload: Terminal | FormData) {
		const errors: { [key: string]: string } = {};

		if (payload instanceof FormData) {
			const data = await this.terminalRepo.createTerminal(payload);
			return data;
		}

		//Validate Terminal Schema
		try {
			await terminalSchema.validate(payload, { abortEarly: false });
		} catch (error) {
			if (error instanceof Yup.ValidationError) {
				error.inner.forEach((err) => {
					if (err.path) errors[err.path] = err.message;
				});

				return errors;
			}
		}
		const data = await this.terminalRepo.createTerminal(payload);
		return data;
	}

	// FIND ALL
	async findAllTerminals(filterParams: UserFilterParams) {
		const data = await this.terminalRepo.findAllTerminals(filterParams);
		return data;
	}

	// FIND ONE
	async findOneTerminalByPK(id: number) {
		const data = await this.terminalRepo.findOneTerminalByPK(id);
		return data;
	}

	// DELETE
	async deleteTerminal(id: number) {
		const data = await this.terminalRepo.deleteTerminal(id);
		return data;
	}

	// UPDATE TERMINAL
	async updateTerminal(payload: Terminal, id: number) {
		const data = await this.terminalRepo.updateTerminal(payload, id);
		return data;
	}
}
