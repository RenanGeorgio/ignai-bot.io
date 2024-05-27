import { DashboardPage } from '@/features/dashboard/components/DashboardPage'
import { GetServerSidePropsContext } from 'next'
import { useWorkspace } from '@/features/workspace/WorkspaceProvider'
// import { useRouter } from 'next/navigation'

export default function Page() {
  const { currentRole } = useWorkspace()
  // const navigate = useRouter()
  if (currentRole === 'OPERATOR') {
    return <div>Operator page</div> // redirecionar para a rota correta
  }

  return <DashboardPage />
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const callbackUrl = context.query.callbackUrl?.toString()
  const redirectPath =
    context.query.redirectPath?.toString() ??
    (callbackUrl
      ? new URL(callbackUrl).searchParams.get('redirectPath')
      : undefined)
  return redirectPath
    ? {
        redirect: {
          permanent: false,
          destination: redirectPath,
        },
      }
    : { props: {} }
}
