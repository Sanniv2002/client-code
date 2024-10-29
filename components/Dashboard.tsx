import { Header } from "./Header";
import { Footer } from "./Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userAtom } from "@/store/atoms/user";
import { useRouter } from 'next/navigation'
import { Sidebar } from "./Sidebar"
import AnimateIn from "./AnimateIn";
import { Projects } from "./Projects";
import StartBox from "./StartBox";
import { Blogs } from "./Blogs";
import { EditProfile } from "./EditProfile";

export const Dashboard = () => {
    const [user, setUser] = useRecoilState(userAtom);
    const [isOpen, setIsOpen] = useState(false)
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const [page, setPage] = useState(true)
    const [doneDeletion, setDoneDeletion] = useState(false)

    useEffect(() => {
        async function init() {
            try {
                const whoami = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/whoami`, {
                    withCredentials: true
                });
                const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/resources`, {
                    withCredentials: true
                })
                setProjects(result.data.data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .slice(0, 5))
                setUser(whoami.data);
                setLoading(false)
            } catch (error) {
                router.push("/")
            }
        }
        init();
    }, [setUser, doneDeletion]);
    return (
        <div className="bg-gray-950 h-screen flex flex-col justify-between">
            <StartBox isOpen={isOpen} setIsOpen={setIsOpen} />
            <AnimateIn
                from="opacity-0 -translate-y-8"
                to="opacity-100 translate-y-0 translate-x-0"
                style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.4, 0.55, 1.4)" }}
            >
                <Header loggedIn={user.isLoggedIn} isAdmin={user.role === 'ADMIN'} />
            </AnimateIn>
            <section className="md:flex md:flex-row flex flex-col items-stretch">
                <AnimateIn
                    from="opacity-0 -translate-x-16"
                    to="opacity-100 translate-y-0 translate-x-0"
                    style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.4, 0.55, 1.4)" }}
                >
                    <Sidebar editProfileHref="/dashboard/edit" page={page} setPage={setPage} />
                </AnimateIn>
                {page? <Projects projects={projects} setIsOpen={setIsOpen} title="Your Recent Projects" setDoneDeletion={setDoneDeletion} /> : <EditProfile />}
                <Blogs />
            </section>
            <Footer />
        </div>
    );
};