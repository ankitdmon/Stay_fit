import React from "react";
import UserContext from "./UserContext";

const demoUser = {
    username: "testuser",
    first_name: "testfirst",
    last_name: "testlast",
    email: "test@test.net",
};

const UserProvider =
    ({ children, currentUser = demoUser }) => (
        <UserContext.Provider value={{ currentUser }}>
            {children}
        </UserContext.Provider>
    );

export { UserProvider };
