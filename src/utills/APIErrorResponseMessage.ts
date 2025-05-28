import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

// Define the expected structure of the error response
interface ErrorResponseData {
	message: string | { message: string }[];
}

export const APIErrorMessageResonse = (error: AxiosError) => {
	// Type assertion to specify the shape of `data`
	const data = error.response?.data as ErrorResponseData | undefined;
	const message = data?.message;
	if (Array.isArray(message)) {
		const formattedMessage = message.map((msg) => msg.message).join(', ');
		toast.error(formattedMessage ?? '');
	} else {
		toast.error(message ?? '');
	}
};
