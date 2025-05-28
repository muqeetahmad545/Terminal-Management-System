import * as Yup from 'yup';

export const organizationSchema = Yup.object({
	name: Yup.string().required('Name is required'),
	email: Yup.string().required('Email is required'),
	phone: Yup.string().required('Phone is required'),
	address: Yup.string().required('address is required'),
	country: Yup.string().required('Country is required'),
	state: Yup.string().required('state is required'),
	currency: Yup.string().required('currency is required'),
});
