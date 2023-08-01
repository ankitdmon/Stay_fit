import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { UserProvider } from "./testUtils";
import PrivateRoutes from "./PrivateRoutes";

it("renders without crashing", function () {
    render(
        <MemoryRouter>
            <UserProvider>
                <PrivateRoutes />
            </UserProvider>
        </MemoryRouter>,
    );
});

it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider>
                <PrivateRoutes />
            </UserProvider>
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot when logged out", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider currentUser={null}>
                <PrivateRoutes />
            </UserProvider>
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});
