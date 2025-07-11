import React from 'react'
import { User, Plus } from 'lucide-react'
import Image from 'next/image'

const AvatarUpload = ({ profile, profileLoading, avatarUploading, onAvatarChange }) => (
  <div className="relative w-20 h-20 rounded-full mx-auto overflow-hidden mb-2 flex-shrink-0 bg-gray-100 flex items-center justify-center group cursor-pointer">
    <label className="w-full h-full flex items-center justify-center cursor-pointer">
      {profileLoading ? (
        <div className="animate-pulse w-23 h-23 rounded-full bg-gray-200" />
      ) : profile?.avatar ? (
        <Image
          src={profile.avatar}
          alt="avatar"
          width={80}
          height={80}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
          <User size={28} className="text-gray-500" />
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => onAvatarChange(e.target.files?.[0])}
        disabled={avatarUploading}
      />
      <span className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow group-hover:bg-gray-100">
        <Plus size={16} className="text-gray-700" />
      </span>
    </label>
    {avatarUploading && (
      <div className="absolute inset-0 bg-white/60 flex items-center justify-center rounded-full">
        <span className="text-xs text-gray-500">Uploading...</span>
      </div>
    )}
  </div>
)

export default AvatarUpload
