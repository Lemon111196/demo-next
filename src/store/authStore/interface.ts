export interface AuthState {
    isAuthenticated: boolean;
    user: null,
    register: boolean;
    error: string | null;
}