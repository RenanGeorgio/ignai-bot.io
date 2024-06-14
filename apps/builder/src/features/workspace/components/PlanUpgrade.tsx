import React from 'react';
import { Stack } from '@chakra-ui/react';
import { useTranslate } from '@tolgee/react';
import { UnlockPlanAlertInfo } from '@/components/UnlockPlanAlertInfo';

export const PlanUpgrade = () => {
  const { t } = useTranslate();

  return (
    <Stack w="full" spacing={3}>
      <UnlockPlanAlertInfo>
        {t('workspace.membersList.unlockBanner.label')}
      </UnlockPlanAlertInfo>
    </Stack>
  );
}