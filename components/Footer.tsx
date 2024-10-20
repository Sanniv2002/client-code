// Footer.tsx
import React, { useEffect, useState } from 'react';

export const Footer = () => {
    const [isOnline, setIsOnline] = useState<boolean>(true);
    const [statusMessage, setStatusMessage] = useState<string>('Checking status...');

    const checkSystemStatus = async () => {
        try {
            // Replace with your actual endpoint
            const response = await fetch(''); // Example endpoint
            if (response.ok) {
                const data = await response.json();
                setIsOnline(data.message === 'Server is healthy');
                setStatusMessage(data.message === 'Server is healthy' ? 'All systems normal' : 'Some systems are down');
            } else {
                setIsOnline(false);
                setStatusMessage('Unable to check status');
            }
        } catch (error) {
            console.error("Error checking system status:", error);
            setIsOnline(false);
            setStatusMessage('Unable to check status');
        }
    };

    useEffect(() => {
        checkSystemStatus(); // Initial check
        const intervalId = setInterval(checkSystemStatus, 30000); // Check every 30 seconds

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    return (
        <footer className="bg-gray-950 py-3 relative flex justify-center items-center px-4">
            <p className="text-white text-sm text-center flex-1">&copy; 2024 Scriptbox-API. All rights reserved.</p>
            <div className={`px-2 py-1 rounded-md absolute right-4 flex items-center hover:cursor-pointer hover:bg-gray-800 transition-colors duration-200`}>
                <span className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500 animate-pulse'} mr-1`}></span>
                <span className="text-white text-sm">{statusMessage}</span>
            </div>
        </footer>
    );
}
