// get
export interface IApiResponseUserData {
	id: number;
	email: string;
	first_name: string;
	last_name: string;
	avatar: string;
}

export interface IApiResponseUsers {
	page: number;
	per_page: number;
	total_pages: number;
	total: number;
	data: IApiResponseUserData[];
}

export interface IParamsUserFilter {
	page: number;
	filter?: number;
	order?: number;
}

// post
export interface IRequestUserStore {
	name: string;
	job: string;
}

export interface IResponseUserStore {
	name: string;
	job: string;
	id: number;
	createdAt: string;
}

// update
export interface IRequestUserUpdate {
	name: string;
	job: string;
}

export interface IResponseUserUpdate {
	name: string;
	job: string;
	updatedAt: string;
}
