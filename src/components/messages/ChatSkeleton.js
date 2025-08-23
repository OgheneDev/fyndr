import React from 'react'

const ChatSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 px-4 py-2 ">
      {/* Date separator skeleton */}
      <div className="flex items-center justify-center py-4">
        <div className="flex items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <div className="px-3 py-1 bg-gray-100 rounded-full animate-pulse">
            <div className="h-3 w-12 bg-gray-200 rounded" />
          </div>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>
      </div>

      {[...Array(12)].map((_, i) => {
        const isOwn = i % 3 === 0 // Mix of own and other messages
        const isConsecutive = i > 0 && (i - 1) % 3 === (i % 3) // Some consecutive messages
        
        return (
          <div key={i} className={`flex items-end ${isOwn ? 'justify-end' : 'justify-start'} gap-2`}>
            {/* Avatar skeleton for received messages */}
            {!isOwn && (
              <div className={`${isConsecutive ? 'invisible' : 'visible'}`}>
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
              </div>
            )}
            
            {/* Message content skeleton */}
            <div className="flex flex-col max-w-[75%] md:max-w-[60%]">
              <div className={`px-4 py-3 rounded-2xl animate-pulse ${
                isOwn 
                  ? 'bg-gray-200 rounded-br-md' 
                  : 'bg-gray-100 border border-gray-200 rounded-bl-md'
              }`}>
                {/* Variable width content */}
                <div className="space-y-2">
                  <div className={`h-3 bg-gray-300 rounded ${
                    i % 4 === 0 ? 'w-32' : 
                    i % 4 === 1 ? 'w-24' : 
                    i % 4 === 2 ? 'w-40' : 'w-28'
                  }`} />
                  {/* Some messages have multiple lines */}
                  {i % 5 === 0 && (
                    <div className="h-3 w-20 bg-gray-300 rounded" />
                  )}
                </div>
              </div>
              
              {/* Timestamp skeleton */}
              <div className={`flex items-center mt-1 px-2 ${
                isOwn ? 'justify-end' : 'justify-start'
              }`}>
                <div className="h-2 w-8 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
            
            {/* Avatar skeleton for sent messages */}
            {isOwn && (
              <div className={`${isConsecutive ? 'invisible' : 'visible'}`}>
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
              </div>
            )}
          </div>
        )
      })}
      
      {/* Additional loading indicator */}
      <div className="flex justify-center py-4">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
          <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
        </div>
      </div>
    </div>
  )
}

export default ChatSkeleton