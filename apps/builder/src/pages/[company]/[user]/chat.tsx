import React from 'react';
import { GetServerSidePropsContext } from 'next';
import prisma, { User } from '@typebot.io/prisma';
import { ChatProvider } from '@/contexts/chat/ChatContext';
import ChatPage from '@/components/Chat';

import type {} from '@mui/x-data-grid/themeAugmentation';

export default function Page() {
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
      <ChatPage />
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