import { GetServerSidePropsContext } from 'next';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import ChannelsPage from '@/features/channels/components/ChannelsPage';
import { ChannelProps } from '@/features/channels/types';
import { getServerSession } from 'next-auth';
import { getAuthOptions } from './api/auth/[...nextauth]';
import prisma from '@typebot.io/lib/prisma';
import { User } from '@typebot.io/schemas';
import { formatServiceList } from '@/helpers/formatServiceList';

export default function Page(props: ChannelProps): InferGetServerSidePropsType<typeof getServerSideProps> {
  // ChannelsPage ja é trabalho para o matheus
  return <ChannelsPage {...props} />
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => { 
  // Buscar informacoes sobre os services que o cliente possui e seus identificadores
  // const res = await fetch('/api/workspaces/channels');
  // nao é necessario alterar o formato desses dados no backend, basta colocar o tratamento aqui, para o formato do ChannelProps
  // const result = res.json();

  const session = await getServerSession(
    context.req,
    context.res,
    getAuthOptions({})
  )
  if (!session?.user) {
    return {
      redirect: {
        permanent: false,
        destination:
          context.locale !== context.defaultLocale
            ? `/${context.locale}/signin`
            : '/signin',
      },
    }
  }

  const user = session.user as User

  const res = await fetch(
    `${process.env.CHATBOT_SERVER_URL}/api/v1/bot/services/${user.email}`
  )

  const data = await res.json()

  const props = formatServiceList(data)
  
  return {
    props: {
      ...props,
      hasNumbers: null,
      numbersList: null,
    },
  } 
}
