import {
    useState,
    useEffect,
    useContext,
    createContext,
    PropsWithChildren
} from "react";
import useLocalStorage from "./useLocalStorage";
interface AuthProviderProps extends PropsWithChildren { };

interface SessionProps {
    access_token?: string;
};

interface ContextProps {
    session: SessionProps;
    isSignedIn: boolean;
    isLoading: boolean;
};
const AuthContext = createContext<ContextProps>({
    session: {},
    isSignedIn: false,
    isLoading: false
});
function AuthProvider({ children }: AuthProviderProps) {
    const [session, setSession] = useState<SessionProps>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const isSignedIn = !!session && !!session?.access_token;
    const storage = useLocalStorage();

    useEffect(() => {
        try {
            const sessionStorage = storage.getItem('session') as SessionProps
            setIsLoading(true);

            if (sessionStorage.access_token) {
                setSession(sessionStorage);
                return;
            }
            setSession({});
        } catch (error) {
            setSession({});
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    }, [storage]);

    return (
        <AuthContext.Provider value={{ session, isSignedIn, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

export default AuthProvider;