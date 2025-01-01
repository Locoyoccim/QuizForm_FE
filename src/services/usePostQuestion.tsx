import axios from "axios";
import { Api_Url } from "./config";
import { PreguntaType } from "../interfaces/indexInterface";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

function usePostQuestion() {
    const authContext = useContext(AuthContext);
    const postQuestions = async (EndPoint: string, questions: PreguntaType[]) => {
        try {
            const response = await axios.post(`${Api_Url}/${EndPoint}`, questions, {
                headers: {
                    Authorization: `Bearer ${authContext.GetToken()}`,
                },
            });
            console.log("hook", response.data);
            return response.data;
        } catch (e) {
            console.log(e);
        }
    };

    return { postQuestions };
}

export default usePostQuestion;
