
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { UserProvider } from "./testUtils";
import RoutesComponents from "./RoutesComponents";

it("renders without crashing", function () {
    render(
        <MemoryRouter>
            <UserProvider>
                <RoutesComponents />
            </UserProvider>
        </MemoryRouter>,
    );
});

it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider>
                <RoutesComponents />
            </UserProvider>
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});
