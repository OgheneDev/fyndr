import React from 'react'

const ChatSkeleton = () => (
  <div className="flex flex-col gap-3 px-4 py-2">
    {[...Array(8)].map((_, i) => (
      <div key={i} className={`flex ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
        <div className={`max-w-[80%] px-4 py-2 rounded-lg ${i % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'} animate-pulse`}>
          <div className="h-4 w-32 bg-gray-300 rounded mb-1" />
          <div className="h-3 w-16 bg-gray-200 rounded" />
        </div>
      </div>
    ))}
  </div>
)

export default ChatSkeleton
