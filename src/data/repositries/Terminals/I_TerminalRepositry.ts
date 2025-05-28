import { UserFilterParams } from '../../../domain/models/Login';
import { SuccessReponseInterface } from '../../../domain/models/Organization';
import { Terminal } from '../../../domain/models/Terminals';

export interface I_TerminalRepositry {
	createTerminal(payload: Terminal): Promise<SuccessReponseInterface>;
	findAllTerminals(filterParams: UserFilterParams): Promise<Terminal[]>;
	findOneTerminalByPK(id: number): Promise<Terminal>;
	deleteTerminal(id: number): Promise<SuccessReponseInterface>;
	updateTerminal(
		payload: Terminal,
		id: number,
	): Promise<SuccessReponseInterface>;
}
