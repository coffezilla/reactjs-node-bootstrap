import { useCallback, useState } from "react";
import {
	deleteUserService,
	patchUserService,
	postUserService,
	getUserByIdService,
	getUsersService,
} from "../../api/userService";
import { objectToQueryString } from "../../helpers/utils.services";
import {
	IApiResponseUserData,
	IApiResponseUsers,
	IParamsUserFilter,
	IRequestUserStore,
	IRequestUserUpdate,
} from "./useUsers.types";
import { IResponseTableFiltered } from "../../components/ui/Table/Table.types";

const useUsers = () => {
	const [users, setUsers] = useState<IResponseTableFiltered | null>(null);
	const [userData, setUserData] = useState<any>(null);
	const [isLoadingGet, setIsLoadingGet] = useState<boolean>(false);
	const [isLoadingPost, setIsLoadingPost] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	// get
	const getUsers = useCallback((filter: IParamsUserFilter) => {
		setIsLoadingGet(true);
		const filterQuery = filter ? objectToQueryString(filter) : {};
		getUsersService(filterQuery)
			.then((response) => {
				userDataFiltered(response.data);
			})
			.catch((error: Error) => {
				setError("Failed to fetch users");
			})
			.finally(() => {
				setIsLoadingGet(false);
			});
	}, []);

	//
	const getUserById = useCallback((id: number) => {
		setIsLoadingGet(true);
		getUserByIdService(id)
			.then((response) => {
				setUserData(response.data);
			})
			.catch((error: Error) => {
				setError("Failed to fetch user");
			})
			.finally(() => {
				setIsLoadingGet(false);
			});
	}, []);

	// put
	const storeUser = async (data: IRequestUserStore) => {
		setIsLoadingPost(true);
		await postUserService(data)
			.then((response) => {
				console.log("response post", response);
			})
			.catch((error: Error) => {
				console.log("error", error);
			})
			.finally(() => {
				setIsLoadingPost(false);
			});
	};

	// patch
	const updateUser = async (data: IRequestUserUpdate) => {
		setIsLoadingPost(true);
		await patchUserService(data)
			.then((response) => {
				console.log("response patch", response);
			})
			.catch((error: Error) => {
				console.log("error", error);
			})
			.finally(() => {
				setIsLoadingPost(false);
			});
	};

	// delete
	const deleteUser = async (id: number) => {
		setIsLoadingPost(true);
		await deleteUserService(id)
			.then((response) => {
				console.log("delete", response);
			})
			.catch((error: Error) => {
				console.log("error", error);
			})
			.finally(() => {
				setIsLoadingPost(false);
			});
	};

	// util
	const userDataFiltered = (apiDataUsers: IApiResponseUsers) => {
		const resultLines: IResponseTableFiltered["table"]["lines"] = [];
		const resultHeaders: IResponseTableFiltered["table"]["heads"] = [
			{
				title: "REF",
				size: "w-5/10",
				column: "column_user_1",
			},
			{
				title: "Nome do usuário",
				size: "w-1/10",
				column: "column_user_2",
			},
			{
				title: "E-mail do usuário",
				size: "w-1/10",
				column: "column_user_3",
			},
			{
				title: "Papel",
				size: "w-1/10",
				column: "column_user_4",
			},
			{
				title: "Status",
				size: "w-1/10",
				column: "column_user_5",
			},
		];
		apiDataUsers.data.forEach((line: IApiResponseUserData) => {
			resultLines.push([
				{ url: `/usuarios/${line.id}`, value: `Usuário #${line.id}`, column: "column_user_1" },
				{ value: line.first_name, column: "column_user_2" },
				{ value: line.email, column: "column_user_3" },
				{ value: "Administrador", column: "column_user_4" },
				{ value: "Ativo", column: "column_user_5" },
			]);
		});

		const resultFiltered = {
			result: {
				page: apiDataUsers.page,
				total: apiDataUsers.total,
				totalPages: apiDataUsers.total_pages,
			},
			table: {
				heads: resultHeaders,
				lines: resultLines,
			},
		};

		setUsers(resultFiltered);
	};

	return {
		users,
		userData,
		error,
		isLoadingGet,
		isLoadingPost,
		getUsers,
		storeUser,
		deleteUser,
		updateUser,
		getUserById,
	};
};

export default useUsers;
