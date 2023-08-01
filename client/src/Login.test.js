
import { render } from "@testing-library/react";
import Login from "./Login";
import { MemoryRouter } from "react-router";
import { UserProvider } from "./testUtils";

it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider>
                <Login />
            </UserProvider>
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});
