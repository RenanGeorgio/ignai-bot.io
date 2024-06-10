import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Heading, Text, VStack } from '@chakra-ui/react';
import { TextLink } from '@/components/TextLink';
import { DashboardHeader } from '@/features/dashboard/components/DashboardHeader';
import { useWorkspace } from '@/features/workspace/WorkspaceProvider';
import { env } from '@typebot.io/env';

export default function Page() {
  const { replace } = useRouter();
  const { workspace } = useWorkspace();

  useEffect(() => {
    if (!workspace || workspace.isSuspended) {
      return
    }

    replace('/typebots');
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
        <Heading>Seu workspace foi suspenso.</Heading>
        <Text>
          Nos detectamos que um dos seus bots não esta seguindo uma de nossa politicas{' '}
          <TextLink
            href={`${env.NEXTAUTH_URL}/terms-of-service#scam-typebots`}
            isExternal
          >
            Termos de Uso
          </TextLink>
        </Text>
      </VStack>
    </>
  );
}