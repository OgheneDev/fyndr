import MessageAvatar from "./MessageAvatar"
import { Send } from "lucide-react"
import getCurrentUserParty from "./_helpers/getCurrentUserParty"

export const MessageInput = ({
  messageInput,
  setMessageInput,
  handleSendMessage,
  handleKeyPress,
  chatLoading,
  chatInfo,
  userType
}) => (
  <div className="px-4 py-3 bg-white border-t mb-13 md:mb-0 border-gray-200">
    <div className="flex items-center gap-2">
      <div className="flex items-center h-10">
        <MessageAvatar party={getCurrentUserParty(chatInfo, userType)} />
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
          style={{ minHeight: 40 }}
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
)