import React from 'react'
import { Settings } from '@typebot.io/schemas'
import {
  FormLabel,
  Popover,
  PopoverTrigger,
  Stack,
  Image,
  PopoverContent,
  HStack,
  Text,
} from '@chakra-ui/react'
import { CodeEditor } from '@/components/inputs/CodeEditor'
import { ImageUploadContent } from '@/components/ImageUploadContent'
import { MoreInfoTooltip } from '@/components/MoreInfoTooltip'
import { TextInput, Textarea } from '@/components/inputs'
import { env } from '@typebot.io/env'
import { defaultSettings } from '@typebot.io/schemas/features/typebot/settings/constants'

type Props = {
  workspaceId: string
  typebotId: string
  typebotName: string
  metadata: Settings['metadata']
  onMetadataChange: (metadata: Settings['metadata']) => void
}

export const MetadataForm = ({
  workspaceId,
  typebotId,
  typebotName,
  metadata,
  onMetadataChange,
}: Props) => {
  const handleTitleChange = (title: string) => onMetadataChange({ ...metadata, title })
  const handleDescriptionChange = (description: string) => onMetadataChange({ ...metadata, description });
  const handleFavIconSubmit = (favIconUrl: string) => onMetadataChange({ ...metadata, favIconUrl });
  const handleImageSubmit = (imageUrl: string) => onMetadataChange({ ...metadata, imageUrl });
  const handleGoogleTagManagerIdChange = (googleTagManagerId: string) => onMetadataChange({ ...metadata, googleTagManagerId });
  const handleHeadCodeChange = (customHeadCode: string) => onMetadataChange({ ...metadata, customHeadCode });

  const favIconUrl = metadata?.favIconUrl ?? defaultSettings.metadata.favIconUrl(env.NEXT_PUBLIC_VIEWER_URL[0]);
  const imageUrl = metadata?.imageUrl ?? defaultSettings.metadata.imageUrl(env.NEXT_PUBLIC_VIEWER_URL[0]);

  return (
    <Stack spacing="6">
      <Stack>
        <FormLabel mb="0" htmlFor="icon">
          Icone:
        </FormLabel>
        <Popover isLazy placement="top">
          <PopoverTrigger>
            <Image
              src={favIconUrl}
              w="20px"
              alt="Fav icon"
              cursor="pointer"
              _hover={{ filter: 'brightness(.9)' }}
              transition="filter 200ms"
              rounded="md"
            />
          </PopoverTrigger>
          <PopoverContent p="4" w="400px">
            <ImageUploadContent
              uploadFileProps={{
                workspaceId,
                typebotId,
                fileName: 'favIcon',
              }}
              defaultUrl={favIconUrl}
              onSubmit={handleFavIconSubmit}
              excludedTabs={['giphy', 'unsplash', 'emoji']}
              imageSize="thumb"
            />
          </PopoverContent>
        </Popover>
      </Stack>
      <Stack>
        <FormLabel mb="0" htmlFor="image">
          Imagem:
        </FormLabel>
        <Popover isLazy placement="top">
          <PopoverTrigger>
            <Image
              src={imageUrl}
              alt="Website image"
              cursor="pointer"
              _hover={{ filter: 'brightness(.9)' }}
              transition="filter 200ms"
              rounded="md"
            />
          </PopoverTrigger>
          <PopoverContent p="4" w="500px">
            <ImageUploadContent
              uploadFileProps={{
                workspaceId,
                typebotId,
                fileName: 'ogImage',
              }}
              defaultUrl={imageUrl}
              onSubmit={handleImageSubmit}
              excludedTabs={['giphy', 'icon', 'emoji']}
            />
          </PopoverContent>
        </Popover>
      </Stack>
      <TextInput
        label="Titulo:"
        defaultValue={metadata?.title ?? typebotName}
        onChange={handleTitleChange}
      />
      <Textarea
        defaultValue={
          metadata?.description ?? defaultSettings.metadata.description
        }
        onChange={handleDescriptionChange}
        label="Descrição:"
      />
      <TextInput
        defaultValue={metadata?.googleTagManagerId}
        placeholder="GTM-XXXXXX"
        onChange={handleGoogleTagManagerIdChange}
        label="Google Tag Manager ID:"
        moreInfoTooltip="Não o inclua se estiver incorporando seu Ignai-bot em um website existente. Em vez disso o GTM deve ser instalado no parent website."
      />
      <Stack>
        <HStack as={FormLabel} mb="0" htmlFor="head">
          <Text>Head Code customizado:</Text>
          <MoreInfoTooltip>
            Será colado na parte inferior da seção do cabeçalho (header), logo acima do
            fechando a head tag. Somente tags `meta` e `script` são permitidas.
          </MoreInfoTooltip>
        </HStack>
        <CodeEditor
          id="head"
          defaultValue={metadata?.customHeadCode}
          onChange={handleHeadCodeChange}
          lang="html"
          withVariableButton={false}
        />
      </Stack>
    </Stack>
  );
}