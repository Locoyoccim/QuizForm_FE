import axios from "axios";
import { useContext, useState } from "react";
import { Api_Url } from "./config";
import { formsProvider } from "../providers/FormsContext";
import { AuthContext } from "../providers/AuthProvider";

interface postProps {
    user_id: number;
    title: string | undefined;
    description: string | undefined;
}

function usePostForm() {
    const [loading, setLoading] = useState<boolean>(false);
    const context = useContext(formsProvider);
    const authContext = useContext(AuthContext);

    const postForm = async (EndPoint: string, data: postProps) => {
        setLoading(true);
        try {
            const response = await axios.post(`${Api_Url}/${EndPoint}`, data, {
                headers: {
                    Authorization: `Bearer ${authContext.GetToken()}`,
                },
            });
            context?.dispatch({ type: "ADD_FORM", form: response.data });
            return response.data;
        } catch (error) {
            console.error("Error posting form:", error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, postForm };
}

export default usePostForm;
