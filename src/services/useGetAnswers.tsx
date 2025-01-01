import axios from "axios";
import { useState, useContext } from "react";
import { Api_Url } from "./config";
import { answeredQuestions } from "../interfaces/indexInterface";
import { AuthContext } from "../providers/AuthProvider";

function useGetAnswers() {
    const authContext = useContext(AuthContext);
    const [data, setData] = useState<answeredQuestions[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchAnswers = (Endpoint: string) => {
        axios
            .get(`${Api_Url}/${Endpoint}`, {
                headers: {
                    Authorization: `Bearer ${authContext.GetToken()}`,
                },
            })
            .then((response) => {
                setData(response.data);
            })
            .catch((e) => {
                console.log(e);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return { loading, data, fetchAnswers };
}

export default useGetAnswers;
