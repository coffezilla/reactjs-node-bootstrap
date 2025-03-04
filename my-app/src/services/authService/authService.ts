import { AxiosResponse } from "axios";
import { IApiResponse } from "./authService.types";

export const getAuthsService = async (data: { email: string }): Promise<AxiosResponse<any>> => {
	// ========================================
	// const response = await axiosInstanceDev.post(`/api/auth/check`, data);
	// ========================================
	const response: IApiResponse = {
		status: 200,
		data: {
			message: "Authenticated",
			result: {
				id: 1,
				name: "My Name",
				email: "myname@gmail.com",
			},
		},
	};

	return response;
};

// post
export const postAuthService = async (data: { email: string; password: string }): Promise<AxiosResponse<any>> => {
	// ========================================
	// const response = await axiosInstanceDev.post(`/api/auth/login`, data);
	// ========================================
	// FAKE API LOGIC
	// ========================================
	let response: IApiResponse = {
		status: 200,
		data: {},
	};

	if (data.email !== "foo@gmail.com" || data.password !== "123123") {
		response = { data: { message: "Wrong login" }, status: 401 };
		return response;
	}
	// ========================================

	response = {
		status: 200,
		data: {
			message: "logged",
			result: {
				token: "my-new-token",
				email: "foo@gail.com",
				timestamp: new Date(),
			},
		},
	};

	return response;
};
