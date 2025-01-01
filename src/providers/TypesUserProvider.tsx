import { Dispatch } from "react";

export interface userProps {
    id: number;
    name: string;
    email: string;
    access: string;
    refresh: string;
    role: string;
}

export interface UserContextType {
    user: userProps | null;
    setUser: Dispatch<React.SetStateAction<userProps | null>>;
}
