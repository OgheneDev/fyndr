'use client';
import { Suspense } from 'react';
import { Loader } from '@/components/ui/Loader';
import LoginMethod from '@/components/login/LoginMethod';

export default function RegisterMethodPage() {
  return (
    <Suspense fallback={<Loader />}>
      <LoginMethod />
    </Suspense>
  );
}