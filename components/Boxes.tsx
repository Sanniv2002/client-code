import { userAtom } from "@/store/atoms/user"
import { useRecoilState } from "recoil"
import AnimateIn from "./AnimateIn"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios"
import { Projects } from "./Projects"
import StartBox from "./StartBox"

export const Boxes = () => {
    const [user, setUser] = useRecoilState(userAtom);
    const [projects, setProjects] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    useEffect(() => {
        async function init() {
            try {
                const whoami = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/whoami`, {
                    withCredentials: true
                });
                const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/resources`, {
                    withCredentials: true
                })
                setProjects(result.data.data)
                setUser(whoami.data);
            } catch (error) {
                router.push("/")
            }
        }
        init();
    }, [setUser]);

    return <div className="bg-gray-950 h-screen flex flex-col justify-between">
        <StartBox isOpen={isOpen} setIsOpen={setIsOpen} />
        <AnimateIn
            from="opacity-0 -translate-y-8"
            to="opacity-100 translate-y-0 translate-x-0"
            style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.4, 0.55, 1.4)" }}
        >
            <Header loggedIn={user.isLoggedIn} isAdmin={user.role === 'ADMIN'} otherPage={true} />
        </AnimateIn>
        <section className="md:flex md:flex-row flex flex-col items-stretch">
            <Projects projects={projects} setIsOpen={setIsOpen} title="All Your Projects" listAll={true} scroll={true}/>
        </section>
        <Footer />
    </div>
}