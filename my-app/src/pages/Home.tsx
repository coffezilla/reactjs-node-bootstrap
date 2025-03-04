import LocalStorage from "../components/debuggin/LocalStorage";
import Redux from "../components/debuggin/Redux";
import useAuth from "../hooks/services/useAuth/useAuth";
import LayoutMain from "../template/LayoutMain/LayoutMain";

const Home = () => {
	const { logoutAuth } = useAuth();

	const handleLogout = () => {
		logoutAuth().then((response) => {
			console.log("Logoutted", response);
		});
	};

	return (
		<LayoutMain>
			<h1>Home</h1>
			<button onClick={handleLogout}>Logout</button>
			<Redux />
			<LocalStorage />
		</LayoutMain>
	);
};

export default Home;
