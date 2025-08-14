'use client'

import React, { useState, useEffect } from 'react'
import { useUserStore } from '@/store/userStore'
import { sendMessage, getChatById, getChats } from '@/api/messages/requests'
import { Search } from 'lucide-react'
import { ChatHeader } from '@/components/messages/ChatHeader'
import { MessagesList } from '@/components/messages/MessagesList'
import { MessageInput } from '@/components/messages/MessageInput'
import { ConversationsList } from '@/components/messages/ConversationsList'

const MessagesPage = () => {
  const [selectedChat, setSelectedChat] = useState(null)
  const [messageInput, setMessageInput] = useState('')
  const [conversations, setConversations] = useState([])
  const [conversationsLoading, setConversationsLoading] = useState(true)
  const [chatLoading, setChatLoading] = useState(false)
  const [chatMessages, setChatMessages] = useState([])
  const [chatInfo, setChatInfo] = useState(null)
  const { userType } = useUserStore()

  // Helper to reload conversations
  const reloadConversations = () => {
    setConversationsLoading(true);
    getChats()
      .then(data => setConversations(data || []))
      .finally(() => setConversationsLoading(false));
  };

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

  if (selectedChat) {
    return (
      <div className="flex flex-col h-screen md:pt-[80px] pt-[72px]">
        <ChatHeader
          chatInfo={chatInfo}
          userType={userType}
          onBack={() => {
            setSelectedChat(null);
            reloadConversations();
          }}
        />
        <MessagesList
          chatMessages={chatMessages}
          chatLoading={chatLoading}
          chatInfo={chatInfo} 
          userType={userType}
        />
        <MessageInput
          messageInput={messageInput}
          setMessageInput={setMessageInput}
          handleSendMessage={handleSendMessage}
          handleKeyPress={handleKeyPress}
          chatLoading={chatLoading}
          chatInfo={chatInfo}
          userType={userType}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-16 md:pb-20 lg:pb-10 md:pt-[80px] pt-[72px]">
      {/* Header */}
      <div className="bg-white px-4 py-4 pt-6 md:max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-900">Messages</h1>
      </div>
      <ConversationsList
        conversations={conversations}
        conversationsLoading={conversationsLoading}
        setSelectedChat={setSelectedChat}
        userType={userType}
      />
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