import axios from "axios";
import { Api_Url } from "./config";
import { PreguntaType } from "../interfaces/indexInterface";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

function usePutQuestions() {
    const authContext = useContext(AuthContext);
    const putQuestions = async (EndPoint: string, data: PreguntaType[]) => {
        try {
            const response = await axios.put(`${Api_Url}/${EndPoint}`, data, {
                headers: {
                    Authorization: `Bearer ${authContext.GetToken()}`,
                },
            });
            return response.data;
        } catch (err) {
            console.error("Error in putQuestions:", err);
            throw err; 
        }
    };

    return { putQuestions };
}

export default usePutQuestions;
