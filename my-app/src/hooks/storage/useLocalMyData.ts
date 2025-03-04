import { useDispatch, useSelector } from "react-redux";

import { rdxChangeUserData } from "../../redux/ducks/User";
import { IReduxUser } from "../../redux/ducks/User.types";

const useLocalMyData = () => {
	const dispatch = useDispatch();

	const rdxUser = useSelector((state: IReduxUser) => state.localdata.user);
	const myData = rdxUser;

	const updateUserData = (option: any) => {
		dispatch(rdxChangeUserData(option));
	};

	return { updateUserData, myData };
};

export default useLocalMyData;
