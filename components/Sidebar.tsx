'use client'

export const Sidebar = ({ editProfileHref, page, setPage } : { editProfileHref: string, page: boolean, setPage: any }) => {

    return <>
        <aside id="cta-button-sidebar" className="w-64 h-full transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-950 flex flex-col justify-between">
                <ul className="space-y-2 font-medium">
                    <li onClick={() =>  setPage(true)}>
                        <a className={`flex items-center p-2 rounded-lg text-white ${page? "bg-gray-700": ""} cursor-pointer hover:bg-gray-700 transition-colors duration-150 group`}>
                            <svg className={`w-5 h-5 transition duration-75 ${page? "text-white": ""}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                            </svg>
                            <span className="ms-3">Projects</span>
                        </a>
                    </li>
                    <li onClick={() =>  setPage(false)}>
                        <a className={`flex items-center p-2 rounded-lg text-white ${page? "": "bg-gray-700"} cursor-pointer hover:bg-gray-700 transition-colors duration-150 group`}>
                            <svg className={`w-5 h-5 transition duration-75 ${page? "": "text-white"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                            </svg>
                            <span className="flex-1 ms-3 whitespace-nowrap">Edit Profile</span>
                        </a>
                    </li>
                    {/* <li className="border-b-2 border-gray-500"></li> */}
                </ul>
                <div id="dropdown-cta" className="p-4 rounded-lg bg-gray-900" role="alert">
                    <div className="flex items-center mb-3">
                        <span className="bg-orange-100 text-orange-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded">Beta</span>                            
                    </div>
                    <p className="mb-3 text-sm text-white">
                        Preview the new Script Box, you all in one programming environment, made for quick execution of code remotely and with a full blown terminal. Feels like your&apos;re on a cloud machine.
                    </p>
                </div>
            </div>
        </aside>
    </>
}