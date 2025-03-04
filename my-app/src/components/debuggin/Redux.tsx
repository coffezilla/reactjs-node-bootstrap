import { useEffect } from "react";
import { useSelector } from "react-redux";

const Redux = () => {
	const rdxUser = useSelector((state) => state);

	useEffect(() => {
		console.log(rdxUser);
	}, []);

	return (
		<div className="border-2 border-black bg-gray-100 text-xs">
			<h2>Redux:</h2>
			<pre>{JSON.stringify(rdxUser, null, 1)}</pre>
		</div>
	);
};

export default Redux;
