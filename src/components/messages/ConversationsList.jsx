import React from 'react';
import Avatar from './Avatar';
import ConversationSkeleton from './ConversationSkeleton';

export const ConversationsList = ({
  conversations,
  conversationsLoading,
  setSelectedChat,
  userType
}) => {
  // Sort conversations by updatedAt in descending order (newest first)
  const sortedConversations = [...conversations].sort((a, b) => 
    new Date(b.updatedAt) - new Date(a.updatedAt)
  );

  return (
    <div className="bg-white md:max-w-4xl mx-auto overflow-hidden">
      {conversationsLoading ? (
        <>
          {[...Array(7)].map((_, i) => <ConversationSkeleton key={i} />)}
        </>
      ) : (
        sortedConversations.map((conversation) => {
          const otherParty = userType === 'merchant' ? conversation.user : conversation.merchant;
          const lastMsg = conversation.lastMessage;
          const unread = userType === 'merchant' ? conversation.merchantUnreadCount > 0 : conversation.userUnreadCount > 0;
          // Truncate last message to 40 characters to prevent overflow
          const truncatedMessage = lastMsg?.content?.length > 40 
            ? lastMsg.content.substring(0, 37) + '...' 
            : lastMsg?.content || '';

          return (
            <div
              key={conversation._id}
              onClick={() => setSelectedChat(conversation)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer"
            >
              <div className="relative flex-shrink-0">
                <Avatar party={otherParty} />
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
                <p className="text-sm text-gray-600 truncate">{truncatedMessage}</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};