'use client'

import * as React from 'react';
import { Flex, Heading, HStack, useColorModeValue as mode, Link } from '@chakra-ui/react';
import { IgnaiIcon } from '@/components/icons';

export const Header = () => {
  return (
    <Flex pos="relative" zIndex={10} w="full">
      <HStack
        as="header"
        aria-label="Main navigation"
        maxW="7xl"
        w="full"
        mx="auto"
        px={{ base: '6', md: '8' }}
        py="4"
        justify="space-between"
      >
        <Flex
          align="center"
          justify="space-between"
          className="nav-content__mobile"
          color={mode('red', 'white')}
        >
          <HStack as={Link} href="/" rel="home" ml="2">
            <IgnaiIcon boxSize="35px" />
            <Heading as="p" fontSize="lg">
              Ignai-bot
            </Heading>
          </HStack>
        </Flex>
      </HStack>
    </Flex>
  );
}