'use client'

import React, { useState } from 'react'
import { Search, ArrowLeft, Send, MoreVertical } from 'lucide-react'

const MessagesPage = () => {
  const [selectedChat, setSelectedChat] = useState(null)
  const [messageInput, setMessageInput] = useState('')

  // Sample data for conversations
  const conversations = [
    {
      id: 1,
      name: 'Alex Bennett',
      service: 'Plumbing service request',
      lastMessage: 'Thanks for the quick response! When can you start?',
      time: '2d',
      avatar: '/api/placeholder/40/40',
      unread: true
    },
    {
      id: 2,
      name: 'Sophia Carter',
      service: 'Electrical repair request',
      lastMessage: 'I need help with my electrical outlets',
      time: '1w',
      avatar: '/api/placeholder/40/40',
      unread: false
    },
    {
      id: 3,
      name: 'Ethan Davis',
      service: 'Home cleaning service request',
      lastMessage: 'What time works best for you?',
      time: '2w',
      avatar: '/api/placeholder/40/40',
      unread: false
    },
    {
      id: 4,
      name: 'Olivia Foster',
      service: 'Landscaping service request',
      lastMessage: 'Could you provide a quote for the garden work?',
      time: '3w',
      avatar: '/api/placeholder/40/40',
      unread: false
    },
    {
      id: 5,
      name: 'Noah Green',
      service: 'Painting service request',
      lastMessage: 'The paint colors look great!',
      time: '1m',
      avatar: '/api/placeholder/40/40',
      unread: false
    }
  ]

  // Sample chat messages
  const chatMessages = {
    1: [
      { id: 1, text: 'Hi! I saw your plumbing service request. I can help you with that.', sender: 'me', time: '10:30 AM' },
      { id: 2, text: 'Great! I have a leaky faucet in my kitchen that needs fixing.', sender: 'them', time: '10:32 AM' },
      { id: 3, text: 'I can come by tomorrow morning to take a look. Would 9 AM work for you?', sender: 'me', time: '10:35 AM' },
      { id: 4, text: 'Thanks for the quick response! When can you start?', sender: 'them', time: '10:40 AM' }
    ],
    2: [
      { id: 1, text: 'Hello! I need help with my electrical outlets.', sender: 'them', time: '2:15 PM' },
      { id: 2, text: 'I can help you with that. What seems to be the issue?', sender: 'me', time: '2:20 PM' },
      { id: 3, text: 'Two outlets in my living room stopped working suddenly.', sender: 'them', time: '2:22 PM' }
    ],
    3: [
      { id: 1, text: 'Hi! I saw your home cleaning service. Are you available this week?', sender: 'them', time: '9:00 AM' },
      { id: 2, text: 'Yes, I have availability. What type of cleaning do you need?', sender: 'me', time: '9:15 AM' },
      { id: 3, text: 'Just a regular house cleaning, about 2000 sq ft.', sender: 'them', time: '9:18 AM' },
      { id: 4, text: 'What time works best for you?', sender: 'me', time: '9:20 AM' }
    ]
  }

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedChat) {
      // In a real app, this would make an API call
      console.log('Sending message:', messageInput, 'to chat:', selectedChat.id)
      setMessageInput('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  if (selectedChat) {
    const messages = chatMessages[selectedChat.id] || []
    
    return (
      <div className="flex flex-col h-screen bg-gray-50">
        {/* Chat Header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-200">
          <button
            onClick={() => setSelectedChat(null)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div className="w-10 h-10 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-medium text-gray-700">
              {getInitials(selectedChat.name)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 truncate">{selectedChat.name}</h3>
            <p className="text-sm text-gray-500 truncate">{selectedChat.service}</p>
          </div>
          <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <MoreVertical className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] px-4 py-2 rounded-lg ${
                  message.sender === 'me'
                    ? 'bg-[#541229] text-white rounded-br-sm'
                    : 'bg-white text-gray-900 rounded-bl-sm'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'me' ? 'text-gray-200' : 'text-gray-500'
                }`}>
                  {message.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="px-4 py-3 bg-white border-t border-gray-200">
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <textarea
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="w-full px-4 py-2 border border-gray-200 rounded-full resize-none outline-none text-sm max-h-20"
                rows="1"
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!messageInput.trim()}
              className="p-2 bg-[#541229] disabled:bg-gray-300 text-white rounded-full transition-colors flex-shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900">Messages</h1>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-3 bg-white border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-full text-sm outline-none"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="bg-white">
        {conversations.map((conversation, index) => (
          <div
            key={conversation.id}
            onClick={() => setSelectedChat(conversation)}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
          >
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">
                  {getInitials(conversation.name)}
                </span>
              </div>
              {conversation.unread && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#541229] rounded-full"></div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-gray-900 truncate">{conversation.name}</h3>
                <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{conversation.time}</span>
              </div>
              <p className="text-xs text-gray-500 truncate mb-1">{conversation.service}</p>
              <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {conversations.length === 0 && (
        <div className="text-center py-16 px-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
          <p className="text-gray-500 text-sm">Start a conversation with service providers.</p>
        </div>
      )}
    </div>
  )
}

export default MessagesPage