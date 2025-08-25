import { useRef, useEffect } from 'react'
import { Check, CheckCheck } from 'lucide-react'
import ChatSkeleton from "./ChatSkeleton"
import MessageAvatar from "./MessageAvatar"

// Helper function to format time
const formatMessageTime = (timestamp) => {
  if (!timestamp) return ''
  
  const messageDate = new Date(timestamp)
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const messageDay = new Date(messageDate.getFullYear(), messageDate.getMonth(), messageDate.getDate())
  
  // If message is from today, show time only
  if (messageDay.getTime() === today.getTime()) {
    return messageDate.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  }
  
  // If message is from yesterday
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  if (messageDay.getTime() === yesterday.getTime()) {
    return `Yesterday ${messageDate.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })}`
  }
  
  // If message is from this week
  const weekAgo = new Date(today)
  weekAgo.setDate(weekAgo.getDate() - 7)
  if (messageDate > weekAgo) {
    return messageDate.toLocaleDateString('en-US', { 
      weekday: 'short',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }
  
  // Older messages
  return messageDate.toLocaleDateString('en-US', { 
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}

// Helper function to check if we need a date separator
const shouldShowDateSeparator = (currentMessage, previousMessage) => {
  if (!previousMessage) return true
  
  const currentDate = new Date(currentMessage.createdAt || currentMessage.timestamp)
  const previousDate = new Date(previousMessage.createdAt || previousMessage.timestamp)
  
  return currentDate.toDateString() !== previousDate.toDateString()
}

// Date separator component
const DateSeparator = ({ date }) => {
  const formatDateSeparator = (date) => {
    const messageDate = new Date(date)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    
    if (messageDate.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday'
    } else {
      return messageDate.toLocaleDateString('en-US', { 
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: messageDate.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      })
    }
  }

  return (
    <div className="flex items-center justify-center py-4">
      <div className="flex items-center">
        <div className="flex-grow border-t border-gray-200"></div>
        <span className="px-3 py-1 text-xs font-medium text-gray-500 bg-gray-50 rounded-full border">
          {formatDateSeparator(date)}
        </span>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>
    </div>
  )
}

// Message status indicator
const MessageStatus = ({ message, isOwn }) => {
  if (!isOwn) return null
  
  // You can customize this based on your message status logic
  const isDelivered = message.status === 'delivered' || message.delivered
  const isRead = message.status === 'read' || message.read
  
  return (
    <div className="flex items-center ml-1">
      {isRead ? (
        <CheckCheck className="w-3 h-3 text-blue-500" />
      ) : isDelivered ? (
        <CheckCheck className="w-3 h-3 text-gray-400" />
      ) : (
        <Check className="w-3 h-3 text-gray-400" />
      )}
    </div>
  )
}

export const MessagesList = ({ chatMessages, chatLoading, chatInfo, userType }) => {
  const messagesEndRef = useRef(null)
  const messagesContainerRef = useRef(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current && !chatLoading) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [chatMessages, chatLoading])

  if (chatLoading) {
    return (
      <div className="flex-1 overflow-y-auto">
        <ChatSkeleton />
      </div>
    )
  }

  return (
    <div 
      ref={messagesContainerRef}
      className="flex-1 overflow-y-auto px-4 py-2" 
    >
      <div className="space-y-1">
        {chatMessages.map((message, index) => {
          const isOwn = message.sender?.senderType === (userType === 'merchant' ? 'Merchant' : 'User')
          const party = message.sender?.senderType === 'Merchant' ? chatInfo?.merchant : chatInfo?.user
          const previousMessage = index > 0 ? chatMessages[index - 1] : null
          const nextMessage = index < chatMessages.length - 1 ? chatMessages[index + 1] : null
          
          // Check if next message is from same sender
          const isConsecutive = nextMessage && 
            nextMessage.sender?.senderType === message.sender?.senderType
          
          // Check if we should show date separator
          const showDateSeparator = shouldShowDateSeparator(message, previousMessage)
          
          return (
            <div key={message._id}>
              {/* Date Separator */}
              {showDateSeparator && (
                <DateSeparator date={message.createdAt || message.timestamp} />
              )}
              
              {/* Message */}
              <div className={`flex items-end ${isOwn ? 'justify-end' : 'justify-start'} gap-2 group`}>
                {/* Avatar for received messages */}
                {!isOwn && (
                  <div className={`${isConsecutive ? 'invisible' : 'visible'}`}>
                    <MessageAvatar party={party} />
                  </div>
                )}
                
                {/* Message content */}
                <div className="flex flex-col max-w-[75%] md:max-w-[60%]">
                  <div
                    className={`px-4 py-3 rounded-2xl shadow-sm transition-all duration-200 ${
                      isOwn
                        ? 'bg-green-600 text-white rounded-br-md'
                        : 'bg-gray-100 text-gray-800 border border-gray-100 rounded-bl-md'
                    }`}
                  >
                    <p className="text-sm leading-relaxed break-words">
                      {message.content}
                    </p>
                  </div>
                  
                  {/* Timestamp and status */}
                  <div className={`flex items-center mt-1 px-2 ${
                    isOwn ? 'justify-end' : 'justify-start'
                  }`}>
                    <span className="text-xs text-gray-400 opacity-70 group-hover:opacity-100 transition-opacity">
                      {formatMessageTime(message.createdAt || message.timestamp)}
                    </span>
                    <MessageStatus message={message} isOwn={isOwn} />
                  </div>
                </div>
                
                {/* Avatar for sent messages */}
                {isOwn && (
                  <div className={`${isConsecutive ? 'invisible' : 'visible'}`}>
                    <MessageAvatar party={party} />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
      
      {/* Empty state for no messages */}
      {chatMessages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full py-16">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">Start the conversation</h3>
          <p className="text-gray-400 text-sm text-center max-w-xs">
            Send a message to begin chatting with {chatInfo?.merchant?.name || chatInfo?.user?.name || 'this person'}.
          </p>
        </div>
      )}
      
      {/* Scroll anchor */}
      <div ref={messagesEndRef} />
    </div>
  )
}