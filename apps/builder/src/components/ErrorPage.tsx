import { env } from '@typebot.io/env'
import React from 'react'

export const ErrorPage = ({ error }: { error: Error }) => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '0 1rem',
      }}
    >
      {!env.NEXT_PUBLIC_VIEWER_URL[0] ? (
        <>
          <h1 style={{ fontWeight: 'bold', fontSize: '30px' }}>
            NEXT_PUBLIC_VIEWER_URL esta faltando
          </h1>
          <h2>
            Se certifque de configurar o app corretamente
          </h2>
        </>
      ) : (
        <p style={{ fontSize: '24px', textAlign: 'center' }}>{error.message}</p>
      )}
    </div>
  );
}