export const Skeleton = () => (
    <div className="animate-pulse bg-white border border-[#85CE5C] pr-6 rounded-4xl flex flex-row items-center justify-between mb-4">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-gray-200"></div>
        <div>
          <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-24 mb-1"></div>
          <div className="h-3 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
      <div className="h-4 bg-gray-200 rounded w-16"></div>
    </div>
  );