import React from 'react'
import AvatarUpload from './AvatarUpload'

const ProfileSection = ({ profile, profileLoading, avatarUploading, onAvatarChange }) => (
  <div className="px-8 py-8 text-center">
    <AvatarUpload
      profile={profile}
      profileLoading={profileLoading}
      avatarUploading={avatarUploading}
      onAvatarChange={onAvatarChange}
    />
    <h2 className="text-xl font-semibold text-gray-900 mb-1">
      {profileLoading
        ? <div className="h-4 w-24 bg-gray-200 mx-auto rounded animate-pulse mb-2" />
        : (profile?.name || 'User')}
    </h2>
  </div>
)

export default ProfileSection
