'use client'

import { useRef, useEffect, useState } from 'react'
import MessageAvatar from "./MessageAvatar"
import { Send, Smile, X } from "lucide-react"
import getCurrentUserParty from "./_helpers/getCurrentUserParty"

export const MessageInput = ({
  messageInput,
  setMessageInput,
  handleSendMessage,
  handleKeyPress,
  chatLoading,
  chatInfo,
  userType
}) => {
  const textareaRef = useRef(null)
  const [isTyping, setIsTyping] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const typingTimeoutRef = useRef(null)

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      const scrollHeight = textarea.scrollHeight
      const maxHeight = 120
      textarea.style.height = Math.min(scrollHeight, maxHeight) + 'px'
    }
  }, [messageInput])

  const handleInputChange = (e) => {
    const value = e.target.value
    setMessageInput(value)
    
    if (value.trim() && !isTyping) {
      setIsTyping(true)
    }
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false)
    }, 1000)
  }

  const handleEnhancedKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (messageInput.trim()) {
        handleSendMessage()
        setIsTyping(false)
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current)
        }
      }
    }
  }

  const clearMessage = () => {
    setMessageInput('')
    setIsTyping(false)
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    textareaRef.current?.focus()
  }

  return (
    <div className="relative">
      <div className={`px-4 py-3 bg-white border-t border-gray-100 transition-all duration-200 ${
        isFocused ? 'shadow-lg' : 'border-gray-200'
      }`}>
        <div className="flex items-end gap-3 max-w-full mx-auto">
          <div className="flex-shrink-0 mb-1">
            <MessageAvatar party={getCurrentUserParty(chatInfo, userType)} />
          </div>

          <div className="flex-1 min-w-0">
            <div className={`relative flex items-end bg-gray-50 rounded-2xl border transition-all duration-200 ${
              isFocused 
                ? 'bg-white shadow-sm' 
                : messageInput.trim() 
                  ? 'border-gray-300 bg-white' 
                  : 'border-gray-200'
            }`}>
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={messageInput}
                  onChange={handleInputChange}
                  onKeyDown={handleEnhancedKeyPress}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder={chatLoading ? "Sending..." : "Type a message..."}
                  className="w-full px-2 py-2.5 bg-transparent resize-none outline-none text-sm placeholder-gray-400 leading-relaxed"
                  rows="1"
                  disabled={chatLoading}
                  style={{ 
                    minHeight: 20,
                    maxHeight: 120,
                    scrollbarWidth: 'thin'
                  }}
                />
                {messageInput.length > 50 && (
                  <button
                    onClick={clearMessage}
                    className="absolute top-1 right-1 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center mt-1 px-2">
              <div className="flex items-center gap-2">
                {isTyping && (
                  <div className="flex items-center gap-1">
                    <div className="flex space-x-0.5">
                      <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" />
                      <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                    <span className="text-xs text-blue-500">typing...</span>
                  </div>
                )}
              </div>
              
              {messageInput.length > 100 && (
                <span className={`text-xs ${
                  messageInput.length > 500 ? 'text-red-500' : 'text-gray-400'
                }`}>
                  {messageInput.length}/1000
                </span>
              )}
            </div>
          </div>

          <div className="flex-shrink-0 mb-1">
            <button
              onClick={handleSendMessage}
              disabled={!messageInput.trim() || chatLoading || messageInput.length > 1000}
              className={`p-3 rounded-full transition-all duration-200 flex-shrink-0 transform ${
                messageInput.trim() && !chatLoading && messageInput.length <= 1000
                  ? 'bg-[#85CE5C] text-white scale-100 shadow-lg hover:scale-105 hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 scale-95 cursor-not-allowed'
              }`}
              style={{ width: 44, height: 44 }}
            >
              {chatLoading ? (
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}