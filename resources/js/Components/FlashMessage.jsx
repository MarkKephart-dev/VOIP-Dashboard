import React, { useEffect, useState } from 'react';

export default function FlashMessage({ message }) {
    const [show, setShow] = useState(!!message);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setShow(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    if (!show || !message) return null;

    return (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50">
            {message}
        </div>
    );
}
