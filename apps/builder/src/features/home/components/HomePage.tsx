import { Seo } from '@/components/Seo'
import { DashboardHeader } from '@/features/dashboard/components/DashboardHeader'
import { Stack, Flex } from '@chakra-ui/react'
import { MapComponent } from './Map'
import CustomSideBar from '@/components/SideBar'

export const HomePage = () => {

  return (
    <Stack minH="100vh">
      <Seo title={"Home"} />
      <DashboardHeader />
      <Flex w="100%">
        <CustomSideBar />
        <MapComponent />
      </Flex>
    </Stack>
  );
}