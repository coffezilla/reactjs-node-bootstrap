export interface IApiResponse {
	status: number;
	data: {
		message?: string;
		result?: any;
	};
}
