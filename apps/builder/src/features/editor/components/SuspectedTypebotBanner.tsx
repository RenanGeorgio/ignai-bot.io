import { TextLink } from '@/components/TextLink';
import { useUser } from '@/features/account/hooks/useUser';
import { useWorkspace } from '@/features/workspace/WorkspaceProvider';
import { HStack, Text } from '@chakra-ui/react';
import { Plan } from '@typebot.io/prisma';

type Props = {
  typebotId: string
}

export const SuspectedTypebotBanner = ({ typebotId }: Props) => {
  const { user } = useUser();
  const { workspace } = useWorkspace();

  if (!user?.email || !workspace) {
    return null
  }

  return (
    <HStack
      bgColor="red.500"
      w="full"
      zIndex={1000}
      color="white"
      justifyContent="center"
      fontSize="sm"
      textAlign="center"
      py="2"
    >
      <Text fontWeight="bold">
        Nosso sistema anti-scam sinalizou seu ignaibot. Atualmente está sendo
        revisado manualmente.
        {workspace?.plan !== Plan.FREE ? (
          <>
            <br />
            Se você acha que isso é um erro,{' '}
            <TextLink
              href={`https://ignaibot.com/claim-non-scam?Email=${encodeURIComponent(
                user.email
              )}&typebotId=${typebotId}`}
            >
              Entre em contato conosco
            </TextLink>
            .
          </>
        ) : null}
      </Text>
    </HStack>
  );
}