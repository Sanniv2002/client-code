'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import useToast from '@/hooks/useToast'; // Import your custom hook
import Toast from './Toast'; // Import your Toast component

interface ToastContextType {
    addToast: (message: any) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { toasts, addToast, removeToast } = useToast(); // Destructure the necessary values from the hook

    // Hydration fix: Ensure toasts are managed after component mounts
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true); // Set mounted to true after the component mounts
    }, []);

    if (!mounted) {
        return null; // Prevent rendering on the server
    }

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="toast-container">
                {toasts.map(({ id, message }) => (
                    <Toast key={id} message={message} onClose={() => removeToast(id)} />
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToastContext = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToastContext must be used within a ToastProvider');
    }
    return context;
};
