import React, { useState } from 'react';
import { Flex, VStack, Center } from '@chakra-ui/react';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { DashboardHeader } from '@/features/dashboard/components/DashboardHeader';
import History from '@/components/chat/layout/HistoryLayout';
import GraphChat from '@/components/graph/GraphChat';
import GraphTicket from '@/components/graph/GraphTicket';
import GraphTicketYou from '@/components/graph/GraphTicketYou';
import GraphThemes from '@/components/graph/GraphThemes';
import CustomSideBar from '@/components/SideBar';
import { colors } from '@/lib/theme';

import type {} from '@mui/x-data-grid/themeAugmentation';
import styles from '@/assets/styles/forms.module.css';
import ChatLayout from './layout/ChatLayout';

const MuiTheme = createTheme({
  palette: {
    mode: 'light',
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        root: {
          border: 1,
          borderColor: colors.gray,
          borderStyle: 'solid',
          borderRadius: 10,
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
          backgroundColor: colors.gray,
          color: '#C1C2C5',
          padding: 10,
        }
      }
    }
  }
});

const Chat: React.FC = () => {
  const [activePage, setActivePage] = useState('Atendimento');

  const handleButtonClick = (pageName: string) => {
    setActivePage(pageName);
  }

  return (
    <VStack>
      <DashboardHeader />
      <Flex w="100%" maxW="100%" overflowX="hidden">
        <CustomSideBar />
        <Center flex="1">
          <div className={styles['page-content']}>
            <div className={styles['button-container']}>
              <button
                className={
                  activePage === 'Atendimento'
                    ? styles.redButtonChat
                    : styles.grayButtonChat
                }
                onClick={() => handleButtonClick('Atendimento')}
              >
                Atendimento
              </button>
              <button
                className={
                  activePage === 'Histórico'
                    ? styles.redButtonChat
                    : styles.grayButtonChat
                }
                onClick={() => handleButtonClick('Histórico')}
              >
                Histórico
              </button>
              <button
                className={
                  activePage === 'Painel'
                    ? styles.redButtonChat
                    : styles.grayButtonChat
                }
                onClick={() => handleButtonClick('Painel')}
              >
                Painel
              </button>
            </div>
            <div>
              {activePage === 'Atendimento' && (
                <div style={{ height: "80vh", overflowY: "auto" }}> 
                  <ChatLayout />
                </div>
              )}
              {activePage === 'Histórico' && (
                <div>
                  <ThemeProvider theme={{ ['MuiTheme']: MuiTheme }}>
                    <History />
                  </ThemeProvider>
                </div>
              )}
              {activePage === 'Painel' && (
                <div style={{ height: "80vh", overflowY: "auto" }} className={styles['container-graphs-chat']}>
                  <GraphChat data={{ datasets: [], labels: [] }} />
                  <GraphTicket data={[]} />
                  <GraphThemes month={''} />
                  <GraphTicketYou data={[]} />
                </div>
              )}
            </div>
          </div>
        </Center>
      </Flex>
    </VStack>
  );
}

export default Chat;
