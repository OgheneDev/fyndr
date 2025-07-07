import { RequestItem } from "./RequestItem";
import { SkeletonItem } from "./SkeletonItem";
import Link from "next/link";
import { Bell } from "lucide-react";

export const RequestSection = ({ requests, loading }) => (
    <div className="mb-8">
      <div className="overflow-hidden">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <SkeletonItem key={i} />)
          : requests.length > 0
            ? requests.map((request) => (
                <Link
                  key={request._id}
                  href={`/dashboard/request?id=${request._id}`}
                  className="block"
                  passHref
                >
                  <RequestItem request={request} />
                </Link>
              ))
            : <div className="text-center py-30">
                <div className="mb-5">
                    <Bell className="w-13 h-13 mx-auto text-gray-500" />
                </div>
                <span> No requests found.</span>
              </div>
        }
      </div>
    </div>
);