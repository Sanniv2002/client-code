"use client";
import React, { useState, useEffect, useRef } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useToastContext } from "./Toast/ToastProvider";

export default function Landing() {
    const { addToast } = useToastContext()
    const hasShownToast = useRef(false);

    useEffect(() => {
        if (!hasShownToast.current) {
            const timer = setTimeout(() => {
                addToast({
                    type: "New Notification",
                    who: "Sanniv",
                    content: "Hola! Welcome to Script Box. Sign In or create an account to get started",
                    time: "A second ago",
                    src: "/avatar.svg"
                });
                hasShownToast.current = true;
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleShowToast = () => {
        addToast({
            type: 'Info',
            src: '/path/to/image.jpg', // Update with the actual image path
            who: 'User Name',
            content: 'This is a toast notification!',
            time: new Date().toLocaleTimeString(),
        });
    };

    return (
        <div className="bg-gray-950 h-screen flex flex-col">
            <Header />
            <div className="flex-1 flex justify-center items-center flex-col gap-5">
                <h2 className="text-white text-3xl font-semibold w-72 text-center anima">
                    Run <span className="text-blue-500">code</span> in a fully is
                    <span className="text-red-500">o</span>lated{" "}
                    <span className="text-red-500">e</span>
                    nvironment<span className="animate-pulse text-red-500">.</span>
                </h2>
                <div className="flex gap-2">
                    <button
                        onClick={handleShowToast}
                        type="button"
                        className="text-white transition-colors duration-150 bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55"
                    >
                        <svg
                            className="w-4 h-4 me-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 18 19"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Continue with Google
                    </button>
                    <button
                        onClick={() => window.open("https://github.com/Sanniv2002/client-code", "_blank")}
                        type="button"
                        className="text-white bg-[#24292F] hover:bg-gray-700 transition-colors duration-150 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                    >
                        <svg
                            className="w-4 h-4 me-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Repo
                        <svg
                            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}
