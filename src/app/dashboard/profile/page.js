'use client'

import React, { useState, useEffect } from 'react'
import { getUserProfile, updateUserAvatar } from '@/api/profile/users/request'
import { getMerchantProfile, updateMerchantAvatar, updateMerchantAvailability, updateMerchantBusinessDetails } from '@/api/profile/merchants/requests'
import { useUserStore } from '@/store/userStore'
import ProfileHeader from '@/components/profile/ProfileHeader'
import ProfileSection from '@/components/profile/ProfileSection'
import AccountSettings from '@/components/profile/AccountSettings'
import EditServicesLocationForm from '@/components/profile/EditServicesLocationForm'
import PolicyModal from '@/components/profile/PolicyModal'
import { SERVICE_OPTIONS } from '@/components/open-requests/ServiceOptions'

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
    if (profile && userType === 'merchant' && typeof profile.isAvailable === 'boolean') {
      setIsAvailable(profile.isAvailable);
    }
  }, [profile, userType]);

  // Avatar upload handler
  const handleAvatarChange = async (file) => {
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
        setIsAvailable(!newValue);
      }
    }
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
      setProfile(await getMerchantProfile());
      setActiveSetting(null);
    } catch (err) {
      // handle error
    } finally {
      setServicesLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 pb-12 md:pb-0 md:max-w-4xl md:mx-auto">
      <div>
        <ProfileHeader />
        <ProfileSection
          profile={profile}
          profileLoading={profileLoading}
          avatarUploading={avatarUploading}
          onAvatarChange={handleAvatarChange}
        />
        <div className="px-0 md:px-8 py-6">
          {!activeSetting && (
            <AccountSettings
              userType={userType}
              isAvailable={isAvailable}
              onToggleAvailability={handleToggleAvailability}
              onEditServices={() => setActiveSetting('services')}
              onShowPrivacy={() => setActiveSetting('privacy')}
              onShowTerms={() => setActiveSetting('terms')}
            />
          )}
          {activeSetting === 'services' && userType === 'merchant' && (
            <EditServicesLocationForm
              servicesOffered={servicesOffered}
              setServicesOffered={setServicesOffered}
              businessAddress={businessAddress}
              setBusinessAddress={setBusinessAddress}
              businessLocation={businessLocation}
              setBusinessLocation={setBusinessLocation}
              servicesLoading={servicesLoading}
              onServiceChange={handleServiceChange}
              onSubmit={handleServicesSubmit}
              onCancel={handleBack}
              SERVICE_OPTIONS={SERVICE_OPTIONS}
            />
          )}
          {activeSetting === 'privacy' && (
            <PolicyModal
              title="Privacy Policy"
              onBack={handleBack}
              children={
                <>
                  <p>
                    Your privacy is important to us. We do not share your personal information with third parties except as necessary to provide our services or as required by law.
                  </p>
                  <p className="mt-2">
                    Please review our full privacy policy for more details about how your data is collected, used, and protected.
                  </p>
                </>
              }
            />
          )}
          {activeSetting === 'terms' && (
            <PolicyModal
              title="Terms and Conditions"
              onBack={handleBack}
              children={
                <>
                  <p>
                    By using our platform, you agree to abide by all applicable rules and regulations.
                  </p>
                  <p className="mt-2">
                    Please review our full terms and conditions for more information about your rights and responsibilities.
                  </p>
                </>
              }
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage