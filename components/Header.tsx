'use client'

import { useRouter } from 'next/navigation'

export const Header = () => {
    const router = useRouter()
    return <header className="flex justify-between items-center p-4">
        <h1 className="text-white text-2xl font-semibold"><span className="text-blue-500">S</span>cript <span className="text-red-500">B</span>ox</h1>
        <button
        onClick={() => router.replace(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/google`)}
        type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Admin Login
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
        </button>
    </header>
}