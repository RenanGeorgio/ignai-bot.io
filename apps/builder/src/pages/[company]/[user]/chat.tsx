import React from 'react';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { getAuthOptions } from '@/pages/api/auth/[...nextauth]';
import { isNotDefined } from '@typebot.io/lib';
import { User } from '@typebot.io/prisma';
import { ChatProvider } from '@/contexts/chat/ChatContext';
import ChatPage from '@/components/Chat';

import type {} from '@mui/x-data-grid/themeAugmentation';

export default function Page() {
  return (
    <ChatProvider>
      <ChatPage />
    </ChatProvider>
  );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getServerSession(
    context.req,
    context.res,
    getAuthOptions({})
  );

  const userId = context.query.user?.toString() as string;
  const user = session?.user as User;

  if ((isNotDefined(session?.user)) || (user?.id != userId)) {
    return {
      redirect: {
        permanent: false,
        destination: `/signin`
      }
    }
  } else {
    return {
      props: {}
    }
  }
}