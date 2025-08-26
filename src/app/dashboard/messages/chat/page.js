'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useUserStore } from '@/store/userStore'
import { sendMessage, getChatById } from '@/api/messages/requests'
import { ChatHeader } from '@/components/messages/ChatHeader'
import { MessagesList } from '@/components/messages/MessagesList'
import { MessageInput } from '@/components/messages/MessageInput'

const ChatPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const chatId = searchParams.get('chatId')
  const [messageInput, setMessageInput] = useState('')
  const [chatMessages, setChatMessages] = useState([])
  const [chatInfo, setChatInfo] = useState(null)
  const [chatLoading, setChatLoading] = useState(false)
  const { userType } = useUserStore()

  useEffect(() => {
    if (chatId) {
      setChatLoading(true)
      getChatById(chatId)
        .then(data => {
          setChatMessages(data?.messages || [])
          setChatInfo(data)
        })
        .finally(() => setChatLoading(false))
    }
  }, [chatId])

  const handleSendMessage = async () => {
    if (messageInput.trim() && chatId) {
      try {
        await sendMessage({
          chatId,
          senderType: userType === 'merchant' ? 'Merchant' : 'User',
          content: messageInput.trim()
        })
        setChatLoading(true)
        getChatById(chatId)
          .then(data => {
            setChatMessages(data?.messages || [])
            setChatInfo(data)
          })
          .finally(() => setChatLoading(false))
        setMessageInput('')
      } catch (err) {}
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleBack = () => {
    router.push('/dashboard/messages')
  }

  return (
    <div className="fixed inset-0 z-105 md:z-0 flex flex-col md:pt-[80px] pt-0 bg-white">
      <ChatHeader
        chatInfo={chatInfo}
        userType={userType}
        onBack={handleBack}
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

export default ChatPage