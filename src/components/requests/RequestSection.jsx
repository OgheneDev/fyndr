export const RequestSection = ({ requests, loading }) => (
  <div className="w-full">
    <div className="w-full space-y-4">
      {loading ? (
        Array.from({ length: 3 }).map((_, i) => <SkeletonItem key={i} />)
      ) : requests.length > 0 ? (
        requests.map((request) => (
          <Link
            key={request._id}
            href={`/dashboard/request/user?id=${request._id}`}
            className="block w-full"
            passHref
          >
            <RequestItem request={request} />
          </Link>
        ))
      ) : (
        <div className="text-center py-10 w-full">
          <div className="mb-5">
            <Bell className="w-12 h-12 mx-auto text-gray-500" />
          </div>
          <span>No requests found.</span>
        </div>
      )}
    </div>
  </div>
);