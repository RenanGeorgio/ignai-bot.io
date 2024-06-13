import { Bubble } from '@/Bubble'
import {
  open,
  toggle,
  close,
  showPreviewMessage,
  hidePreviewMessage,
  setPrefilledVariables,
  setInputValue,
} from '@typebot.io/js'
import { useState } from 'react'
import { leadGenerationTypebot } from './assets/leadGenerationTypebot'
import './assets/index.css'

export const Default = () => {
  const [name, setName] = useState('John')

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button onClick={toggle}>Alternar janela de bate-papo</button>
        <button onClick={open}>Abrir janela de bate-papo</button>
        <button onClick={close}>Fechar janela de bate-papo</button>
        <button onClick={() => showPreviewMessage()}>
          Mostrar simulação da mensagem
        </button>
        <button onClick={() => setInputValue('YOOOO!')}>Definir valor de entrada</button>
        <button onClick={hidePreviewMessage}>Fechar visualização da mensagem</button>
        <div>
          <p>Nomes predefinidos:</p>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <button onClick={() => setPrefilledVariables({ Name: name })}>
            Definir nome predefinido
          </button>
        </div>
      </div>

      <Bubble
        typebot={leadGenerationTypebot}
        apiHost="http://localhost:3001"
        prefilledVariables={{
          Name: ['John'],
        }}
        previewMessage={{
          avatarUrl: 'https://avatars.githubusercontent.com/u/16015833?v=4',
          message: 'Olá, sou uma mensagem de visualização',
          autoShowDelay: 3000,
        }}
        theme={{
          button: {
            backgroundColor: '#FF7537',
            iconColor: 'white',
          },
        }}
        isPreview
      />
    </div>
  )
}