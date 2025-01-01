import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Api_Url } from "./config";
import { commentsProps } from "../interfaces/indexInterface";
import { AuthContext } from "../providers/AuthProvider";

function useGetComments(Endpoint: string) {
    const [comments, setComments] = useState<commentsProps[]>([]);
    const authContext = useContext(AuthContext);

    const getComments = () => {
        axios
            .get(`${Api_Url}/${Endpoint}`, {
                headers: {
                    Authorization: `Bearer ${authContext.GetToken()}`,
                },
            })
            .then((response) => {
                setComments(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(() => {
        getComments();
    }, []);

    return { comments };
}

export default useGetComments;
