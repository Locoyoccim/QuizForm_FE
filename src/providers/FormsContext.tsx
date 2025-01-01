import { createContext, useContext, useEffect, useReducer } from "react";
import { formProps, childrenContext } from "../interfaces/indexInterface";
import { ActionForms, ReducerExercise } from "./TypesFormsReducer";
import useGetForms from "../services/useGetForms";
import { UserProvider } from "./userContext";

export const formsProvider = createContext<ReducerExercise | undefined>(undefined);

function FormsContext({ children }: childrenContext) {
    const userContext = useContext(UserProvider)
    const user_id: number = userContext?.user?.id || 0;
    const { forms } = useGetForms(`forms-info/${user_id}/`);

    const Reducer = (state: formProps[], action: ActionForms): formProps[] => {
        switch (action.type) {
            case "ADD_FORM":
                return [
                    ...state,
                    ...(Array.isArray(action.form) ? action.form : [action.form]),
                ];
            case "DELETE_FORM": {
                const idsToDelete = Array.isArray(action.form)
                    ? action.form.map((form) => form.id).filter((id) => id !== undefined)
                    : [action.form.id];
                return state.filter((form) => !idsToDelete.includes(form.id!));
            }
            default:
                return state;
        }
    };

    const initState: formProps[] = [];
    const [state, dispatch] = useReducer(Reducer, initState);

    useEffect(() => {
        if (forms?.length && forms.length > 0 && state.length === 0) {
            dispatch({ type: "ADD_FORM", form: forms });
        }
    }, [forms]);

    return (
        <formsProvider.Provider value={{ state, dispatch }}>
            {children}
        </formsProvider.Provider>
    );
}

export default FormsContext;
