// validationSchemas.ts
import * as Yup from 'yup';

export const createUserSchema = Yup.object().shape({
	first_name: Yup.string().required('First name is required'),
	last_name: Yup.string().required('Last name is required'),
	email: Yup.string().email('Invalid email').required('Email is required'),
	phone: Yup.string(),
	role: Yup.string(),
});
// .oneOf(['SuperAdmin', 'Admin', 'Organization', 'Merchant'], 'Invalid role')
// 		.required('Role is required'),
