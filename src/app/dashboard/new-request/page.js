import React, { Suspense } from 'react';
import NewRequestPageContent from '@/components/new requests/NewRequestPageContent';
import Image from 'next/image';

const NewRequestPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="animate-pulse">
            <Image
              src="/images/logo-removebg-preview.png"
              alt="Company Logo"
              width={100}
              height={100}
              className="transition-all duration-1000 hover:scale-110"
            />
          </div>
        </div>
      }
    >
      <NewRequestPageContent />
    </Suspense>
  );
};

export default NewRequestPage;