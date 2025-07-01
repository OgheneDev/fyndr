'use client'

import React, { useState, useEffect } from 'react'
import { useUserStore } from '@/store/userStore'
import { sendMessage, getChatById, getChats } from '@/api/messages/requests'
import { Search, ArrowLeft, Send, MoreVertical, User, Image } from 'lucide-react'

const MessagesPage = () => {
  const [selectedChat, setSelectedChat] = useState(null)
  const [messageInput, setMessageInput] = useState('')
  const [conversations, setConversations] = useState([])
  const [conversationsLoading, setConversationsLoading] = useState(true)
  const [chatLoading, setChatLoading] = useState(false)
  const [chatMessages, setChatMessages] = useState([])
  const [chatInfo, setChatInfo] = useState(null)
  const { userType } = useUserStore()

  // Fetch all chats on mount
  useEffect(() => {
    // Check if a chat was passed from the request page
    const storedChat = typeof window !== 'undefined' ? localStorage.getItem('fynder_selected_chat') : null;
    if (storedChat) {
      try {
        const chatObj = JSON.parse(storedChat);
        setSelectedChat(chatObj);
      } catch (e) {
        // ignore parse error
      }
      localStorage.removeItem('fynder_selected_chat');
    }
    setConversationsLoading(true)
    getChats()
      .then(data => setConversations(data || []))
      .finally(() => setConversationsLoading(false))
  }, [])

  // Fetch a specific chat when selectedChat changes
  useEffect(() => {
    if (selectedChat && selectedChat._id) {
      setChatLoading(true)
      getChatById(selectedChat._id)
        .then(data => {
          setChatMessages(data?.messages || [])
          setChatInfo(data)
        })
        .finally(() => setChatLoading(false))
    }
  }, [selectedChat])

  const handleSendMessage = async () => {
    if (messageInput.trim() && selectedChat) {
      try {
        await sendMessage({
          chatId: selectedChat._id,
          senderType: userType === 'merchant' ? 'Merchant' : 'User',
          content: messageInput.trim()
        })
        // Refresh chat after sending
        setChatLoading(true)
        getChatById(selectedChat._id)
          .then(data => {
            setChatMessages(data?.messages || [])
            setChatInfo(data)
          })
          .finally(() => setChatLoading(false))
        setMessageInput('')
      } catch (err) {
        // Optionally show error
      }
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Skeleton for conversations
  const ConversationSkeleton = () => (
    <div className="flex items-center gap-3 px-4 py-3">
      <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
      <div className="flex-1 min-w-0">
        <div className="h-4 w-24 bg-gray-200 rounded mb-2 animate-pulse" />
        <div className="h-3 w-32 bg-gray-100 rounded animate-pulse" />
      </div>
    </div>
  )

  // Skeleton for chat messages
  const ChatSkeleton = () => (
    <div className="flex flex-col gap-3 px-4 py-2">
      {[...Array(6)].map((_, i) => (
        <div key={i} className={`flex ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-[80%] px-4 py-2 rounded-lg ${i % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'} animate-pulse`}>
            <div className="h-4 w-32 bg-gray-300 rounded mb-1" />
            <div className="h-3 w-16 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  )

  // Helper to render avatar or fallback
  const renderAvatar = (party) => {
    if (party?.avatar) {
      return (
        <img
          src={party.avatar}
          alt={party.name}
          className="w-12 h-12 rounded-full object-cover"
        />
      )
    }
    return (
      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
        <User className="w-6 h-6 text-gray-400" />
      </div>
    )
  }

  // Helper for message avatar (smaller)
  const renderMessageAvatar = (party) => {
    if (party?.avatar) {
      return (
        <img
          src={party.avatar}
          alt={party.name}
          className="w-8 h-8 rounded-full object-cover"
        />
      )
    }
    return (
      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
        <User className="w-4 h-4 text-gray-400" />
      </div>
    )
  }

  // Helper to get current user/merchant info for avatar
  const getCurrentUserParty = () => {
    if (!chatInfo) return null
    return userType === 'merchant' ? chatInfo.merchant : chatInfo.user
  }

  if (selectedChat) {
    return (
      <div className="flex flex-col h-screen ">
        {/* Chat Header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-white ">
          <button
            onClick={() => setSelectedChat(null)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          {/* Avatar or fallback */}
          <div className="flex-shrink-0">
            {renderAvatar(chatInfo?.user || chatInfo?.merchant)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 truncate">
              {chatInfo?.user?.name || chatInfo?.merchant?.name || <span className="inline-block h-4 w-24 bg-gray-200 rounded animate-pulse align-middle" />}
            </h3>
            <p className="text-sm text-gray-500 truncate">
              {chatInfo?.request?.title || <span className="inline-block h-3 w-20 bg-gray-100 rounded animate-pulse align-middle" />}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-2  space-y-3">
          {chatLoading ? (
            <ChatSkeleton />
          ) : (
            chatMessages.map((message) => {
              const isOwn = message.sender?.senderType === (userType === 'merchant' ? 'Merchant' : 'User')
              const party = message.sender?.senderType === 'Merchant' ? chatInfo?.merchant : chatInfo?.user
              return (
                <div
                  key={message._id}
                  className={`flex items-end ${isOwn ? 'justify-end' : 'justify-start'} gap-2`}
                >
                  {/* Avatar on left for other, right for own */}
                  {!isOwn && renderMessageAvatar(party)}
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-lg ${
                      isOwn
                        ? 'bg-[#B2C9E5] text-[#121417] rounded-br-sm'
                        : 'bg-[#F2F2F5] text-[#121417] rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                  {isOwn && renderMessageAvatar(party)}
                </div>
              )
            })
          )}
        </div>

        {/* Message Input */}
<div className="px-4 py-3 bg-white border-t mb-13 md:mb-0 border-gray-200">
  <div className="flex items-center gap-2">
    {/* Current user avatar */}
    <div className="flex items-center h-10">
      {renderMessageAvatar(getCurrentUserParty())}
    </div>
    <div className="flex-1 flex items-center">
      <textarea
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type a message..."
        className="w-full px-4 py-2 border border-gray-200 rounded-full resize-none outline-none text-sm max-h-20"
        rows="1"
        disabled={chatLoading}
        style={{ minHeight: 40 }} // Ensures textarea matches avatar/button height
      />
    </div>
    <div className="flex items-center h-10">
      <button
        onClick={handleSendMessage}
        disabled={!messageInput.trim() || chatLoading}
        className="p-2 bg-[#541229] disabled:bg-gray-300 text-white rounded-full cursor-pointer transition-colors flex-shrink-0"
        style={{ height: 40, width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Send className="w-5 h-5" />
      </button>
    </div>
  </div>
</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white px-4 py-4 pt-6 md:max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-center md:text-start text-gray-900">Messages</h1>
      </div>

      {/* Conversations List */}
      <div className="bg-white md:max-w-4xl mx-auto">
        {conversationsLoading ? (
          <>
            {[...Array(5)].map((_, i) => <ConversationSkeleton key={i} />)}
          </>
        ) : (
          conversations.map((conversation) => {
            const otherParty = userType === 'merchant' ? conversation.user : conversation.merchant
            const lastMsg = conversation.lastMessage
            const unread = userType === 'merchant' ? conversation.merchantUnreadCount > 0 : conversation.userUnreadCount > 0
            return (
              <div
                key={conversation._id}
                onClick={() => setSelectedChat(conversation)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer"
              >
                <div className="relative flex-shrink-0">
                  {renderAvatar(otherParty)}
                  {unread && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#541229] rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900 truncate">
                      {otherParty?.name || <span className="inline-block h-4 w-24 bg-gray-200 rounded animate-pulse align-middle" />}
                    </h3>
                    <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                      {lastMsg?.createdAt ? new Date(lastMsg.createdAt).toLocaleDateString() : ''}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{lastMsg?.content || ''}</p>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Empty State */}
      {!conversationsLoading && conversations.length === 0 && (
        <div className="text-center py-16 px-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
          <p className="text-gray-500 text-sm">Start a conversation.</p>
        </div>
      )}
    </div>
  )
}

export default MessagesPage