export interface AuthState {
    isAuthenticated: boolean;
    user: null,
    registering: boolean;
    error: string | null;
}