import React from 'react'
import { ChevronRight } from 'lucide-react'

const AccountSettings = ({
  userType,
  isAvailable,
  onToggleAvailability,
  onEditServices,
  onShowPrivacy,
  onShowTerms,
  onShowDeleteAccount
}) => (
  <>
    <h3 className="text-sm font-semibold text-gray-900 mb-6">Account Settings</h3>
    <div className="space-y-4">
      {userType === 'merchant' && (
        <div className="w-full flex items-center justify-between py-4 px-3">
          <span className="text-gray-900 text-sm">Availability</span>
          <button
            onClick={onToggleAvailability}
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
      {userType === 'merchant' && (
        <button
          className="w-full flex items-center cursor-pointer justify-between py-4 px-3 text-left hover:bg-gray-50 rounded-lg transition-colors group"
          onClick={onEditServices}
        >
          <span className="text-sm text-gray-700">Edit Services & Location</span>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
        </button>
      )}
      <button
        className="w-full flex items-center cursor-pointer justify-between py-4 px-3 text-left hover:bg-gray-50 rounded-lg transition-colors group"
        onClick={onShowPrivacy}
      >
        <span className="text-sm text-gray-700">Privacy Policy</span>
        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
      </button>
      <button
        className="w-full flex items-center cursor-pointer justify-between py-4 px-3 text-left hover:bg-gray-50 rounded-lg transition-colors group"
        onClick={onShowTerms}
      >
        <span className="text-sm text-gray-700">Terms and conditions</span>
        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
      </button>
      <button
        className="w-full flex items-center cursor-pointer justify-between py-4 px-3 text-left hover:bg-gray-50 rounded-lg transition-colors group"
        onClick={onShowDeleteAccount}
        type="button"
      >
        <span className="text-sm text-gray-700">Delete Account</span>
        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
      </button>
    </div>
  </>
)

export default AccountSettings