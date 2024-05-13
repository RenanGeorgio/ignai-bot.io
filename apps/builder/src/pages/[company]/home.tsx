import { ErrorPage } from '@/components/ErrorPage'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

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


export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const incompatibleBrowser = incompatibleBrowsers.find((browser) => browser.regex.test(context.req.headers['user-agent'] ?? ''))?.name ?? null
  
  try {
    return {
      props: {
        incompatibleBrowser
      },
    }
  } catch (err) {
    console.error(err)
  }
}

const Home = ({ incompatibleBrowser }: {
  incompatibleBrowser: string | null
}) => {
  if (incompatibleBrowser)
    return (
      <ErrorPage
        error={
          new Error(
            `Your web browser: ${incompatibleBrowser}, is not supported.`
          )
        }
      />
    )
  
  return (
    <></>
  )
}

export default Home