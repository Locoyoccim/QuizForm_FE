import axios from "axios";
import { Api_Url } from "./config";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

function usePostLikes() {
    const authContext = useContext(AuthContext);

    const postLike = async (EndPoint: string) => {
        try {
            const response = await axios.post(
                `${Api_Url}/${EndPoint}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${authContext.GetToken()}`,
                    },
                }
            );
            return response.data.likes_count;
        } catch (e) {
            console.log(e);
            return false;
        }
    };

    return { postLike };
}

export default usePostLikes;
