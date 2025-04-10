 'use client'

import { Suspense } from 'react';
import SuccessPage from './component/SuccessPage';

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading reset...</div>}>
      <SuccessPage />
    </Suspense>
  );
}