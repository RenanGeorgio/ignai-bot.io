import React, { useState, useEffect } from 'react';
import { Seo } from '@/components/Seo';
import { Stack, VStack, Spinner, Text, Flex } from '@chakra-ui/react';
import CustomSideBar from '@/components/SideBar';
import { DashboardHeader } from '@/features/dashboard/components/DashboardHeader';
import { ClientsList } from './ClientsList';
import { useTranslate } from '@tolgee/react'

export const ClientsPage = () => {
  const { t } = useTranslate();

  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    setIsLoading(true);
  }, []);

  return (
    <Stack minH="100vh">
      <Seo title={"Clientes"} />
      <DashboardHeader />
      <>
        {isLoading ? (
          <VStack w="full" justifyContent="center" pt="10" spacing={6}>
            <Text>{t('dashboard.redirectionMessage')}</Text>
            <Spinner />
          </VStack>
        ) : (
          <Flex w="100%">
            <CustomSideBar />
            <ClientsList />
          </Flex>
        )}
      </>
    </Stack>
  );
}