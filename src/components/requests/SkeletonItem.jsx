export const SkeletonItem = () => (
    <div className="flex items-center justify-between p-4 animate-pulse">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-gray-200 rounded-sm" />
        <div>
          <div className="h-4 bg-gray-200 rounded w-32 mb-2" />
          <div className="h-3 bg-gray-100 rounded w-20" />
        </div>
      </div>
      <div className="w-5 h-5 bg-gray-200 rounded" />
    </div>
  );