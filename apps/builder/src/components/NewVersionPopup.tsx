import { useTypebot } from '@/features/editor/providers/TypebotProvider'
import { trpc } from '@/lib/trpc'
import {
  Button,
  DarkMode,
  Flex,
  HStack,
  SlideFade,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { PackageIcon } from './icons'

export const NewVersionPopup = () => {
  const { typebot, save } = useTypebot();

  const [isReloading, setIsReloading] = useState(false);
  const { data } = trpc.getAppVersionProcedure.useQuery();
  const [currentVersion, setCurrentVersion] = useState<string>();
  const [isNewVersionAvailable, setIsNewVersionAvailable] = useState(false);

  useEffect(() => {
    if (!data?.commitSha) {
      return
    }

    if (currentVersion === data.commitSha) {
      return
    }
    
    setCurrentVersion(data.commitSha);

    if (currentVersion === undefined) {
      return
    }

    setIsNewVersionAvailable(true);
  }, [data, currentVersion]);

  const saveAndReload = async () => {
    if (isReloading) {
      return
    }

    setIsReloading(true);

    if (save) {
      await save();
    }

    window.location.reload();
  }

  return (
    <DarkMode>
      <SlideFade
        in={isNewVersionAvailable}
        offsetY="20px"
        style={{
          position: 'fixed',
          bottom: '18px',
          left: '18px',
          zIndex: 42,
        }}
        unmountOnExit
      >
        <Stack
          bgColor="red.400"
          p="4"
          px="4"
          rounded="lg"
          shadow="lg"
          borderWidth="1px"
          borderColor="red.300"
          maxW="320px"
        >
          <HStack spacing={3}>
            <Stack spacing={4} color="white">
              <Stack spacing={1}>
                <HStack>
                  <PackageIcon />{' '}
                  <Text fontWeight="bold">Nova versão disponível!</Text>
                </HStack>

                <Text fontSize="sm" color="gray.100">
                  Uma versão melhorada do Ignai-bot está disponível. Por favor recarregue agora
                  para atualizar.
                </Text>
              </Stack>
              <Flex justifyContent="flex-end">
                <Button size="sm" onClick={saveAndReload}>
                  {typebot?.id ? 'Salvar e recarregar' : 'Recarregar'}
                </Button>
              </Flex>
            </Stack>
          </HStack>
        </Stack>
      </SlideFade>
    </DarkMode>
  );
}