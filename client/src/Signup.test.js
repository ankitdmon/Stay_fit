
import { render } from "@testing-library/react";
import Signup from "./Signup";
import { MemoryRouter } from "react-router";
import { UserProvider } from "./testUtils";

it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider>
                <Signup />
            </UserProvider>
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});
