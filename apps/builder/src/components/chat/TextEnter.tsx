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
}

export default function TextEnter({
  onSendMessage
  // onUploadFilePhoto,
}: TextEnterProps) {
  const [textMessage, setTextMessage] = useState<string>('')
  {/* 
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
*/}
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextMessage(e.currentTarget.value)
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
              cols={50}
              rows={2}
              wrap="ward"
              className={styles['txt']}
              placeholder="Informe sua mensagem"
              value={textMessage}
            />
          </div>
          <div className={styles['btncontainer']}>
            <IconButton className={styles['icon']} aria-label="Mic">
              <Mic />
            </IconButton>
            <div className={styles['file-input-container']}>
              {/* 
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUploadPhoto}
                className={styles['file-input']}
                />
              */}
              <IconButton className={styles['icon']} aria-label="Photo">
                <Photo />
              </IconButton>
            </div>
            <div className={styles['btntxt']}>
              <button
                onClick={() => {
                  onSendMessage(textMessage, setTextMessage)
                }}
                className={styles['btntxt']}
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
