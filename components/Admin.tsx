import { userAtom } from "@/store/atoms/user";
import { useRecoilState } from "recoil";
import { Table } from "./Table/Table"; // Adjust import based on your export type
import { useEffect, useState } from "react";
import axios from "axios";
import PopUp from "./Modals/PopUp";
import { useToastContext } from "./Toast/ToastProvider";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useRouter } from "next/navigation";
import SkeletonTable from "./Table/SkletonTable";
export const Admin = () => {
    const [resources, setResources] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const { addToast } = useToastContext()
    const [user, setUser] = useRecoilState(userAtom);
    const [loading, setLoading] = useState(true);
    const router = useRouter()

    useEffect(() => {
        async function init() {
            try {
                const whoami = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/whoami`, {
                    withCredentials: true
                });
                whoami.data.role !== 'ADMIN' ? router.push("/dashboard") : null
                setUser(whoami.data);
            } catch (error) {
                router.push("/")
            } finally {
                setLoading(false);
            }
        }
        init();
    }, [setUser]);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleConfirm = async () => {
        try {
            const result = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/regenerate_config`, {}, { withCredentials: true });
            addToast({
                type: 'Info',
                src: '/success.svg',
                who: 'Scrip Box',
                content: 'Succesfully regenrated config!',
                time: new Date().toLocaleTimeString(),
            });
        } catch (e) {
            addToast({
                type: 'Info',
                src: '/fail.svg',
                who: 'Scrip Box',
                content: 'Failed to regenerate config',
                time: new Date().toLocaleTimeString(),
            });
        }
        toggleModal();
    };

    useEffect(() => {
        async function fetchResources() {
            try{
                const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/list`, { withCredentials: true });
                setResources(result.data.data);
            } catch (error){}
        }
        fetchResources();
    }, []);

    return (
        <div className="bg-gray-950 h-screen flex flex-col">
            <Header loggedIn={user.isLoggedIn} isAdmin={user.role === 'ADMIN'} otherPage={true} />
            <div className="px-14 flex flex-col gap-2 flex-grow">
            {loading ? <SkeletonTable /> : <Table resources={resources} />}
                <button
                    onClick={toggleModal}
                    type="button" className="w-60 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
                    Regenrate Configaration
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 ms-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M23 4v6h-6M1 20v-6h6" />
                        <path d="M20.49 12A8.49 8.49 0 1 1 12 3.51 8.49 8.49 0 0 1 20.49 12z" />
                    </svg>
                </button>
                <PopUp
                    show={showModal}
                    onClose={toggleModal}
                    message="Warning! Are you sure you want to regenerate the config file?"
                    onConfirm={handleConfirm}
                />
            </div>
            <Footer />
        </div>
    );
};
