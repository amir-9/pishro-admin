// @/providers/index.tsx
'use client';

import { type ReactNode } from 'react';
import ReactQueryProvider from './react-query-provider';
import { AuthProvider } from '@/contexts/auth-context';
import { Toaster } from 'sonner';

/**
 * Combined Providers
 * Combines all application providers in the correct order
 */

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ReactQueryProvider>
      <AuthProvider>
        {children}
        <Toaster position="top-center" richColors />
      </AuthProvider>
    </ReactQueryProvider>
  );
}
