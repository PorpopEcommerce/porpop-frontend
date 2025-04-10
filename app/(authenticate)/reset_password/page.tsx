'use client'

import { Suspense } from 'react';
import ResetPassword from './component/ResetPassword';

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading reset...</div>}>
      <ResetPassword />
    </Suspense>
  );
}