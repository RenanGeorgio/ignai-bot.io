import { GetServerSidePropsContext } from 'next';
import type { GetServerSideProps } from 'next';
import ChannelsPage from '@/features/channels/components/ChannelsPage';
import { ChannelProps } from '@/features/channels/types';
import { getServerSession } from 'next-auth';
import { getAuthOptions } from './api/auth/[...nextauth]';
import { User } from '@typebot.io/schemas';
import { formatServiceList } from '@/helpers/formatServiceList';
import { env } from '@typebot.io/env';

export default function Page(props: ChannelProps) {
  return <ChannelsPage {...props} />
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getServerSideProps: GetServerSideProps<any> = async (context: GetServerSidePropsContext) => { 
  // Buscar informacoes sobre os services que o cliente possui e seus identificadores
  // const res = await fetch('/api/workspaces/channels');
  // nao é necessario alterar o formato desses dados no backend, basta colocar o tratamento aqui, para o formato do ChannelProps
  // const result = res.json();

  const session = await getServerSession(
    context.req,
    context.res,
    getAuthOptions({})
  );

  const user = session?.user as User
  const res = await fetch(`${env.CHATBOT_SERVER_URL}/v1/bot/services/${user.email}`);

  const data = await res.json();
  const props = formatServiceList(data);
  
  return {
    props: {
      ...props,
      hasNumbers: null,
      numbersList: null,
    },
  } 
}
