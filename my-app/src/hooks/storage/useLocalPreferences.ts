import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useLocalStorage from "./useLocalStorage";
import { LOCAL_STORAGE_PREFERENCES } from "../../helpers/constants";
import {
	rdxChangePreferenceFilterbar,
	rdxChangePreferenceSidebar,
	rdxChangePreferenceTableColumnsExcluded,
} from "../../redux/ducks/User";
import { IReduxUser } from "../../redux/ducks/User.types";

const useLocalPreferences = () => {
	const { getLocalStorage, setLocalStorage } = useLocalStorage();
	const { data: localStorageData, status: hasLocalStorage } = getLocalStorage(LOCAL_STORAGE_PREFERENCES);

	const dispatch = useDispatch();

	const rdxUser = useSelector((state: IReduxUser) => state.localdata.preferences);
	const userPreferences = rdxUser;

	const [isLocalStorageLoaded, setIsLocalStorageLoaded] = useState(false);

	// init
	const initLocalStorage = () => {
		if (hasLocalStorage) {
			updateReduxWithLocalStorage(localStorageData);
		} else {
			setLocalStorageToDefault();
			setIsLocalStorageLoaded(true);
		}
	};

	// set
	const setLocalStorageToDefault = () => {
		setLocalStorage(LOCAL_STORAGE_PREFERENCES, {
			preferences: {
				theme: "light",
				sidebar: true,
				filterbar: true,
				tableColumnsExcluded: [],
			},
		});
	};

	const updateReduxWithLocalStorage = (localStorageData: IReduxUser["user"]) => {
		dispatch(rdxChangePreferenceFilterbar(localStorageData.preferences.filterbar));
		dispatch(rdxChangePreferenceSidebar(localStorageData.preferences.sidebar));
		dispatch(rdxChangePreferenceTableColumnsExcluded(localStorageData.preferences.tableColumnsExcluded));
		setIsLocalStorageLoaded(true);
	};

	const updateFilterbar = (option: any) => {
		dispatch(rdxChangePreferenceFilterbar(option));
		setLocalStorage(LOCAL_STORAGE_PREFERENCES, {
			preferences: {
				...localStorageData.preferences,
				filterbar: option,
			},
		});
	};

	const updateSidebar = (option: any) => {
		dispatch(rdxChangePreferenceSidebar(option));
		setLocalStorage(LOCAL_STORAGE_PREFERENCES, {
			preferences: {
				...localStorageData.preferences,
				sidebar: option,
			},
		});
	};

	const updateTableColumns = (option: any) => {
		dispatch(rdxChangePreferenceTableColumnsExcluded(option));
		setLocalStorage(LOCAL_STORAGE_PREFERENCES, {
			preferences: {
				...localStorageData.preferences,
				tableColumnsExcluded: option,
			},
		});
	};

	useEffect(() => {
		initLocalStorage();
	}, []);

	return { isLocalStorageLoaded, updateFilterbar, updateSidebar, updateTableColumns, userPreferences };
};

export default useLocalPreferences;
