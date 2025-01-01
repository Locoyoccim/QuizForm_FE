import axios from "axios";
import { Api_Url } from "./config";
import { useContext, useEffect, useState } from "react";
import { answerCardProps } from "../interfaces/indexInterface";
import { AuthContext } from "../providers/AuthProvider";

function useGetAnswer(EndPoint: string) {
    const authContext = useContext(AuthContext);
    const [loading, setLoading] = useState<boolean>(true);
    const [answers, setAnswers] = useState<answerCardProps[]>([]);
    const [error, setError] = useState();

    const getAnswer = () => {
        axios
            .get(`${Api_Url}/${EndPoint}`, {
                headers: {
                    Authorization: `Bearer ${authContext.GetToken()}`,
                },
            })
            .then((response) => {
                setAnswers(response.data);
            })
            .catch((e) => {
                setError(e);
                console.log(e);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        getAnswer();
    }, []);

    return { loading, answers, error };
}

export default useGetAnswer;
