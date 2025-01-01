import { useContext, useEffect, useState } from "react";
import { formProps } from "../interfaces/indexInterface";
import axios from "axios";
import { Api_Url } from "./config";
import { AuthContext } from "../providers/AuthProvider";

function useGetForms(Endpoint: string) {
    const [loading, setLoading] = useState<boolean>(true);
    const [forms, setForms] = useState<formProps[]>([]);
    const [error, setError] = useState<string>("");
    const context = useContext(AuthContext)

    const fetchData = () => {
        setLoading(true);

        axios
            .get(`${Api_Url}/${Endpoint}`, {
                headers: {
                    Authorization: `Bearer ${context.GetToken()}`,
                }
            })
            .then((response) => {
                setForms(response.data);
            })
            .catch((error) => {
                setError(error.message);
                console.log(error)
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, [context.isAuthenticated]);

    return { loading, forms, error };
}

export default useGetForms;
