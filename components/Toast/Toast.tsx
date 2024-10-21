// app/toast/Toast.tsx
import React, { useState, useEffect } from 'react';
import './Toast.css'; // Import your CSS styles

const Toast = ({ message, onClose }: { message: any; onClose: () => void }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);

    useEffect(() => {
        setIsVisible(true); // Show the toast

        const audio = new Audio('/notification.mp3');
        audio.play();

        const timer = setTimeout(() => {
            setIsFadingOut(true); // Start fade out
            setTimeout(onClose, 500); // Call onClose after fade-out
        }, 3000); // Adjust duration for automatic closing

        return () => clearTimeout(timer); // Cleanup timer
    }, [onClose]);

    const handleClose = () => {
        setIsFadingOut(true); // Start fade out
        setTimeout(onClose, 500); // Call onClose after fade-out
    };

    return (
        <div className={`toast-notification ${isVisible ? 'opacity-100' : ''} ${isFadingOut ? 'fade-out' : ''}`}>
            <div className="flex items-center mb-3">
                <span className="mb-1 text-sm font-semibold">{message.type}</span>
                <button
                    type="button"
                    className="ms-auto -mx-1.5 -my-1.5 bg-white justify-center items-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8"
                    aria-label="Close"
                    onClick={handleClose}
                >
                    <span className="sr-only">Close</span>
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
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                    </svg>
                </button>
            </div>
            <div className="flex items-center">
                <div className="relative inline-block shrink-0">
                    <img className="w-12 h-12 rounded-full" src={message.src} alt="Profile" />
                </div>
                <div className="ms-3 text-sm font-normal">
                    <div className="text-sm font-semibold">{message.who}</div>
                    <div className="text-sm font-normal">{message.content}</div>
                    <span className="text-xs font-medium text-blue-600">{message.time || ""}</span>
                </div>
            </div>
        </div>
    );
};

export default Toast;
