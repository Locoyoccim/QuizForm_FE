import axios from "axios";
import { Api_Url } from "./config";
import { newUserProps } from "../interfaces/indexInterface";
import { useContext } from "react";
import { UserProvider } from "../providers/userContext";

function CreateUser() {
    const userContext = useContext(UserProvider);

    const createUser = async (data: newUserProps) => {
        try {
            const response = await axios.post(`${Api_Url}/create-user/`, data);
            userContext?.setUser(response.data);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    return { createUser };
}

export default CreateUser;
