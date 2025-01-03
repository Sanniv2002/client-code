import React, { useState } from 'react';

interface DeleteModalProps {
    projectId: string;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onConfirmDelete: (id: string) => Promise<void>; // Modify to async if it returns a promise
}

export const Delete: React.FC<DeleteModalProps> = ({ projectId, setOpen, onConfirmDelete }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true); // Set loading state to true when delete is initiated
        await onConfirmDelete(projectId);
        setIsDeleting(false); // Reset loading state once delete completes
        setOpen(false); // Close modal
    };

    return (
        <div
            id="deleteModal"
            aria-hidden="true"
            className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-75"
        >
            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    <button
                        type="button"
                        className="absolute top-2.5 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => setOpen(false)}
                        disabled={isDeleting}
                    >
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <svg className="w-11 h-11 mb-3.5 mx-auto text-gray-400 dark:text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
                    </svg>
                    <p className="mb-4 text-gray-500 dark:text-gray-300">
                        {isDeleting ? "Deleting this box, please wait..." : "Are you sure you want to delete this box?"}
                    </p>
                    <div className="flex justify-center items-center space-x-4">
                        <button
                            type="button"
                            className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:bg-gray-600"
                            onClick={() => setOpen(false)}
                            disabled={isDeleting}
                        >
                            No, cancel
                        </button>
                        <button
                            type="button"
                            className="py-2 px-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
                            onClick={handleDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? (
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                    </svg>
                                    Deleting...
                                </div>
                            ) : (
                                "Yes, I'm sure"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
