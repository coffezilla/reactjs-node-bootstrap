import { useCallback, useState } from "react";
import { AxiosError } from "axios";

// Constants
import { LOCAL_STORAGE_AUTH } from "../../../helpers/constants";

// Custom Hooks
import useLocalStorage from "../../storage/useLocalStorage";
import useLocalAuth from "../../storage/useLocalAuth";
import useLocalMyData from "../../storage/useLocalMyData";
import useToast from "../../components/useToast/useToast";
import { getAuthsService, postAuthService } from "../../../services/authService/authService";

const useAuth = () => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [isLoadingGet, setIsLoadingGet] = useState<boolean>(true);
	const [isLoadingPost, setIsLoadingPost] = useState<boolean>(false);

	const { getLocalStorage } = useLocalStorage();
	const { updateUserData } = useLocalMyData();
	const { updateAuthData } = useLocalAuth();
	const { showToast } = useToast();

	const localStorageAuth = getLocalStorage(LOCAL_STORAGE_AUTH);

	// check auth
	const checkAuths = useCallback(() => {
		const hasLocalStorageToken = localStorageAuth.data.auth.token && true;
		if (hasLocalStorageToken) {
			showToast({
				id: "default",
				message: "Authenticating...",
				type: "loading",
			});

			getAuthsService({ email: localStorageAuth.data.auth.email })
				.then((response) => {
					if (response) {
						if (response.status === 200) {
							if (response.data.error) {
								showToast({
									id: "default",
									message: "Auth error",
									type: "error",
									duration: 1000,
								});
							} else {
								// update redux locally
								updateUserData({
									id: response.data.id,
									name: response.data.name,
									email: response.data.email,
								});

								setIsAuthenticated(true);
							}
						}
						if (response.status === 500) {
							showToast({
								id: "default",
								message: "Auth error",
								type: "error",
								duration: 500,
							});
						}
						if (response.status === 400) {
							showToast({
								id: "default",
								message: "Auth error",
								type: "error",
								duration: 500,
							});
						}
					}
				})
				.catch((error: AxiosError) => {
					if (error.response) {
						showToast({
							id: "default",
							message: "Auth error",
							type: "error",
							duration: 500,
						});
					}
				})
				.finally(() => {
					setIsLoadingGet(false);
				});
		} else {
			setIsLoadingGet(false);
		}
	}, []);

	// login
	const loginAuth = async (data: { email: string; password: string }) => {
		let responseAuth = {
			status: 0,
			data: {},
		};

		setIsLoadingPost(true);
		await postAuthService(data)
			.then((response) => {
				setIsLoadingPost(false);
				if (response.status === 401) {
					responseAuth = {
						data: response.data,
						status: response.status,
					};
				} else {
					responseAuth = {
						data: response.data,
						status: response.status,
					};

					// update local storage
					updateAuthData({
						token: response.data.result.token,
						email: response.data.result.email,
						timestamp: response.data.result.timestamp,
					});
				}
			})
			.catch((error: AxiosError) => {
				setIsLoadingPost(false);
				if (error.response) {
					responseAuth = {
						...responseAuth,
						status: error.response.status,
					};
				}
			});
		return responseAuth;
	};

	// logout
	const logoutAuth = async () => {
		let responseAuth = {
			message: "",
		};

		// update local storage
		updateAuthData({
			token: "",
			id: "",
			timestamp: "",
		});

		window.location.href = "/login";
		return responseAuth;
	};

	return {
		isAuthenticated,
		isLoadingGet,
		isLoadingPost,
		checkAuths,
		loginAuth,
		logoutAuth,
	};
};

export default useAuth;
