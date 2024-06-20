import { GetServerSidePropsContext } from 'next';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import ChannelsPage from '@/features/channels/components/ChannelsPage';
import { ChannelProps } from '@/features/channels/types';

export default function Page(props: ChannelProps): InferGetServerSidePropsType<typeof getServerSideProps> {
  return <ChannelsPage {...props} />
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => { 
  const res = await fetch('/api/workspaces/channels');

  const result = res.json();

  return {
    props: result,
  } 
}
