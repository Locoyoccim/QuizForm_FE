import axios from "axios";
import { Api_Url } from "./config";

function useGetForm() {

    const getForm = async (EndPoint: string) => {
        try {
            const response = await axios.get(`${Api_Url}/${EndPoint}`);
            console.log(response.data);
            return response.data;
        } catch (e) {
            console.log(e);
        }
    };

    return { getForm };
}

export default useGetForm;
