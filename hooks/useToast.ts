// app/toast/useToast.ts
import { useState, useCallback } from 'react';

interface Message {
    type: string;
    src: string;
    who: string;
    content: string;
    time?: string;
}

interface Toast {
    id: number; // Unique identifier for each toast
    message: Message;
}

const useToast = () => {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const [nextId, setNextId] = useState(0); // Track the next toast ID

    const addToast = useCallback((message: Message) => {
        setToasts((prevToasts) => [...prevToasts, { id: nextId, message }]);
        setNextId((prevId) => prevId + 1); // Increment the next ID for the next toast

        // Automatically remove the toast after a certain duration
        const id = nextId; // Capture the current toast ID for removal later
        setTimeout(() => {
            removeToast(id);
        }, 3000);
    }, [nextId]);

    const removeToast = useCallback((id: number) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, []);

    return { toasts, addToast, removeToast };
};

export default useToast;
