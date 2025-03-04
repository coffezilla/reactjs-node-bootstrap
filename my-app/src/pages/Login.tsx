import LocalStorage from "../components/debuggin/LocalStorage";
import Redux from "../components/debuggin/Redux";
import FormLogin from "../components/forms/FormLogin/FormLogin";

const Login = () => {
	return (
		<div className="">
			<FormLogin />
			<Redux />
			<LocalStorage />
		</div>
	);
};

export default Login;
