import { TokenName } from "../services/config";

function useToken() {
    const getToken = () => localStorage.getItem(TokenName);
    const setToken = (token: string) => {
        localStorage.setItem(TokenName, token);
    };
    const removeToken = () => localStorage.removeItem(TokenName);
    return { getToken, setToken, removeToken };
}

export default useToken;
