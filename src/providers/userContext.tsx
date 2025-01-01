import { createContext, useState } from "react";
import { childrenContext } from "../interfaces/indexInterface";
import { UserContextType, userProps } from "./TypesUserProvider";

export const UserProvider = createContext<UserContextType | null>(null);

function UserContext({ children }: childrenContext) {
    const [user, setUser] = useState<userProps | null>(null);
    console.log(user)

    return (
        <UserProvider.Provider value={{ user, setUser }}>
            {children}
        </UserProvider.Provider>
    );
}

export default UserContext;
