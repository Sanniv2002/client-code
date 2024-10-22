import { Header } from "./Header";
import { Footer } from "./Footer";
import { useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userAtom } from "@/store/atoms/user";
import { Admin } from "./Admin";
import { useRouter } from 'next/navigation'

export const Dashboard = () => {
    const [user, setUser] = useRecoilState(userAtom);
    const router = useRouter()

    useEffect(() => {
        async function init() {
            try {
                const whoami = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/whoami`, {
                    withCredentials: true
                });
                setUser(whoami.data);
            } catch (error) {
                router.push("/")
            }
        }
        init();
    }, [setUser]);

    return (
        <div className="bg-gray-950 h-screen flex flex-col">
            <Header loggedIn={user.isLoggedIn} isAdmin={user.role === 'ADMIN'} />
            <Footer />
        </div>
    );
};
