import axios from "axios";
import { Api_Url } from "./config";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

function useDeleteComment() {
    const authContext = useContext(AuthContext);
    const token = authContext.GetToken();
    
    const deleteComment = async (Endpoint: string) => {
        try {
            const response = await axios.delete(`${Api_Url}/${Endpoint}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (e) {
            console.log(e);
            throw e; 
        }
    };

    return { deleteComment };
}

export default useDeleteComment;
