import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Heading, VStack, Text } from '@chakra-ui/react';
import { AlertIcon } from '@/components/icons';
import { BillingPortalButton } from '@/features/billing/components/BillingPortalButton';
import { DashboardHeader } from '@/features/dashboard/components/DashboardHeader';
import { useWorkspace } from '@/features/workspace/WorkspaceProvider';

export default function Page() {
  const { replace } = useRouter();
  const { workspace } = useWorkspace();

  useEffect(() => {
    if (!workspace || workspace.isPastDue) {
      return
    }

    replace('/bots');
  }, [replace, workspace]);

  return (
    <>
      <DashboardHeader />
      <VStack
        w="full"
        h="calc(100vh - 64px)"
        justifyContent="center"
        spacing={4}
      >
        <AlertIcon width="40px" />
        <Heading fontSize="2xl">Seu workspace possui fatura(s) não pagas.</Heading>
        <Text>Vá ao portal para regularizar o pagamento.</Text>
        {workspace?.id && (
          <BillingPortalButton workspaceId={workspace?.id} colorScheme="red" />
        )}
      </VStack>
    </>
  );
}