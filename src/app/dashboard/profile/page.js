'use client'

import React, { useState, useEffect } from 'react'
import { getUserProfile, updateUserAvatar, deleteUser} from '@/api/profile/users/request'
import { getMerchantProfile, updateMerchantAvatar, updateMerchantAvailability, updateMerchantBusinessDetails, deleteMerchant } from '@/api/profile/merchants/requests'
import { useUserStore } from '@/store/userStore'
import ProfileHeader from '@/components/profile/ProfileHeader'
import ProfileSection from '@/components/profile/ProfileSection'
import AccountSettings from '@/components/profile/AccountSettings'
import EditServicesLocationForm from '@/components/profile/EditServicesLocationForm'
import PolicyModal from '@/components/profile/PolicyModal'
import { SERVICE_OPTIONS } from '@/components/open-requests/ServiceOptions'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'

const ProfilePage = () => {
  const [activeSetting, setActiveSetting] = useState(null);
  const [isAvailable, setIsAvailable] = useState(true);
  const { userType, profile, setProfile, setUserData, setUserType } = useUserStore();
  const { logout } = useAuthStore();
  const [profileLoading, setProfileLoading] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [servicesOffered, setServicesOffered] = useState([]);
  const [businessAddress, setBusinessAddress] = useState('');
  const [businessLocation, setBusinessLocation] = useState('');
  const [servicesLoading, setServicesLoading] = useState(false);
  const router = useRouter();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [deleteNameInput, setDeleteNameInput] = useState('');
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

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
        if (isMounted) {
          setProfile(data); // Update store
        }
      } catch {
        if (isMounted) {
          setProfile(null); // Clear store on error
        }
      } finally {
        if (isMounted) setProfileLoading(false);
      }
    };
    if (userType === 'merchant' || userType === 'user') {
      fetchProfile();
    }
    return () => {
      isMounted = false;
    };
  }, [userType, setProfile]);

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

      let updatedProfile;
      if (userType === 'merchant') {
        await updateMerchantAvatar(formData);
        updatedProfile = await getMerchantProfile();
      } else {
        await updateUserAvatar(formData);
        updatedProfile = await getUserProfile();
      }
      setProfile(updatedProfile); // Update store with new profile
    } catch (err) {
      console.error('Avatar upload failed:', err);
      // Optionally show error to user (e.g., toast notification)
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
        setProfile({ ...profile, isAvailable: newValue }); // Update store
      } catch (err) {
        setIsAvailable(!newValue); // Revert on error
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
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
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
      const updatedProfile = await getMerchantProfile();
      setProfile(updatedProfile); // Update store
      setActiveSetting(null);
    } catch (err) {
      console.error('Service update failed:', err);
      // Optionally show error to user
    } finally {
      setServicesLoading(false);
    }
  };

  // Delete account handler (for modal confirm)
  const handleDeleteAccount = async () => {
    setDeleteLoading(true);
    setDeleteError(null);
    try {
      if (userType === 'merchant') {
        await deleteMerchant({ name: profile?.name || '' });
      } else {
        await deleteUser({ name: profile?.name || '' });
      }
      setProfile(null); // Clear store on deletion
      router.push('/');
    } catch (err) {
      setDeleteError(err?.message || (typeof err === 'string' ? err : 'Failed to delete account.'));
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleLogout = () => {
    logout(); // Clear auth state
    setUserData(null);
    setProfile(null);
    router.replace("/"); // Navigate to home
  };

  return (
    <div className="min-h-screen p-6 md:pt-[80px] pt-[72px] pb-12 md:pb-0 md:max-w-4xl md:mx-auto">
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
            <>
              <AccountSettings
                userType={userType}
                isAvailable={isAvailable}
                onToggleAvailability={handleToggleAvailability}
                onEditServices={() => setActiveSetting('services')}
                onShowPrivacy={() => setActiveSetting('privacy')}
                onShowTerms={() => setActiveSetting('terms')}
                onShowDeleteAccount={() => setShowConfirmDelete(true)}
              />
              {deleteError && (
                <div className="text-red-600 mt-2 text-sm">{deleteError}</div>
              )}
            </>
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
  <PolicyModal title="Privacy Policy" onBack={handleBack}>
    <p className='text-sm'>
      Your privacy is important to us. We do not share your personal information with third parties except as necessary to provide our services or as required by law.
    </p>
    <p className="mt-2 text-sm">
      Please review our full privacy policy for more details about how your data is collected, used, and protected.
    </p>
  </PolicyModal>
)}
{activeSetting === 'terms' && (
  <PolicyModal title="Terms and Conditions" onBack={handleBack}>
    <p className="mt-2 text-sm">
      By using our platform, you agree to abide by all applicable rules and regulations.
    </p>
    <p className="mt-2 text-sm">
      Please review our full terms and conditions for more information about your rights and responsibilities.
    </p>
  </PolicyModal>
)}
          {/* Floating Confirm Delete Modal */}
          {showConfirmDelete && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="fixed inset-0 bg-black/40 bg-opacity-70"></div>
              <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4 p-8 z-10">
                <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
                <p className="mb-4 text-gray-700 text-sm">
                  Type your full name to confirm account deletion:
                </p>
                <input
                  type="text"
                  className="border border-gray-300 rounded outline-0 px-3 py-2 w-full mb-4"
                  placeholder="Enter your full name"
                  value={deleteNameInput}
                  onChange={e => setDeleteNameInput(e.target.value)}
                  disabled={deleteLoading}
                  autoFocus
                />
                <div className="flex gap-3 mt-5 justify-end">
                  <button
                    className=" text-gray-800 text-sm cursor-pointer"
                    onClick={() => {
                      setDeleteNameInput('');
                      setShowConfirmDelete(false);
                    }}
                    disabled={deleteLoading}
                  >
                    Cancel
                  </button>
                  <button
                    className=" text-red-500 disabled:opacity-60 text-sm cursor-pointer"
                    onClick={async () => {
                      await handleDeleteAccount();
                      setShowConfirmDelete(false);
                      setDeleteNameInput('');
                    }}
                    disabled={
                      deleteLoading ||
                      !profile?.name ||
                      deleteNameInput.trim() !== profile?.name
                    }
                  >
                    {deleteLoading ? "Deleting..." : "Delete"}
                  </button>
                </div>
                {deleteError && (
                  <div className="text-red-600 mt-2 text-sm">{deleteError}</div>
                )}
              </div>
            </div>
          )}
          <button onClick={handleLogout} className='w-full text-center mt-5 text-sm text-white bg-[#57132A] py-3 rounded-md cursor-pointer'>
            Log Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage