import { userAtom } from "@/store/atoms/user";
import { useRecoilValue } from "recoil";
import { Table } from "./Table/Table"; // Adjust import based on your export type
import { useEffect, useState } from "react";
import axios from "axios";

export const Admin = () => {
    const user = useRecoilValue(userAtom);
    const [resources, setResources] = useState([]);

    useEffect(() => {
        async function fetchResources() {
            const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/list`, { withCredentials: true });
            setResources(result.data.data);
        }
        fetchResources();
    }, []);

    return (
        <div className="px-14 flex flex-col gap-2">
            <Table resources={resources} />
            <button
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
        </div>
    );
};
