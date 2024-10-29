import { useState } from 'react';
import { Messages } from './Messages/Messages';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { resourceAtom } from '@/store/atoms/resource';
import { useRouter } from 'next/navigation'

const StartBox = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const [selectedEnvironment, setSelectedEnvironment] = useState("");
    const [name, setName] = useState("");
    const [processing, setProcessing] = useState(false);
    const [messages, setMessages] = useState(["Starting a new Environment"]);
    const [resource, setResource] = useRecoilState(resourceAtom)
    const router = useRouter()

    const startEventStream = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/start`, {
                name: name,
                environment: selectedEnvironment
            }, {
                headers: {
                    'Accept': 'text/event-stream',
                },
                responseType: 'stream',
                adapter: 'fetch',
                withCredentials: true
            });
            if (response.status === 200) {
                const stream = response.data;
                const reader = stream.pipeThrough(new TextDecoderStream()).getReader();
    
                while (true) {
                    const { value, done } = await reader.read();
                    if (done) {
                        break;
                    }
                    const messages = value.split(/data:\s+/);
                    if(messages.length === 1 && JSON.parse(messages[0])){
                        setResource({
                            uri: `${JSON.parse(messages[0]).alias}.${process.env.NEXT_PUBLIC_RESOURCE_DOMAIN}`
                        })
                        router.push("/workspace")
                        return
                    }
                    messages.slice(1).forEach((msg: any) => {
                        try {
                            setMessages(prevMessages => [...prevMessages, JSON.parse(msg).status]);
                        } catch (parseError) {
                            console.error("Error parsing message:", parseError);
                        }
                    });
                }
            }
        } catch (error) {
            console.error("Error starting the event stream:", error);
        }
    };

    console.log(resource)
    


    const handleSubmit = async (e: any) => {
        if (name && selectedEnvironment) {
            try {
                setProcessing(true)
                startEventStream(e)
            } catch (e) {
                console.log(e)
            }
        }
    }

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const handleSelectChange = (event: any) => {
        setSelectedEnvironment(event.target.value);
    };

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-30"
                >
                    {processing ? <Messages messages={
                        messages
                        // Add more messages as needed
                    } isStarting={processing} /> : <div className="relative p-4 w-full max-w-md max-h-full">
                        {/* Modal content */}
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            {/* Modal header */}
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-md font-semibold text-gray-900 dark:text-white">
                                    <span className="text-blue-500">S</span>tart New <span className="text-red-500">B</span>ox
                                </h3>
                                <button
                                    onClick={toggleModal}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                                        />
                                    </svg>
                                </button>
                            </div>

                            {/* Modal body */}
                            <form className="p-4 md:p-5">
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                    <div className="col-span-1">
                                        <label
                                            htmlFor="name"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Name
                                        </label>
                                        <input
                                            onChange={(e) => setName(e.target.value)}
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Type box name"
                                            required={true}
                                        />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label
                                            htmlFor="Environment"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Category
                                        </label>
                                        <select
                                            required={true}
                                            id="environment"
                                            value={selectedEnvironment}
                                            onChange={handleSelectChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        >
                                            <option value="">Select environment</option>
                                            <option value="node">Node.js</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="w-full flex justify-between">
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                        Selected environment: {selectedEnvironment}
                                    </p>
                                    <button
                                        onClick={(e) => handleSubmit(e)}
                                        type="submit"
                                        className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        <img src="/rocket.svg" alt="" className="size-4 me-2" />
                                        Start
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>}

                </div>
            )}
        </>
    );
};

export default StartBox;
