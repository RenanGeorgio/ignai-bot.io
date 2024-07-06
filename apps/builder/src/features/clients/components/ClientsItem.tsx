import {
  Avatar,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Tag,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'
import { useTranslate } from '@tolgee/react'

type Props = {
  image?: string
  name?: string
  email: string
  isGuest?: boolean
  onDeleteClick: () => void
  onClick?: () => void
  isSelected?: boolean
}

export const ClientsItem = ({
  email,
  name,
  image,
  isGuest = false,
  onDeleteClick,
  onClick,
  isSelected = false,
}: Props) => {
  const { t } = useTranslate()

  return (
    <Menu placement="bottom-end" isLazy>
      <MenuButton
        _hover={{
          bg: useColorModeValue('gray.100', 'red.700'),
        }}
        bg={isSelected ? "rgba(255, 235, 235, 0.8)" : "rgba(255, 250, 250, 0.6)" }
        color=""
        boxShadow="md"
        borderRadius="md"
        onClick={onClick}
      >
        <ClientIdentityContent
          email={email}
          name={name}
          image={image}
          isGuest={isGuest}
          tag={"L"}
        />
      </MenuButton>
      <MenuList shadow="lg">
        <MenuItem>
          L
        </MenuItem>
        <MenuItem>
          L
        </MenuItem>
        <MenuItem>
          L
        </MenuItem>
        <MenuItem color="red.500" onClick={onDeleteClick}>
          {t('remove')}
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export const ClientIdentityContent = ({
  name,
  tag,
  isGuest = false,
  image,
  email,
}: {
  name?: string
  tag?: string
  image?: string
  isGuest?: boolean
  email: string
}) => {
  const { t } = useTranslate()

  return (
    <HStack justifyContent="space-between" maxW="full" p="2">
      <HStack minW={0} spacing="4">
        <Avatar name={name} src={image} size="sm" />
        <Stack spacing={0} minW="0">
          {name && (
            <Text textAlign="left" fontSize="15px">
              {name}
            </Text>
          )}
          <Text
            color="gray.500"
            fontSize={name ? '14px' : 'inherit'}
            noOfLines={1}
          >
            {email}
          </Text>
        </Stack>
      </HStack>
      <HStack flexShrink={0}>
        {isGuest && (
          <Tag color="gray.400" data-testid="tag">
            {t('pending')}
          </Tag>
        )}
        <Tag data-testid="tag">{tag}</Tag>
      </HStack>
    </HStack>
  )
}