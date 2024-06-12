import { useState } from 'react';
import { Flex, VStack } from '@chakra-ui/react';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { DashboardHeader } from '@/features/dashboard/components/DashboardHeader';
import Layout from '@/components/chat/layout/ChatLayout';
import History from '@/components/chat/layout/HistoryLayout';
import GraphChat from '@/components/graph/GraphChat';
import GraphTicket from '@/components/graph/GraphTicket';
import GraphTicketYou from '@/components/graph/GraphTicketYou';
import GraphThemes from '@/components/graph/GraphThemes';
import CustomSideBar from '@/components/SideBar';
import { colors } from '@/lib/theme';

import type {} from '@mui/x-data-grid/themeAugmentation';
import styles from '@/assets/styles/forms.module.css';

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

const ChatPage: React.FC = () => {
  const [activePage, setActivePage] = useState('Atendimento');

  const handleButtonClick = (pageName: string) => {
    setActivePage(pageName);
  }

  return (
    <VStack>
      <DashboardHeader />
      <Flex w="100%">
        <CustomSideBar />
        <div style={{ overflow: 'hidden' }} className={styles['page-content']}>
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
              <div>
                <Layout />
              </div>
            )}
            {activePage === 'Histórico' && (
              <>
                <ThemeProvider theme={{ ['MuiTheme']: MuiTheme }}>
                  <History />
                </ThemeProvider>
              </>
            )}
            {activePage === 'Painel' && (
              <div className={styles['container-graphs-chat']}>
                <GraphChat data={{ datasets: [], labels: [] }} />
                <GraphTicket data={[50, 30, 20, 10]} />
                <GraphThemes month={''} />
                <GraphTicketYou data={[50, 30, 20, 10]} />
              </div>
            )}
          </div>
        </div>
      </Flex>
    </VStack>
  );
}

export default ChatPage