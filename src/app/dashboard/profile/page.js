'use client'

import React, { useState, useEffect } from 'react'
import { ChevronRight, User, Plus } from 'lucide-react'
import Image from 'next/image'
import { getUserProfile, updateUserAvatar } from '@/api/profile/users/request'
import { getMerchantProfile, updateMerchantAvatar, updateMerchantAvailability, updateMerchantBusinessDetails } from '@/api/profile/merchants/requests'
import { useUserStore } from '@/store/userStore'

const ProfilePage = () => {
  const [activeSetting, setActiveSetting] = useState(null);
  const [isAvailable, setIsAvailable] = useState(true);
  const { userType } = useUserStore();
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);

  const [servicesOffered, setServicesOffered] = useState([]);
  const [businessAddress, setBusinessAddress] = useState('');
  const [businessLocation, setBusinessLocation] = useState('');
  const [servicesLoading, setServicesLoading] = useState(false);

  const handleBack = () => setActiveSetting(null);

  const SERVICE_OPTIONS = [
    { label: 'Car Hire', value: 'car-hire' },
    { label: 'Cleaning', value: 'cleaning' },
    { label: 'Real Estate', value: 'real-estate' },
    { label: 'Car Parts', value: 'car-parts' },
    { label: 'Automobile', value: 'automobile' },
  ];

  useEffect(() => {
          let isMounted = true;
          const fetchProfile = async () => {
              setProfileLoading(true);
              try {
                  let data = null;
                  if (userType === 'merchant') {
                      data = await getMerchantProfile();
                  } else if (userType === 'user') {
                      data = await getUserProfile();
                  }
                  if (isMounted) setProfile(data);
              } catch {
                  if (isMounted) setProfile(null);
              } finally {
                  if (isMounted) setProfileLoading(false);
              }
          };
          if (userType === 'merchant' || userType === 'user') {
              fetchProfile();
          }
          return () => { isMounted = false; };
    }, [userType]);

    useEffect(() => {
      // Set isAvailable from profile if merchant
      if (profile && userType === 'merchant' && typeof profile.isAvailable === 'boolean') {
        setIsAvailable(profile.isAvailable);
      }
    }, [profile, userType]);

    // Avatar upload handler
    const handleAvatarChange = async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setAvatarUploading(true);
      try {
        const formData = new FormData();
        formData.append('avatar', file);

        if (userType === 'merchant') {
          await updateMerchantAvatar(formData);
          setProfile(await getMerchantProfile());
        } else {
          await updateUserAvatar(formData);
          setProfile(await getUserProfile());
        }
      } catch (err) {
        // handle error
      } finally {
        setAvatarUploading(false);
      }
    };

    // Availability toggle handler (merchants only)
    const handleToggleAvailability = async () => {
      const newValue = !isAvailable;
      setIsAvailable(newValue);
      if (userType === 'merchant') {
        try {
          await updateMerchantAvailability(newValue);
        } catch (err) {
          // revert on error
          setIsAvailable(!newValue);
        }
      }
    };

  // Helper for avatar rendering with plus icon and upload
  const renderAvatar = () => {
    return (
      <div className="relative w-20 h-20 rounded-full mx-auto overflow-hidden mb-2 flex-shrink-0 bg-gray-100 flex items-center justify-center group cursor-pointer">
        <label className="w-full h-full flex items-center justify-center cursor-pointer">
          {profileLoading ? (
            <div className="animate-pulse w-20 h-20 rounded-full bg-gray-200" />
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
            onChange={handleAvatarChange}
            disabled={avatarUploading}
          />
          {/* Plus icon overlay */}
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
    );
  };
    
        // Helper for name rendering
        const renderName = () => {
            if (profileLoading) {
                return <div className="h-4 w-24 bg-gray-200 mx-auto rounded animate-pulse mb-2" />;
            }
            if (profile?.name) {
                return <p className='font-medium text-gray-900 text-base'>{profile.name}</p>;
            }
            return <p className='font-medium text-gray-900 text-base'>User</p>;
        };

  // Pre-fill form when opening Edit Services & Location
  useEffect(() => {
    if (activeSetting === 'services' && profile && userType === 'merchant') {
      setServicesOffered(profile.servicesOffered || []);
      setBusinessAddress(profile.businessAddress || '');
      setBusinessLocation(profile.businessLocation || '');
    }
  }, [activeSetting, profile, userType]);

  // Handle checkbox change
  const handleServiceChange = (value) => {
    setServicesOffered((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  // Handle form submit
  const handleServicesSubmit = async (e) => {
    e.preventDefault();
    setServicesLoading(true);
    try {
      await updateMerchantBusinessDetails({
        servicesOffered,
        businessAddress,
        businessLocation,
      });
      // Optionally refresh profile
      setProfile(await getMerchantProfile());
      setActiveSetting(null);
    } catch (err) {
      // handle error
    } finally {
      setServicesLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 md:max-w-4xl md:mx-auto">
      <div className="">
        {/* Header */}
        <div className="px-8 py-6  ">
          <h1 className="text-2xl font-bold text-center text-gray-900">Profile</h1>
        </div>

        {/* Profile Section */}
        <div className="px-8 py-8 text-center ">
          {renderAvatar()}
          <h2 className="text-xl font-semibold text-gray-900 mb-1">{renderName()}</h2>
          <p className="text-gray-500 text-sm">Member since 2021</p>
        </div>

        {/* Account Settings */}
        <div className="px-0 md:px-8 py-6">
          {!activeSetting && (
          <>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Settings</h3>
            <div className="space-y-4">
              {/* Availability Toggle (merchants only) */}
              {userType === 'merchant' && (
                <div className="w-full flex items-center justify-between py-4 px-0">
                  <span className="text-gray-700 font-medium">Availability</span>
                  <button
                    onClick={handleToggleAvailability}
                    className={`relative inline-flex h-6 cursor-pointer w-11 items-center rounded-full transition-colors focus:outline-none ${isAvailable ? 'bg-green-500' : 'bg-gray-300'}`}
                    aria-pressed={isAvailable}
                    type="button"
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${isAvailable ? 'translate-x-5' : 'translate-x-1'}`}
                    />
                  </button>
                </div>
              )}

              {/* Edit Services & Location (merchants only) */}
              {userType === 'merchant' && (
                <button
                  className="w-full flex items-center cursor-pointer justify-between py-4 px-0 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                  onClick={() => setActiveSetting('services')}
                >
                  <span className="text-gray-700 font-medium">Edit Services & Location</span>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                </button>
              )}

              {/* Privacy Policy */}
              <button
                className="w-full flex items-center cursor-pointer justify-between py-4 px-0 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                onClick={() => setActiveSetting('privacy')}
              >
                <span className="text-gray-700 font-medium">Privacy Policy</span>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
              </button>

              {/* Terms and conditions */}
              <button
                className="w-full flex items-center cursor-pointer justify-between py-4 px-0 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                onClick={() => setActiveSetting('terms')}
              >
                <span className="text-gray-700 font-medium">Terms and conditions</span>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
              </button>
            </div>
          </>
        )}

        {/* Edit Services & Location UI (merchants only) */}
        {activeSetting === 'services' && userType === 'merchant' && (
          <form onSubmit={handleServicesSubmit}>
            <h3 className="text-lg font-semibold mb-4">Services Offered</h3>
            <div className='space-y-2 mb-6'>
              {SERVICE_OPTIONS.map(({ label, value }) => (
                <div key={value} className="flex items-center">
                  <input
                    type='checkbox'
                    checked={servicesOffered.includes(value)}
                    onChange={() => handleServiceChange(value)}
                    className="w-4 h-4 text-[#541229] border-gray-300 rounded focus:ring-[#541229]"
                  />
                  <span className="ml-2 text-sm text-gray-700">{label}</span>
                </div>
              ))}
            </div>
            <div className='flex flex-col gap-7'>
              <div className='space-y-2 flex flex-col'>
                <label className='text-sm'>Business Address</label>
                <input
                  type="text"
                  value={businessAddress}
                  onChange={e => setBusinessAddress(e.target.value)}
                  placeholder="Enter your business address"
                  className="bg-[#DBD0C833] px-2 py-4 rounded-md outline-0 placeholder:text-sm"
                />
              </div>
              <div className='space-y-2 flex flex-col'>
                <label className='text-sm'>Business Location (e.g., Ikeja Axis)</label>
                <input
                  type="text"
                  value={businessLocation}
                  onChange={e => setBusinessLocation(e.target.value)}
                  placeholder="Specify your business location"
                  className=" bg-[#DBD0C833] px-2 py-4 rounded-md outline-0 placeholder:text-sm"
                />
              </div>
            </div>
            <div className='flex items-center mt-4 justify-between'>
              <button type="button" onClick={handleBack} className='bg-[#F0F2F5] px-4 py-2 rounded text-sm cursor-pointer'>Cancel</button>
              <button
                type='submit'
                className="bg-blue-600 text-white px-4 py-2 rounded text-sm cursor-pointer"
                disabled={servicesLoading}
              >
                {servicesLoading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        )}

        {/* Privacy Policy UI */}
        {activeSetting === 'privacy' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Privacy Policy</h3>
            <div className="text-sm text-gray-700 max-h-72 overflow-y-auto mb-4">
              {/* Replace with your actual privacy policy content */}
              <p>
                Your privacy is important to us. We do not share your personal information with third parties except as necessary to provide our services or as required by law.
              </p>
              <p className="mt-2">
                Please review our full privacy policy for more details about how your data is collected, used, and protected.
              </p>
            </div>
            <div className='flex items-center justify-end'>
              <button onClick={handleBack} className='bg-[#F0F2F5] px-4 py-2 rounded text-sm cursor-pointer'>Back</button>
            </div>
          </div>
        )}

        {/* Terms and Conditions UI */}
        {activeSetting === 'terms' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Terms and Conditions</h3>
            <div className=" text-sm text-gray-700 max-h-72 overflow-y-auto mb-4">
              {/* Replace with your actual terms and conditions content */}
              <p>
                By using our platform, you agree to abide by all applicable rules and regulations.
              </p>
              <p className="mt-2">
                Please review our full terms and conditions for more information about your rights and responsibilities.
              </p>
            </div>
            <div className='flex items-center justify-end'>
              <button onClick={handleBack} className='bg-[#F0F2F5] px-4 py-2 rounded text-sm cursor-pointer'>Back</button>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage