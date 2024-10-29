'use client'

import { useRouter } from 'next/navigation'

export const Header = ({ loggedIn, isAdmin, otherPage = false }: { loggedIn: boolean, isAdmin: boolean, otherPage?: boolean }) => {
    const router = useRouter()
    return (
        <header className="flex justify-between items-center p-4">
            <h1 className="text-white text-2xl font-semibold">
                <span className="text-blue-500">S</span>cript <span className="text-red-500">B</span>ox
            </h1>
            {loggedIn ? (
                <div className="flex items-center gap-2">
                    {isAdmin && (
                        <svg className="w-4 h-4 text-yellow-300 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path fill="currentColor" d="M10 0L12.5 7.5H20L14 12.5L16.5 20L10 15L3.5 20L6 12.5L0 7.5H7.5L10 0Z" />
                        </svg>
                    )}
                    {otherPage ? <button
                        onClick={() => router.push("/dashboard")}
                        type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
                        Dashboard
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </button> :
                        isAdmin ? <button
                            onClick={() => router.push("/admin")}
                            type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
                            Admin
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </button> : null
                    }

                    <button
                        onClick={() => router.replace(`${process.env.NEXT_PUBLIC_BASE_URL}/logout`)}
                        type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
                        Logout
                        <svg className="w-5 h-5 ms-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
                        </svg>
                    </button>
                </div>
            ) : (
                null
            )}
        </header>
    )
}
