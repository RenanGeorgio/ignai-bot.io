import React, { ChangeEvent, useState, useEffect } from 'react'
import { IconButton } from '@chakra-ui/react'
import { Mic, Photo } from '@/components/icons'

import styles from '@/assets/styles/chat.module.css'

interface TextEnterProps {
  onSendMessage: (
    message: string,
    setTextMessage: React.Dispatch<React.SetStateAction<string>>
  ) => void
  onUploadFilePhoto: (file: File) => void
  value: string 
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  disabled: boolean
}

export default function TextEnter({
  onSendMessage,
  onUploadFilePhoto,
  disabled
}: TextEnterProps) {
  const [textMessage, setTextMessage] = useState<string>('')

  const handleFileUploadPhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      const file = files[0]
      // Aqui você pode fazer algo com o arquivo, como enviar para o servidor
      console.log('Arquivo Imagem:', file)

      // Se você quiser notificar o componente Treatment sobre o upload, chame a função
      onUploadFilePhoto(file)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextMessage(e.currentTarget.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSendMessage(textMessage, setTextMessage)
    }
  }

  const handlePhotoIconClick = () => {
    // Simula o clique no input de arquivo quando o ícone de foto é clicado
    const fileInput = document.getElementById('file-input')
    if (fileInput) {
      fileInput.click()
    }
  }

  useEffect(() => {
    // Lógica para executar quando o componente monta (equivalente a componentDidMount)
    // Por exemplo, pode ser usado para adicionar event listeners, etc.
    return () => {
      // Lógica para executar quando o componente desmonta (equivalente a componentWillUnmount)
      // Por exemplo, pode ser usado para remover event listeners, etc.
    }
  }, []) // O array vazio como segundo argumento faz com que o useEffect seja executado apenas uma vez, semelhante ao componentDidMount.

  return (
    <>
      <div className={styles['wrapperTextEnter']}>
        <div className={styles['containertxt']}>
          <div className={styles['txtwrapp']}>
            <textarea
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              cols={50}
              rows={2}
              wrap="ward"
              className={styles['txt']}
              placeholder="Informe sua mensagem"
              value={textMessage}
              disabled={disabled}
            />
          </div>
          <div className={styles['btncontainer']}>
            <IconButton className={styles['icon']} aria-label="Mic">
              <Mic />
            </IconButton>
            <div className={styles['file-input-container']}>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUploadPhoto}
                id="file-input" 
                style={{ display: 'none' }}
                disabled={true}
              />
              <label htmlFor="file-input">
                <IconButton
                  className={styles['icon']}
                  aria-label="Photo"
                  onClick={handlePhotoIconClick} 
                >
                  <Photo />
                </IconButton>
              </label>
            </div>
            <div className={styles['btntxt']}>
              <button
                onClick={() => {
                  onSendMessage(textMessage.trim(), setTextMessage)
                }}
                className={styles['btntxt']}
                disabled={disabled}
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
