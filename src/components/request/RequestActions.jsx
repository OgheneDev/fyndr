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
    <div className="flex gap-5 mt-6">
      <button
        className="bg-[#57132A] text-[12px] text-white px-5 py-3 cursor-pointer rounded-md disabled:opacity-60"
        onClick={onCancel}
        disabled={cancelLoading}
      >
        {cancelLoading ? 'Cancelling...' : 'Cancel Request'}
      </button>
      <button
        className="bg-[#57132A] text-[12px] text-white px-5 py-3 cursor-pointer rounded-md disabled:opacity-60"
        onClick={onClose}
        disabled={closeLoading}
      >
        {closeLoading ? 'Closing...' : 'Mark as Completed'}
      </button>
      {actionError && (
        <div className="text-red-600 mt-2 text-sm">{actionError}</div>
      )}
    </div>
  );
};

export default RequestActions;