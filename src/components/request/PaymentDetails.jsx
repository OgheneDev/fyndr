"use client";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

export function PaymentDetails({ data }) {
    const { token } = useAuthStore();

    return (
        <div className="space-y-1 text-sm mb-10">
            <div className="mb-15">
                <h3>Transaction ID: {data.transaction_id || "Not available"}</h3>
                <h3>Reference: {data.transaction_reference || "Not available"}</h3>
                <h3>Payment Method: {data.payment_method || "Not specified"}</h3>
                <h3>Status: {data.transaction_status || "Not available"}</h3>
                <h3>Attempts: {data.payment_attempts || "0"}</h3>
            </div>
            {data.transaction_status?.toLowerCase() === "pending" && (
                <Link href={`/payment?id=${data._id}&token=${encodeURIComponent(token || "")}`}>
                    <button className="w-full py-3 px-4 cursor-pointer bg-[#85CE5C] text-white rounded-lg text-sm">
                        Initiate Payment
                    </button>
                </Link>
            )}
        </div>
    );
}