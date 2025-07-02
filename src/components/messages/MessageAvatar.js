import React from 'react'
import { User } from 'lucide-react'

const MessageAvatar = ({ party }) => {
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

export default MessageAvatar
