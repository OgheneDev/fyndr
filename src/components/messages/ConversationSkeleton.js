import React from 'react'

const ConversationSkeleton = () => (
  <div className="flex items-center gap-3 px-4 py-3">
    <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
    <div className="flex-1 min-w-0">
      <div className="h-4 w-24 bg-gray-200 rounded mb-2 animate-pulse" />
      <div className="h-3 w-32 bg-gray-100 rounded animate-pulse" />
    </div>
  </div>
)

export default ConversationSkeleton
