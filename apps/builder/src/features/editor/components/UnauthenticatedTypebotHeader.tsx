import React from 'react';
import { useRouter } from 'next/router';
import { Flex, HStack, Button, useColorModeValue, Divider, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { CopyIcon, PlayIcon } from '@/components/icons';
import { isNotDefined } from '@typebot.io/lib';
import { headerHeight } from '../constants';
import { RightPanel, useEditor } from '../providers/EditorProvider';
import { useTypebot } from '../providers/TypebotProvider';
import { useTranslate } from '@tolgee/react';
import { TypebotLogo } from '@/components/TypebotLogo';
import { EmojiOrImageIcon } from '@/components/EmojiOrImageIcon';
import { useUser } from '@/features/account/hooks/useUser';

export const GuestTypebotHeader = () => {
  const { t } = useTranslate();

  const router = useRouter();
  const { user } = useUser();
  const { typebot, save } = useTypebot();

  const {
    setRightPanel,
    rightPanel,
    setStartPreviewAtGroup,
    setStartPreviewAtEvent,
  } = useEditor();

  const handlePreviewClick = async () => {
    setStartPreviewAtGroup(undefined);
    setStartPreviewAtEvent(undefined);

    save().then();

    setRightPanel(RightPanel.PREVIEW);
  }

  return (
    <Flex
      w="full"
      borderBottomWidth="1px"
      justify="center"
      align="center"
      h={`${headerHeight}px`}
      zIndex={100}
      pos="relative"
      bgColor={useColorModeValue('white', 'gray.900')}
      flexShrink={0}
    >
      <HStack
        display={['none', 'flex']}
        pos={{ base: 'absolute', xl: 'static' }}
        right={{ base: 280, xl: 0 }}
      >
        <Button
          as={Link}
          href={`/typebots/${typebot?.id}/edit`}
          colorScheme={router.pathname.includes('/edit') ? 'red' : 'gray'}
          variant={router.pathname.includes('/edit') ? 'outline' : 'ghost'}
          size="sm"
        >
          {t('editor.header.flowButton.label')}
        </Button>
        <Button
          as={Link}
          href={`/typebots/${typebot?.id}/theme`}
          colorScheme={router.pathname.endsWith('theme') ? 'red' : 'gray'}
          variant={router.pathname.endsWith('theme') ? 'outline' : 'ghost'}
          size="sm"
        >
          {t('editor.header.themeButton.label')}
        </Button>
        <Button
          as={Link}
          href={`/typebots/${typebot?.id}/settings`}
          colorScheme={router.pathname.endsWith('settings') ? 'red' : 'gray'}
          variant={router.pathname.endsWith('settings') ? 'outline' : 'ghost'}
          size="sm"
        >
          {t('editor.header.settingsButton.label')}
        </Button>
      </HStack>
      <HStack
        pos="absolute"
        left="1rem"
        justify="center"
        align="center"
        spacing="6"
      >
        <HStack alignItems="center" spacing={3}>
          {typebot && (
            <EmojiOrImageIcon icon={typebot.icon} emojiFontSize="2xl" />
          )}
          <Text
            noOfLines={2}
            maxW="150px"
            overflow="hidden"
            fontSize="14px"
            minW="30px"
            minH="20px"
          >
            {typebot?.name}
          </Text>
        </HStack>
      </HStack>
      <HStack
        right="1rem"
        pos="absolute"
        display={['none', 'flex']}
        spacing={4}
      >
        <HStack>
          {typebot?.id && (
            <Button
              as={Link}
              href={
                !user
                  ? {
                      pathname: `/register`,
                      query: {
                        redirectPath: `/typebots/${typebot.id}/duplicate`,
                      },
                    }
                  : `/typebots/${typebot.id}/duplicate`
              }
              leftIcon={<CopyIcon />}
              isLoading={isNotDefined(typebot)}
              size="sm"
            >
              Duplicar
            </Button>
          )}
          {router.pathname.includes('/edit') && isNotDefined(rightPanel) && (
            <Button
              colorScheme="red"
              onClick={handlePreviewClick}
              isLoading={isNotDefined(typebot)}
              leftIcon={<PlayIcon />}
              size="sm"
            >
              Executar bot
            </Button>
          )}
        </HStack>
        {!user && (
          <>
            <Divider orientation="vertical" h="25px" borderColor="gray.400" />
            <Button
              as={Link}
              href={`/register`}
              leftIcon={<TypebotLogo width="20px" />}
              variant="outline"
              size="sm"
            >
              Experimente Ignai-bot
            </Button>
          </>
        )}
      </HStack>
    </Flex>
  );
}