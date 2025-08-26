'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/store/userStore'
import { getChats } from '@/api/messages/requests'
import { Search } from 'lucide-react'
import { ConversationsList } from '@/components/messages/ConversationsList'

const MessagesPage = () => {
  const [conversations, setConversations] = useState([])
  const [conversationsLoading, setConversationsLoading] = useState(true)
  const { userType } = useUserStore()
  const router = useRouter()

  // Helper to reload conversations
  const reloadConversations = () => {
    setConversationsLoading(true)
    getChats()
      .then(data => setConversations(data || []))
      .finally(() => setConversationsLoading(false))
  }

  useEffect(() => {
    const storedChat = typeof window !== 'undefined' ? localStorage.getItem('fynder_selected_chat') : null
    if (storedChat) {
      try {
        const chatObj = JSON.parse(storedChat)
        router.push(`/dashboard/messages/chat?chatId=${chatObj._id}`)
      } catch (e) {}
      localStorage.removeItem('fynder_selected_chat')
    }
    reloadConversations()
  }, [])

  const handleSelectChat = (chat) => {
    router.push(`/dashboard/messages/chat?chatId=${chat._id}`)
  }

  return (
    <div className="min-h-screen pb-16 md:pb-20 lg:pb-10 md:pt-[80px] pt-[72px]">
      <div className="bg-white px-4 py-4 pt-6 md:max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-900">Messages</h1>
      </div>
      <ConversationsList
        conversations={conversations}
        conversationsLoading={conversationsLoading}
        setSelectedChat={handleSelectChat}
        userType={userType}
      />
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