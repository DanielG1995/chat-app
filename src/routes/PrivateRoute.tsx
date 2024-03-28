import { FC, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/ui/Sidebar";
import { privateApi } from "../api/api";
import useChatStore from "../store/store";

interface PrivateRouteProps {
    element: ReactNode
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ element }) => {
    const [isAuthenticated, setisAuthenticated] = useState(false)
    const { setLoading, setUserId } = useChatStore()
    const navigate = useNavigate()

    useEffect(() => {
        const checkToken = async () => {
            setLoading(true);
            try {
                const hasAuth = await privateApi('/auth/verify-token');
                if (!hasAuth.data?.hasAuth) return navigate('/login')
                setUserId(hasAuth.data?.user?.id)
                setisAuthenticated(hasAuth.data?.hasAuth === true)

            } catch (error) {
                return navigate('/login')
            } finally {
                setLoading(false)
            }
        }

        checkToken();
    }, [])


    return isAuthenticated ? (<div className="flex flex-col grow">
        <div className="flex flex-row w-full max-h-screen">
            <Sidebar />
            <section className="grow flex flex-row">
                {element}
            </section>
        </div>
    </div>
    ) : (
        null
    );
};