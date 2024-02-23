export interface AuthState{
    isAuthenticated: boolean;
    user: {
        username: string | number;
        password: string | number;
    } | null;
}