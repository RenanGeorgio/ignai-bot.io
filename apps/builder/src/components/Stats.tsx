import React from 'react';
import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  IconProps
} from '@chakra-ui/react';
//import { FileIcon, MapIcon, UsersIcon } from './icons';

interface StatsCardProps {
  title: string
  stat: string
  icon?: (prop: IconProps) => JSX.Element
}

const StatsCard = (props: StatsCardProps) => {
  const { title, stat } = props;

  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded={'lg'}>
      <Flex justifyContent={'space-between'}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={'medium'} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={'auto'}
          color={useColorModeValue('gray.800', 'gray.200')}
          alignContent={'center'}>
        </Box>
      </Flex>
    </Stat>
  );
}

const Statistics = () => {
  return (
    <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1
        textAlign={'center'}
        fontSize={'4xl'}
        py={10}
        fontWeight={'bold'}>
        Registro
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard
          title={'Tickets abertos'}
          stat={'64'}
          //icon={<UsersIcon size={'3em'} />}
        />
        <StatsCard
          title={'Tickets fechados'}
          stat={'41'}
          //icon={<FileIcon size={'3em'} />}
        />
        <StatsCard
          title={'Disputas'}
          stat={'7'}
          //icon={<MapIcon size={'3em'} />}
        />
      </SimpleGrid>
    </Box>
  );
}

export default Statistics