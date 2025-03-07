import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
} from '@react-email/components'
import * as React from 'react'
import { env } from '@typebot.io/env'

interface Props {
  magicLinkUrl: string
}

const imagesBaseUrl = `${env.NEXTAUTH_URL}/images`

export const MagicLink = ({ magicLinkUrl }: Props) => (
  <Html>
    <Head />
    <Preview>Faça login com este magic link</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${imagesBaseUrl}/logo.png`}
          width="32"
          height="32"
          alt="Ignai-bot Logo"
          style={{
            margin: '24px 0',
          }}
        />
        <Heading style={heading}>Seu magic link</Heading>
        <Link
          href={magicLinkUrl}
          target="_blank"
          style={{
            ...clickLink,
            display: 'block',
            marginBottom: '24px',
          }}
        >
          👉 Clique aqui para entrar 👈
        </Link>
        <Text
          style={{
            ...text,
            color: '#ababab',
            marginTop: '14px',
            marginBottom: '16px',
          }}
        >
          Se você não tentou fazer login, pode ignorar este e-mail com segurança.
        </Text>
        <Text style={footer}>
          <Link
            href="https://notion.so"
            target="_blank"
            style={{ ...link, color: '#898989' }}
          >
            Ignai-bot
          </Link>
          - Impulsionando conversas multi-canal em grande escala
        </Text>
      </Container>
    </Body>
  </Html>
)

MagicLink.PreviewProps = {
  magicLinkUrl: 'http://localhost:3000',
} as Props

export default MagicLink

const main = {
  backgroundColor: '#ffffff',
}

const container = {
  paddingLeft: '12px',
  paddingRight: '12px',
  margin: '0 auto',
}

const clickLink = {
  color: '#2754C5',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '18px',
}

const link = {
  color: '#2754C5',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  textDecoration: 'underline',
}

const heading = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '32px 0',
  padding: '0',
}

const text = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  margin: '24px 0',
}

const footer = {
  color: '#898989',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '12px',
  lineHeight: '22px',
  marginTop: '12px',
  marginBottom: '24px',
}