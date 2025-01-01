import { useContext, useState } from "react";
import { PreguntaType } from "../interfaces/indexInterface";
import axios from "axios";
import { Api_Url } from "./config";
import { AuthContext } from "../providers/AuthProvider";

function useGetQuestions() {
    const authContext = useContext(AuthContext);
    const [questions, setQuestions] = useState<PreguntaType[]>([]);

    const getQuestions = (EndPoint: string) => {
        axios
            .get(`${Api_Url}/${EndPoint}`, {
                headers: {
                    Authorization: `Bearer ${authContext.GetToken()}`,
                },
            })
            .then((response) => {
                setQuestions(response.data);
            });
    };

    return { getQuestions, questions };
}

export default useGetQuestions;
