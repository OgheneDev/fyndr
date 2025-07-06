import React from 'react'
import { User } from 'lucide-react'
import Image from 'next/image'

const MessageAvatar = ({ party }) => {
  if (party?.avatar) {
    return (
      <Image
        src={party.avatar}
        alt={party.name}
        width={50}
        height={50}
        className="w-9 h-9 rounded-full object-cover"
      />
    )
  }
  return (
    <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center">
      <User className="w-5 h-5 text-gray-400" />
    </div>
  )
}

export default MessageAvatar
