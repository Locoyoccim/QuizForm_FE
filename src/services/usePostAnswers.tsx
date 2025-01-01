import axios from "axios";
import { Api_Url } from "./config";
import { answerType } from "../interfaces/indexInterface";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

function usePostAnswer() {
    const authContext = useContext(AuthContext);

    const postAnswer = async (EndPoint: string, answers: answerType[]) => {
        try {
            const token = authContext.GetToken();
            const response = await axios.post(`${Api_Url}/${EndPoint}`, answers, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (e) {
            console.log(e);
        }
    };

    return { postAnswer };
}

export default usePostAnswer;
