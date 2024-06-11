import React, { useState, useEffect } from 'react'
import { GetServerSidePropsContext } from 'next'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { Text, Container, Button } from '@chakra-ui/react'
import { ErrorPage } from '@/components/ErrorPage'
import SuccessResult from '@/components/result/SuccessResult'
import { useWorkspace } from '@/features/workspace/WorkspaceProvider'
import { useTypebots } from '@/features/dashboard/hooks/useTypebots'
import { useToast } from '@/hooks/useToast'
import WarningResult from '@/components/result/WarningResult'

interface Props {
  company: string
  code: string | number
  children?: React.ReactNode
  success: boolean
}

export default function Page(
  props: Props
): InferGetServerSidePropsType<typeof getServerSideProps> {
  const router = useRouter()
  // retornar um resultado
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [reload, setReload] = useState<any>(undefined)
  const [companyName, setCompanyName] = useState<string | undefined>(undefined)
  const { workspace } = useWorkspace()
  const { showToast } = useToast()

  const {
    typebots,
    isLoading: isTypebotLoading,
    refetch: refetchTypebots,
  } = useTypebots({
    workspaceId: workspace?.id,
    folderId: 'root',
    onError: (error) => {
      showToast({
        description: error.message,
      })
    },
  })

  useEffect(() => {
    if (router) {
      setReload(router?.reload)
    }

    setCompanyName(props?.company)
  }, [])

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (!router?.query?.contains(props?.code)) {
    return <ErrorPage error={new Error('O codigo não é compativel')} />
  }

  if (isTypebotLoading) {
    return <Container>Loading...</Container>
  }

  if (!(typebots?.length > 0)) {
    return (
      <WarningResult title="Atenção" description="Dados não foram excluídos" />
    )
  }

  return (
    <SuccessResult
      title="Sucesso"
      description="Dados foram removidos com sucesso"
    />
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const company = context.params?.company as string | undefined
  const code = context.query?.id
  // verificar se o company e o code são validos
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const res = await fetch('https://api.github.com/repos/vercel/next.js')

  return {
    props: { company, code },
  }
}
