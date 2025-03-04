import { useState } from "react";
import useAuth from "../../../hooks/services/useAuth/useAuth";
import useToast from "../../../hooks/components/useToast/useToast";

const FormLogin = () => {
	const { loginAuth } = useAuth();
	const { showToast } = useToast();

	const [email, setEmail] = useState("foo@gmail.com");
	const [password, setPassword] = useState("123123");

	const handleLogin = (e: any) => {
		e.preventDefault();
		loginAuth({ email: email, password: password }).then((response) => {
			if (response.status === 200) {
				window.location.href = "/dashboard";
			}

			if (response.status === 401) {
				showToast({ message: response.data.message, type: "error" });
			}
		});
	};

	return (
		<div>
			<h2>Form Login</h2>
			<form onSubmit={handleLogin}>
				<input type="text" className="border" />
				<button type="submit" className="bg-gray-300">
					Submit
				</button>
				<pre>{JSON.stringify(email, null, 1)}</pre>
				<pre>{JSON.stringify(password, null, 1)}</pre>
			</form>
		</div>
	);
};

export default FormLogin;
