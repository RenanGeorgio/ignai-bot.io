import { Seo } from '@/components/Seo'
import { TextLink } from '@/components/TextLink'
import { T, useTranslate } from '@tolgee/react'
import { VStack, Heading, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { SignInForm } from './SignInForm'

type Props = {
  type: 'signin' | 'signup'
  defaultEmail?: string
}

export const SignInPage = ({ type }: Props) => {
  const { t } = useTranslate()
  const { query } = useRouter()

  return (
    <VStack spacing={4} h="100vh" justifyContent="center">
      <Seo
        title={
          type === 'signin'
            ? t('auth.signin.heading')
            : t('auth.register.heading')
        }
      />
      <Heading
        onClick={() => {
          throw new Error('Sentry is working')
        }}
      >
        {type === 'signin'
          ? t('auth.signin.heading')
          : t('auth.register.heading')}
      </Heading>
      {type === 'signin' ? (
        <Text>
          {t('auth.signin.noAccountLabel.preLink')}{' '}
          <TextLink href="/register">
            {t('auth.signin.noAccountLabel.link')}
          </TextLink>
        </Text>
      ) : (
        <Text>
          {t('auth.register.alreadyHaveAccountLabel.preLink')}{' '}
          <TextLink href="/signin">
            {t('auth.register.alreadyHaveAccountLabel.link')}
          </TextLink>
        </Text>
      )}
      <SignInForm defaultEmail={query.g?.toString()} />
      {type === 'signup' ? (
        <Text fontSize="sm" maxW="400px" textAlign="center">
          <T
            keyName="auth.register.aggreeToTerms"
            params={{
              terms: <TextLink href={'https://typebot.io/terms-of-service'} />, // TO-DO: trocar estes termos
              privacy: (
                <TextLink href={'https://typebot.io/privacy-policies'} /> // TO-DO: trocar estes termos
              ),
            }}
          />
        </Text>
      ) : null}
    </VStack>
  )
}