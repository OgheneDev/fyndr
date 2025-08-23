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
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const typingTimeoutRef = useRef(null)

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      const scrollHeight = textarea.scrollHeight
      const maxHeight = 120 // 3 lines roughly
      textarea.style.height = Math.min(scrollHeight, maxHeight) + 'px'
    }
  }, [messageInput])

  // Handle typing indicator
  const handleInputChange = (e) => {
    const value = e.target.value
    setMessageInput(value)
    
    // Typing indicator logic
    if (value.trim() && !isTyping) {
      setIsTyping(true)
      // Here you could emit a typing event to other users
    }
    
    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    
    // Set new timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false)
      // Here you could emit a stop typing event
    }, 1000)
  }

  // Enhanced key press handler
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

  // Expanded emoji collection
  const commonEmojis = [
    '😊', '😂', '❤️', '👍', '👎', '😢', '😮', '😡',
    '🎉', '🔥', '✨', '💯', '🙏', '👏', '💪', '🤝',
    '😍', '🥰', '😘', '😎', '🤔', '😬', '😅', '🙄',
    '🎈', '🌟', '⭐', '💫', '🌈', '☀️', '🌙', '⚡',
    '🚀', '💡', '🎯', '🏆', '🎁', '🍕', '☕', '🍺'
  ]

  const insertEmoji = (emoji) => {
    const textarea = textareaRef.current
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const newValue = messageInput.slice(0, start) + emoji + messageInput.slice(end)
      setMessageInput(newValue)
      
      // Reset cursor position
      setTimeout(() => {
        textarea.setSelectionRange(start + emoji.length, start + emoji.length)
        textarea.focus()
      }, 0)
    }
    setShowEmojiPicker(false)
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
      {/* Emoji Picker Overlay */}
      {showEmojiPicker && (
        <>
          <div 
            className="fixed inset-0 z-40 bg-transparent"
            onClick={() => setShowEmojiPicker(false)}
          />
          <div className="absolute bottom-full left-4 mb-2 z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4">
            <div className="flex flex-wrap gap-2 max-w-80">
              {commonEmojis.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => insertEmoji(emoji)}
                  className="w-10 h-10 flex items-center justify-center text-xl hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {emoji}
                </button>
              ))}
            </div>
            <div className="text-xs text-gray-400 mt-3 text-center">
              Click any emoji to add it
            </div>
          </div>
        </>
      )}

      {/* Main Input Container */}
      <div className={`px-4 py-3 bg-white border-t border-gray-100 mb-16 md:mb-0 transition-all duration-200 ${
        isFocused ? ' shadow-lg' : 'border-gray-200'
      }`}>
        <div className="flex items-end gap-3 max-w-full mx-auto">
          {/* User Avatar */}
          <div className="flex-shrink-0 mb-1">
            <MessageAvatar party={getCurrentUserParty(chatInfo, userType)} />
          </div>

          {/* Input Area */}
          <div className="flex-1 min-w-0">
            {/* Input Container */}
            <div className={`relative flex items-end bg-gray-50 rounded-2xl border transition-all duration-200 ${
              isFocused 
                ? 'bg-white shadow-sm' 
                : messageInput.trim() 
                  ? 'border-gray-300 bg-white' 
                  : 'border-gray-200'
            }`}>
              {/* Emoji Button */}
              <div className="flex items-center pl-3 pb-2">
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-1.5 text-gray-400 cursor-pointer hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                  disabled={chatLoading}
                  title="Add emoji"
                >
                  <Smile className="w-5 h-5" />
                </button>
              </div>

              {/* Textarea */}
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
                
                {/* Clear button for long messages */}
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

            {/* Character count and typing indicator */}
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

          {/* Send Button */}
          <div className="flex-shrink-0 mb-1">
            <button
              onClick={handleSendMessage}
              disabled={!messageInput.trim() || chatLoading || messageInput.length > 1000}
              className={`p-3 rounded-full transition-all duration-200 flex-shrink-0 transform ${
                messageInput.trim() && !chatLoading && messageInput.length <= 1000
                  ? 'bg-[#85CE5C]  text-white scale-100 shadow-lg hover:scale-105 hover:shadow-xl'
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