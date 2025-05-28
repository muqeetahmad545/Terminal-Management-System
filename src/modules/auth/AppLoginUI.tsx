import { ChangeEvent, useState } from 'react';
import { AuthRepositry } from '../../data/repositries/Auth/AuthRepositry';
import { AuthUseCases } from '../../domain/usecases/auth/AuthUseCases';
import {
	AppButton,
	AppInputField,
	AppInputLabel,
	AppInputWrapper,
} from '../../presentation/shared';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { decodeToken } from 'react-jwt';
import { DecodedTokenInterface } from '../../presentation/routes/ProtectedRoutes';
import { AuthInterFace } from '../../domain/models/Login';
import { APIErrorMessageResonse } from '../../utills/APIErrorResponseMessage';
import { AxiosError } from 'axios';

const initialPayload = {
	email: '',
	password: '',
};

const AppLoginUI = () => {
	//? STATES
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [loginPayload, setLoginPayload] =
		useState<AuthInterFace>(initialPayload);

	//? HOOKS
	const navigate = useNavigate();

	//? REPO INSTANCES
	const authRepositry = new AuthRepositry();
	const authUseCases = new AuthUseCases(authRepositry);

	//? HANDLER
	//
	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setLoginPayload((prev) => ({ ...prev, [name]: value }));
	};

	// LOGIM
	const handleLoginForm = async () => {
		setIsLoading(true);

		try {
			const data = await authUseCases.LoginUser(loginPayload);

			if (data.status == 'success') {
				localStorage.setItem('token', data.data);
				const decoded = decodeToken<DecodedTokenInterface>(data.data);
				localStorage.setItem('role', decoded?.role ?? '');
				setIsLoading(false);

				if (decoded) {
					console.log(decoded);
					if (decoded.role === 'SuperAdmin') navigate('/users');
					else navigate('/');
				}
			}
		} catch (error) {
			if (error instanceof AxiosError) APIErrorMessageResonse(error);
			setIsLoading(false);
		}
	};
	return (
		<div className='flex items-center justify-between h-screen bg-color'>
			<div className='flex-1 p-10'>
				<div className='p-10 border border-blue-900 rounded-md bg-blue-950'>
					<h3 className='text-2xl font-medium text-white'>Login </h3>

					<div className='mt-10 login-form'>
						<AppInputWrapper>
							<AppInputLabel appIsBgDark={true} appInoutLabelText='Email' />
							<AppInputField
								appInputName='email'
								appInputValue={loginPayload.email}
								appIsBgDark={true}
								appOnInputChnage={onInputChange}
							/>
						</AppInputWrapper>
						<AppInputWrapper>
							<AppInputLabel appIsBgDark={true} appInoutLabelText='Password' />
							<AppInputField
								appOnInputChnage={onInputChange}
								appInputName='password'
								appInputValue={loginPayload.password}
								appIsBgDark={true}
							/>
						</AppInputWrapper>

						<div className='text-right actions'>
							<AppButton
								appIsBgDark={true}
								appBtnText='Login'
								appButtonOnClick={handleLoginForm}
								appIsLoader={isLoading}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className='flex-1 h-full bg-image'></div>
		</div>
	);
};

export default AppLoginUI;
