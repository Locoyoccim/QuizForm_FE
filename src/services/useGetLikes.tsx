import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Api_Url } from "./config";
import { AuthContext } from "../providers/AuthProvider";

function useGetLikes(EndPoint: string) {
    const [likes, setLikes] = useState<number>();
    const authContext = useContext(AuthContext);

    const getLikes = () => {
        axios
            .get(`${Api_Url}/${EndPoint}`, {
                headers: {
                    Authorization: `Bearer ${authContext.GetToken()}`,
                },
            })
            .then((response) => {
                setLikes(response.data.likes_count);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(() => {
        getLikes();
    }, []);

    return { likes };
}

export default useGetLikes;
