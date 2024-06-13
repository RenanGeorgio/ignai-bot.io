import React from 'react';
import { GetServerSidePropsContext } from 'next';
import { User } from '@typebot.io/prisma';
import prisma from '@typebot.io/lib/prisma';
import { ChatProvider } from '@/contexts/chat/ChatContext';
import ChatPage from '@/components/Chat';
import { useUser } from '@/features/account/hooks/useUser';

export default function Page() {
  const { user } = useUser();

  if (!user) {
    return
  }
  //const { replace } = useRouter();
  //const { workspace } = useWorkspace();

  /*
  useEffect(() => {
    if (!workspace || workspace.isPastDue) {
      return
    }

    replace('/typebots');
  }, [replace, workspace]);*/

  return (
    <ChatProvider>
      <VStack>
        <DashboardHeader />
        <Flex w="100%">
          <CustomSideBar />
          <div style={{ overflow: 'hidden' }} className={styles['page-content']}>
            <div className={styles['button-container']}>
              <button
                className={
                  activePage === 'Atendimento'
                  ? styles.grayButtonChat
                  : styles.redButtonChat
                }
                onClick={() => handleButtonClick('Atendimento')}
              >
                Atendimento
              </button>
              <button
                className={
                  activePage === 'Histórico'
                  ? styles.grayButtonChat
                  : styles.redButtonChat
                }
                onClick={() => handleButtonClick('Histórico')}
              >
                Histórico
              </button>
              <button
                className={
                  activePage === 'Painel'
                  ? styles.grayButtonChat
                  : styles.redButtonChat
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
    </ChatProvider>
  );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const userId = context.query.user?.toString() as string;

  if (!userId) {
    return {
      redirect: {
        permanent: false,
        destination: `/signin`
      }
    }
  }

  const user = await prisma.user.findFirst({
    where: { id: userId }
  }) as User;

  if (!user) {
    return
  }

  return {
    props: {}
  }
}