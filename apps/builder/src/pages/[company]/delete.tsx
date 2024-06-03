import React, { useState, useEffect } from 'react';
import { GetServerSidePropsContext } from 'next';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Text, Container, Button } from '@chakra-ui/react';
import { ErrorPage } from '@/components/ErrorPage';
 
interface Props {
  company: string;
  code: string | number;
  children?: React.ReactNode;
}

export default function Page(props: Props): InferGetServerSidePropsType<typeof getServerSideProps> {
  const router = useRouter();

  const [reload, setReload] = useState(undefined);
  const [companyName, setCompanyName] = useState(undefined);

  useEffect(() => {
    if (router) {
      setReload(router?.reload);
    }

    setCompanyName(props?.company);
  },[]);

  if (!router.query.contains(props?.code)) {
    return (
      <ErrorPage error={new Error('O codigo não é compativel')} />
    );
  }

  return (
    <Container>
      <section className="flex flex-col gap-6">
        <Text variant="h1">Os dados do cliente {companyName}</Text>
        <Text variant="h2">Foram removidos com sucesso</Text>
        <Text>
          Caso os dados não tenham sido removidos com sucesso, recarregue a pagina e verifique novamente
        </Text>
        <Button onClick={reload}>Recarregar</Button>
      </section>
    </Container>
  )
}
 
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const company = context.params?.company as string | undefined;
  const code = context.query?.id;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  
  return { 
    props: { company, code } 
  }
}