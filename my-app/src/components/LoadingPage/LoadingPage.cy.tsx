// ***********************************************************
//
// Test individual: [npx cypress run --spec "..."]
// ***********************************************************

import LoadingPage from "./LoadingPage";

describe("<LoadingPage />", () => {
	it("Should have a logo image", () => {
		cy.mount(<LoadingPage />);
	});
});
