'use client'

import React from 'react';
import AnimateIn from './AnimateIn';
import { useSetRecoilState } from 'recoil';
import { resourceAtom } from '@/store/atoms/resource';
import { useRouter } from 'next/navigation';

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
    projects: Project[];
    setIsOpen: any;
}

export const Projects: React.FC<ProjectsProps> = ({ projects, setIsOpen }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const latestEntries = projects
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);

    const setResource = useSetRecoilState(resourceAtom);
    const router = useRouter();

    return (
        <div className="w-full p-4 flex flex-col justify-between flex-1 relative">
            <section>
                <div className="flex items-center justify-between mb-3">
                    <h5 className="text-base font-semibold text-gray-900 md:text-xl dark:text-white">
                        Your Recent Projects
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
                <ul className="flex-1 my-4 px-4 space-y-3">
                    {latestEntries?.map((project) => (
                        <AnimateIn
                            key={project.id}
                            from="opacity-0 scale-105"
                            to="opacity-100 scale-100"
                            style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.4, 0.55, 1.4)" }}
                        >
                            <li
                                className="cursor-pointer"
                                onClick={() => {
                                    setResource({
                                        uri: `${project.alias}.${process.env.NEXT_PUBLIC_RESOURCE_DOMAIN}`
                                    });
                                    router.push("/workspace");
                                }}
                            >
                                <a className="flex items-center justify-between p-3 text-base font-bold rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors duration-200">
                                    <div>
                                        <div className="flex items-center">
                                            <span className="flex-1 whitespace-nowrap">{project.name}</span>
                                        </div>
                                        <p className="text-xs font-normal text-gray-500 dark:text-gray-400 mt-1">
                                            {formatDate(project.createdAt)}
                                        </p>
                                    </div>
                                    <div className="flex items-center">
                                        {project.status === 'RUNNING' ? (
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
                                        ) : (
                                            <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">
                                                Stopped
                                            </span>
                                        )}
                                    </div>
                                </a>
                            </li>
                        </AnimateIn>
                    ))}
                </ul>
            </section>
            {/* Fixed "Show All Projects" button at the bottom left corner */}
            <button
                onClick={() => router.push('/projects')}
                className="fixed bottom-4 left-4 px-3 py-1 text-xs font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-500 transition-colors duration-200"
            >
                Show All Projects
            </button>
        </div>
    );
};
