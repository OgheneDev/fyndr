import React from 'react'
import { User } from 'lucide-react'

const Avatar = ({ party }) => {
  if (party?.avatar) {
    return (
      <img
        src={party.avatar}
        alt={party.name}
        className="w-12 h-12 rounded-full object-cover"
      />
    )
  }
  return (
    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
      <User className="w-6 h-6 text-gray-400" />
    </div>
  )
}

export default Avatar
