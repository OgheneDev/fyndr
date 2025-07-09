'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function PaymentDetails({ data }) {
    const [authToken, setAuthToken] = useState(null);

    // Retrieve token from localStorage on the client side
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('authToken');
            setAuthToken(token);
        }
    }, []);

    const formatBudget = (lower, upper) => {
        if (lower && upper) {
            return `₦${lower} - ₦${upper}`;
        }
        return 'Not specified';
    };

    return (
        <div className="space-y-1 text-sm mb-10">
            <div className="mb-15">
                <div>
                    <h3 className="font-medium">Transaction ID: {data.transaction_id || 'Not available'}</h3>
                </div>
                <div>
                    <h3 className="font-medium">Reference: {data.transaction_reference || 'Not available'}</h3>
                </div>
                <div>
                    <h3 className="font-medium">Payment Method: {data.payment_method || 'Not specified'}</h3>
                </div>
                <div>
                    <h3 className="font-medium">Status: {data.transaction_status || 'Not available'}</h3>
                </div>
                <div>
                    <h3 className="font-medium">Attempts: {data.payment_attempts || '0'}</h3>
                </div>
            </div>
            <Link href={`/payment?id=${data._id}&token=${encodeURIComponent(authToken || '')}`}>
                <button className="w-full py-3 px-4 bg-[#57132A] text-white rounded-lg text-sm font-medium">
                    Initiate Payment
                </button>
            </Link>
        </div>
    );
}