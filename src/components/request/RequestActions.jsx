'use client';

import React from 'react';
import { useUserStore } from '@/store/userStore';

const RequestActions = ({
  onCancel,
  onClose,
  cancelLoading,
  closeLoading,
  actionError
}) => {
  const userType = useUserStore((state) => state.userType);

  // Only render for users, not merchants
  if (userType === 'merchant') {
    return null;
  }

  return (
    <div className="flex gap-3 mt-6">
      <button
        className="bg-red-600 text-white px-4 py-2 cursor-pointer rounded disabled:opacity-60"
        onClick={onCancel}
        disabled={cancelLoading}
      >
        {cancelLoading ? 'Cancelling...' : 'Cancel Request'}
      </button>
      <button
        className="bg-gray-700 text-white px-4 py-2 cursor-pointer rounded disabled:opacity-60"
        onClick={onClose}
        disabled={closeLoading}
      >
        {closeLoading ? 'Closing...' : 'Close Request'}
      </button>
      {actionError && (
        <div className="text-red-600 mt-2 text-sm">{actionError}</div>
      )}
    </div>
  );
};

export default RequestActions;