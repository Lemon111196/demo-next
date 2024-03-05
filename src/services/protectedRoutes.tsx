import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../context/AuthProvider";
import { useEffect } from "react";
import toast from "react-hot-toast";

interface ProtectRouteProps {
    children: React.ReactNode;
}

const publicPages = ['/', '/auth/login', '/auth/register'];
function ProtectRoute({ children }: ProtectRouteProps) {
    const { isSignedIn, isLoading } = useAuth();
    const route = useRouter()
    const pathname = usePathname();

    useEffect(() => {
        if (isSignedIn || isLoading || publicPages.includes(pathname)) return;

        route.replace('/');
        toast.error('User not authorized!');
    }, [isLoading, isSignedIn, pathname, route]);
    if (isLoading) {
        return (
            <div>
                <center>
                    <span>Loading...</span>
                </center>
            </div>
        );
    }

    if (isSignedIn || publicPages.includes(pathname)) {
        return children;
    }
    return null;
}
export default ProtectRoute;
