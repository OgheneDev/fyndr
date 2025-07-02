import ChatSkeleton from "./ChatSkeleton"
import MessageAvatar from "./MessageAvatar"

export const MessagesList = ({ chatMessages, chatLoading, chatInfo, userType }) => (
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
            {!isOwn && <MessageAvatar party={party} />}
            <div
              className={`max-w-[80%] px-4 py-2 rounded-lg ${
                isOwn
                  ? 'bg-[#B2C9E5] text-[#121417] rounded-br-sm'
                  : 'bg-[#F2F2F5] text-[#121417] rounded-bl-sm'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
            </div>
            {isOwn && <MessageAvatar party={party} />}
          </div>
        )
      })
    )}
  </div>
)