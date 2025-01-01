import axios from "axios";
import { Api_Url } from "./config";
import { useContext, useState } from "react";
import { UserProvider } from "../providers/userContext";
import { AuthContext } from "../providers/AuthProvider";

interface GetUserProps {
    email: string;
    password: string;
}

function GetUser() {
    const context = useContext(UserProvider);
    const authContext = useContext(AuthContext);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const fetchUser = async (data: GetUserProps) => {
        setLoading(true);
        try {
            const response = await axios.post(`${Api_Url}/get-users/`, data);
            context?.setUser(response.data);
            authContext.Login(response.data.access);
            setLoading(false);
            return true
        } catch (error) {
            console.log(error);
            setError("Error fetching user");
            setLoading(false);
            return false;
        }
    };

    return { loading, fetchUser, error };
}

export default GetUser;
