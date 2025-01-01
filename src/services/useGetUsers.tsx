import axios from "axios";
import { useEffect, useState } from "react";
import { Api_Url } from "./config";
import { userProps } from "../interfaces/indexInterface";

function useGetUsers(EndPoint: string) {
    const [loading, setLoading] = useState<boolean>(true);
    const [users, setUser] = useState<userProps[]>([]);

    const fetchUsers = () => {
        axios
            .get(`${Api_Url}/${EndPoint}`)
            .then((response) => {
                setUser(response.data);
            })
            .catch((e) => {
                console.log(e);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return { loading, users };
}

export default useGetUsers;
