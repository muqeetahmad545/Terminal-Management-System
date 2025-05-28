import * as Yup from 'yup';

export const merchantSchema = Yup.object({
	name: Yup.string().required('Name is required'),
	email: Yup.string().required('Email is required'),
	phone: Yup.string().required('Phone is required'),
	address: Yup.string().required('address is required'),
	mcc: Yup.string().required('Merchant Category Code is required'),
	pin: Yup.string().required('Pin is required'),
});
