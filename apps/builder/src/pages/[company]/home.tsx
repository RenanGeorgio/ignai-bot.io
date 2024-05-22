import { ErrorPage } from '@/components/ErrorPage'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

type Obj = {
  [key: string]: any;
};

type BrowserProps = {
  name: string;
  regex: Obj;
};

interface Props {
  incompatibleBrowser: string | null
}

// Browsers that doesn't support ES modules and/or web components
const incompatibleBrowsers = [
  {
    name: 'UC Browser',
    regex: /ucbrowser/i,
  },
  {
    name: 'Internet Explorer',
    regex: /msie|trident/i,
  },
  {
    name: 'Opera Mini',
    regex: /opera mini/i,
  },
]

export default function Home({ incompatibleBrowser }: Props){
  if (incompatibleBrowser) {
    return (
      <ErrorPage
        error={
          new Error(
            `Your web browser: ${incompatibleBrowser}, is not supported.`
          )
        }
      />
    );
  }
  
  return (
    <></>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const incompatibleBrowser = incompatibleBrowsers?.find((browser: BrowserProps) => browser?.regex?.test(context?.req?.headers['user-agent'] ?? ''))?.name ?? null;
  
  try {
    return {
      props: {
        incompatibleBrowser
      }
    }
  } catch (err) {
    console.error(err);
  }
}