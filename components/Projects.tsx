'use client';

import React, { useState } from 'react';
import AnimateIn from './AnimateIn';
import { useRouter } from 'next/navigation';
import { Delete } from './Delete';
import axios from 'axios';
import { useToastContext } from './Toast/ToastProvider';

type Project = {
    id: string;
    alias: string;
    environment: string;
    PORT: number;
    name: string;
    dns_record_id: string;
    createdAt: string;
    resumedAt: string | null;
    stoppedAt: string | null;
    status: string;
    authorId: number;
};

interface ProjectsProps {
    title: string;
    projects: Project[];
    setIsOpen: any;
    listAll?: boolean;
    scroll?: boolean;
    setDoneDeletion: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Projects: React.FC<ProjectsProps> = ({ title, projects, setIsOpen, listAll = false, scroll = false, setDoneDeletion }) => {
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [open, setOpen] = useState(false)
    const router = useRouter();
    const { addToast } = useToastContext()

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const handleDelete = async (projectId: string) => {
        setDeletingId(projectId);
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/terminate/${deletingId}`, {
                withCredentials: true
            })
            addToast({
                type: "Box terminated succesfully!",
                who: "Scriptbot",
                content: "Your box is now terminated and no longer available",
                time: "A second ago",
                src: "/robot.png"
            });
            setDoneDeletion(deletion => !deletion)

        } catch (error) {
            addToast({
                type: "Something went wrong",
                who: "Scriptbot",
                content: "We are very sorry we could not delete the box.",
                time: "A second ago",
                src: "/robot.png"
            });
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="w-full p-4 flex flex-col justify-between flex-1 relative">
            {open ? <Delete projectId={deletingId as string} setOpen={setOpen} onConfirmDelete={handleDelete} /> : null}
            <section>
                <div className="flex items-center justify-between mb-3">
                    <h5 className="text-base font-semibold text-gray-900 md:text-xl dark:text-white">
                        {title}
                    </h5>
                    <button
                        onClick={() => setIsOpen(true)}
                        className="px-4 py-2 text-sm font-medium text-blue-800 bg-blue-200 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                    >
                        New Project
                    </button>
                </div>
                <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Connect with one of your existing projects or create a new one.
                </p>
                <ul className={`flex-1 my-4 px-4 space-y-3 ${scroll ? `max-h-[400px] overflow-y-auto
                                                                [&::-webkit-scrollbar]:w-2
                                                                [&::-webkit-scrollbar-track]:rounded-full
                                                                [&::-webkit-scrollbar-track]:bg-gray-100
                                                                [&::-webkit-scrollbar-thumb]:rounded-full
                                                                [&::-webkit-scrollbar-thumb]:bg-gray-300
                                                                dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                                                                dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500` : ""}`}>
                    {projects?.map((project) => (
                        <AnimateIn
                            key={project.id}
                            from="opacity-0 scale-105"
                            to="opacity-100 scale-100"
                            style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.4, 0.55, 1.4)" }}
                        >
                            <li className={`${project.status==="TERMINATED" ? "cursor-not-allowed" : "cursor-pointer"}`}>
                                <a
                                    onClick={() => {
                                        if(project.status!=="TERMINATED"){
                                            router.push(`/workspace?alias=${project.alias}&env=${project.environment}`)
                                        }
                                    }}
                                    className="flex items-center justify-between p-3 text-base font-bold rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors duration-200"
                                >
                                    <div>
                                        <div className="flex items-center">
                                            <span className="flex-1 whitespace-nowrap">{project.name}</span>
                                        </div>
                                        <p className="text-xs font-normal text-gray-500 dark:text-gray-400 mt-1">
                                            {formatDate(project.createdAt)}
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        {
                                            project.status === 'RUNNING' ? (
                                                <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-green-700 bg-green-100 rounded dark:bg-green-800 dark:text-green-200">
                                                    <svg
                                                        className="w-2 h-2 me-1 text-green-600 dark:text-green-300"
                                                        fill="currentColor"
                                                        viewBox="0 0 8 8"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <circle cx="4" cy="4" r="4" />
                                                    </svg>
                                                    Running
                                                </span>
                                            ) : project.status === 'STOPPED' ? (
                                                <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">
                                                    Stopped
                                                </span>
                                            ) : project.status === 'FAILED' ? (
                                                <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-red-700 bg-red-100 rounded dark:bg-red-800 dark:text-red-200">
                                                    <svg
                                                        className="w-2 h-2 me-1 text-red-600 dark:text-red-300"
                                                        fill="currentColor"
                                                        viewBox="0 0 8 8"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M4 0C1.791 0 0 1.791 0 4s1.791 4 4 4 4-1.791 4-4S6.209 0 4 0zm0 6a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0-4a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0V2.5A.5.5 0 0 1 4 2z" />
                                                    </svg>
                                                    Failed
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-yellow-700 bg-yellow-100 rounded dark:bg-yellow-800 dark:text-yellow-200">
                                                    <svg
                                                        className="w-2 h-2 me-1 text-yellow-600 dark:text-yellow-300"
                                                        fill="currentColor"
                                                        viewBox="0 0 8 8"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M4 0C1.791 0 0 1.791 0 4s1.791 4 4 4 4-1.791 4-4S6.209 0 4 0zm0 6a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0-4a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0V2.5A.5.5 0 0 1 4 2z" />
                                                    </svg>
                                                    Terminated
                                                </span>
                                            )
                                        }
                                        {project.status === "TERMINATED" ? null : <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setDeletingId(project.alias);
                                                setOpen(true)
                                            }}
                                            className={`px-2 py-1 text-xs font-medium rounded-lg ${deletingId === project.id
                                                ? ""
                                                : ""
                                                } transition-colors duration-200`}
                                        >
                                            <svg className='size-7' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100">
                                                <path fill="#f37e98" d="M25,30l3.645,47.383C28.845,79.988,31.017,82,33.63,82h32.74c2.613,0,4.785-2.012,4.985-4.617L75,30"></path><path fill="#f15b6c" d="M65 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S65 36.35 65 38zM53 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S53 36.35 53 38zM41 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S41 36.35 41 38zM77 24h-4l-1.835-3.058C70.442 19.737 69.14 19 67.735 19h-35.47c-1.405 0-2.707.737-3.43 1.942L27 24h-4c-1.657 0-3 1.343-3 3s1.343 3 3 3h54c1.657 0 3-1.343 3-3S78.657 24 77 24z"></path><path fill="#1f212b" d="M66.37 83H33.63c-3.116 0-5.744-2.434-5.982-5.54l-3.645-47.383 1.994-.154 3.645 47.384C29.801 79.378 31.553 81 33.63 81H66.37c2.077 0 3.829-1.622 3.988-3.692l3.645-47.385 1.994.154-3.645 47.384C72.113 80.566 69.485 83 66.37 83zM56 20c-.552 0-1-.447-1-1v-3c0-.552-.449-1-1-1h-8c-.551 0-1 .448-1 1v3c0 .553-.448 1-1 1s-1-.447-1-1v-3c0-1.654 1.346-3 3-3h8c1.654 0 3 1.346 3 3v3C57 19.553 56.552 20 56 20z"></path><path fill="#1f212b" d="M77,31H23c-2.206,0-4-1.794-4-4s1.794-4,4-4h3.434l1.543-2.572C28.875,18.931,30.518,18,32.265,18h35.471c1.747,0,3.389,0.931,4.287,2.428L73.566,23H77c2.206,0,4,1.794,4,4S79.206,31,77,31z M23,25c-1.103,0-2,0.897-2,2s0.897,2,2,2h54c1.103,0,2-0.897,2-2s-0.897-2-2-2h-4c-0.351,0-0.677-0.185-0.857-0.485l-1.835-3.058C69.769,20.559,68.783,20,67.735,20H32.265c-1.048,0-2.033,0.559-2.572,1.457l-1.835,3.058C27.677,24.815,27.351,25,27,25H23z"></path><path fill="#1f212b" d="M61.5 25h-36c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h36c.276 0 .5.224.5.5S61.776 25 61.5 25zM73.5 25h-5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h5c.276 0 .5.224.5.5S73.776 25 73.5 25zM66.5 25h-2c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h2c.276 0 .5.224.5.5S66.776 25 66.5 25zM50 76c-1.654 0-3-1.346-3-3V38c0-1.654 1.346-3 3-3s3 1.346 3 3v25.5c0 .276-.224.5-.5.5S52 63.776 52 63.5V38c0-1.103-.897-2-2-2s-2 .897-2 2v35c0 1.103.897 2 2 2s2-.897 2-2v-3.5c0-.276.224-.5.5-.5s.5.224.5.5V73C53 74.654 51.654 76 50 76zM62 76c-1.654 0-3-1.346-3-3V47.5c0-.276.224-.5.5-.5s.5.224.5.5V73c0 1.103.897 2 2 2s2-.897 2-2V38c0-1.103-.897-2-2-2s-2 .897-2 2v1.5c0 .276-.224.5-.5.5S59 39.776 59 39.5V38c0-1.654 1.346-3 3-3s3 1.346 3 3v35C65 74.654 63.654 76 62 76z"></path><path fill="#1f212b" d="M59.5 45c-.276 0-.5-.224-.5-.5v-2c0-.276.224-.5.5-.5s.5.224.5.5v2C60 44.776 59.776 45 59.5 45zM38 76c-1.654 0-3-1.346-3-3V38c0-1.654 1.346-3 3-3s3 1.346 3 3v35C41 74.654 39.654 76 38 76zM38 36c-1.103 0-2 .897-2 2v35c0 1.103.897 2 2 2s2-.897 2-2V38C40 36.897 39.103 36 38 36z"></path>
                                            </svg>
                                        </button>}

                                    </div>
                                </a>
                            </li>
                        </AnimateIn>
                    ))}
                </ul>
            </section>
            {listAll ? null : (
                <button
                    onClick={() => router.push('/boxes')}
                    className="px-3 py-2 max-w-32 text-xs font-medium text-white bg-gray-600 rounded-md hover:bg-gray-500 transition-colors duration-200"
                >
                    See all projects
                </button>
            )}
        </div>
    );
};
