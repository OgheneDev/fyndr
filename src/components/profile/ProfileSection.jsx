import React from 'react';
import AvatarUpload from './AvatarUpload';
import { Star } from 'lucide-react';
import { useUserStore } from '@/store/userStore';

const ProfileSection = ({ profile, profileLoading, avatarUploading, onAvatarChange }) => {
  const { userType } = useUserStore();

  // Function to render star icons based on the average rating
  const renderStars = (average) => {
    const stars = [];
    const roundedAverage = Math.round(average); // Round to nearest integer for star display
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          className={i <= roundedAverage ? 'fill-yellow-400 stroke-yellow-400' : 'stroke-yellow-400'}
        />
      );
    }
    return stars;
  };

  // Function to extract year from createdAt date
  const getYearFromDate = (createdAt) => {
    if (!createdAt) return '';
    return new Date(createdAt).getFullYear().toString();
  };

  return (
    <div className="px-8 py-8 text-center">
      <AvatarUpload
        profile={profile}
        profileLoading={profileLoading}
        avatarUploading={avatarUploading}
        onAvatarChange={onAvatarChange}
      />
      <h2 className="text-sm font-semibold text-gray-900 mb-1">
        {profileLoading ? (
          <div className="h-4 w-24 bg-gray-200 mx-auto rounded animate-pulse mb-2" />
        ) : (
          profile?.name || 'User'
        )}
      </h2>
      {userType === 'merchant' && !profileLoading && profile && (
        <div className="flex items-center justify-center gap-1 mt-1">
          <div className="flex">{renderStars(profile?.rating?.average)}</div>
          <span className="text-sm text-gray-700">
            ({profile?.rating?.average})
          </span>
        </div>
      )}
      {!profileLoading && profile && (
        <div className="text-sm text-gray-700 mt-1">
          {userType === 'merchant' ? 'Merchant' : 'User'} since {getYearFromDate(profile?.createdAt)}
        </div>
      )}
    </div>
  );
};

export default ProfileSection;