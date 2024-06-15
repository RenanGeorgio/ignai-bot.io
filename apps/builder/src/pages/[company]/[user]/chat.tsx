import React from 'react'
import { GetServerSidePropsContext } from 'next'
import { User } from '@typebot.io/prisma'
import prisma from '@typebot.io/lib/prisma'
import { ChatProvider } from '@/contexts/chat/ChatContext'
import ChatPage from '@/components/Chat'
import { UserProvider } from '@/contexts/user/provider/UserProvider'
import { User as ChatbotUser } from '@/contexts/user/UserContext'
import Head from 'next/head'
export default function Page({ user }: { user: ChatbotUser }) {
  if (!user) {
    return
  }

  return (
    <>
      <Head>
        <title>My page title</title>
      </Head>
      <UserProvider user={user}>
        <ChatProvider>
          <ChatPage />
        </ChatProvider>
      </UserProvider>
    </>
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const userId = context.query.user?.toString() as string

  if (!userId) {
    return {
      redirect: {
        permanent: false,
        destination: `/signin`,
      },
    }
  }

  const user = (await prisma.user.findFirst({
    where: { id: userId },
  })) as User

  if (!user) {
    console.log('User not found')
    return {
      redirect: {
        permanent: false,
        destination: `/signin`,
      },
    }
  }

  const res = await fetch(
    `${process.env.IGNAI_CHATBOT_SERVER}/api/v1/user/${user.email}`
  )

  const chatbotUser = await res.json()

  return {
    props: {
      user: {
        _id: chatbotUser._id,
        name: chatbotUser.name,
        email: chatbotUser.email,
        company: chatbotUser.company,
        companyId: chatbotUser.companyId,
      },
    },
  }
}
