import * as Yup from 'yup';

export const terminalSchema = Yup.object({
	serial_number: Yup.string().required('Serial number is required'),
	manufacturer: Yup.string().required('manufacturer is required'),
	model: Yup.string().required('model is required'),
});
