import { RequestItem } from "./RequestItem";
import { SkeletonItem } from "./SkeletonItem";
import Link from "next/link";
import { Bell } from "lucide-react";

export const RequestSection = ({ requests, loading }) => (
  <div className="mb-8">
    {loading ? (
      Array.from({ length: 8 }).map((_, i) => <SkeletonItem key={i} />)
    ) : requests.length > 0 ? (
      requests.map((request) => (
        <Link
          key={request._id}
          href={`/dashboard/request/user?id=${request._id}`}
          className="block"
          passHref
        >
          <RequestItem request={request} />
        </Link>
      ))
    ) : (
      <div className="text-center py-10">
        <div className="mb-5">
          <Bell className="w-12 h-12 mx-auto text-gray-500" />
        </div>
        <span>No requests found.</span>
      </div>
    )}
  </div>
);