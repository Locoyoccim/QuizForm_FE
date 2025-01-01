import axios from "axios";
import { Api_Url } from "./config";
import { postCommentProps } from "../interfaces/indexInterface";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

function usePostComment() {
    const authContext = useContext(AuthContext);
    const token = authContext.GetToken();

    const postComment = async (EndPoint: string, comment: postCommentProps) => {
        try {
            const response = await axios.post(`${Api_Url}/${EndPoint}`, comment, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (e) {
            console.log(e);
        }
    };

    return { postComment };
}

export default usePostComment;
