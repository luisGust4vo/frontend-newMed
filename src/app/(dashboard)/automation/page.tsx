'use client';

import { ProtectedShell } from '@/components/layout/ProtectedShell';
import { AutomationCenter } from '@/components/AutomationCenter';

export default function AutomationPage() {
  return (
    <ProtectedShell>
      <AutomationCenter />
    </ProtectedShell>
  );
}