import { GetServerSidePropsContext } from 'next';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import ChannelsPage from '@/features/channels/components/ChannelsPage';
import { ChannelProps } from '@/features/channels/types';

export default function Page(props: ChannelProps): InferGetServerSidePropsType<typeof getServerSideProps> {
  // ChannelsPage ja é trabalho para o matheus
  return <ChannelsPage {...props} />
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => { 
  // Buscar informacoes sobre os services que o cliente possui e seus identificadores
  const res = await fetch('/api/workspaces/channels');
  // nao é necessario alterar o formato desses dados no backend, basta colocar o tratamento aqui, para o formato do ChannelProps
  const result = res.json();

  return {
    props: result,
  } 
}
