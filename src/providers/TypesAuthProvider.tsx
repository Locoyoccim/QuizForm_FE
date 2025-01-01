export interface AuthContextProps {
    isAuthenticated: boolean;
    Login: (token: string) => void;
    Logout: () => void;
    GetToken: () => string;
}
