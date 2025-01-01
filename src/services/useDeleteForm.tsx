import axios from "axios";
import { Api_Url } from "./config";
import { useContext } from "react";
import { formsProvider } from "../providers/FormsContext";
import { formProps } from "../interfaces/indexInterface";
import { AuthContext } from "../providers/AuthProvider";

interface idProp {
    id: number;
}
function useDeleteForm() {
    const context = useContext(formsProvider);
    const authContext = useContext(AuthContext);

    const deleteForm = async (EndPoint: string, { id }: idProp, form: formProps) => {
        try {
            const token = authContext.GetToken();
            await axios
                .delete(`${Api_Url}/${EndPoint}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    data: { id },
                })
                .then((response) => {
                    console.log(response.data);
                    context?.dispatch({ type: "DELETE_FORM", form: form });
                });
        } catch (e) {
            console.error(e);
        }
    };
    return { deleteForm };
}

export default useDeleteForm;
