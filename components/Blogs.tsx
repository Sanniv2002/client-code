export const Blogs = () => {
    return <section className="bg-white dark:bg-gray-950 max-w-md overflow-y-hidden">
        <div className="px-4 mx-auto lg:py-6 lg:px-6">
            <div className="grid gap-8 lg:grid-cols-1">
                <article className="cursor-pointer p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-3 text-gray-500">
                        <span className="bg-blue-300 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200">
                            <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
                            Tutorial
                        </span>
                        <span className="text-sm">2 days ago</span>
                    </div>
                    <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white"><a href="#">How to start a new Environment?</a></h2>
                    <p className="mb-5 text-sm font-light text-gray-500 dark:text-gray-400">To get started with your online IDE, click New Box. From there, choose an environment, enter a name, and click Start. You&apos;re all set to begin coding!</p>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                        <img className="w-7 h-7 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png" alt="Bonnie Green avatar" />
                            <span className="font-medium dark:text-white">
                                Bonnie
                            </span>
                        </div>
                    </div>
                </article>
                <article className="cursor-pointer p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-5 text-gray-500">
                        <span className="bg-blue-300 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200">
                            <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
                            Product Demo
                        </span>
                        <span className="text-sm">a day ago</span>
                    </div>
                    <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white"><a >Visualize your .csv files in a click.</a></h2>
                    <p className="mb-5 text-sm font-light text-gray-500 dark:text-gray-400">Discover my other product, VisualizeX, designed to help you instantly visualize your .csv files with just a click—all within your browser. Enjoy seamless, interactive data insights with zero installations required.</p>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <img className="w-7 h-7 rounded-full" src="/avatar.svg" alt="Sanniv" />
                            <span className="font-medium dark:text-white">
                                Sanniv
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <a onClick={() => window.open("https:visualizex.vercel.app", "_blank")} className="cursor-pointer inline-flex items-center font-medium text-blue-500 hover:underline">
                                VisualizeX
                                <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </a>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </section>

}