import React, { ChangeEvent, useState, useEffect } from 'react';
import { IconButton } from '@chakra-ui/react';
import { Mic, Photo } from '@/components/icons';

import '@/assets/styles/chat.css';

interface TextEnterProps {
  onSendMessage: (message: string, setTextMessage: React.Dispatch<React.SetStateAction<string>>) => void;
  onUploadFilePhoto: (file: File) => void;
}

export default function TextEnter({ onSendMessage, onUploadFilePhoto }: TextEnterProps) {
  const [textMessage, setTextMessage] = useState<string>("");

  const handleFileUploadPhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      // Aqui você pode fazer algo com o arquivo, como enviar para o servidor
      console.log("Arquivo Imagem:", file);

      // Se você quiser notificar o componente Treatment sobre o upload, chame a função
      onUploadFilePhoto(file);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextMessage(e.currentTarget.value);
  };

  useEffect(() => {
    // Lógica para executar quando o componente monta (equivalente a componentDidMount)
    // Por exemplo, pode ser usado para adicionar event listeners, etc.
    return () => {
      // Lógica para executar quando o componente desmonta (equivalente a componentWillUnmount)
      // Por exemplo, pode ser usado para remover event listeners, etc.
    };
  }, []); // O array vazio como segundo argumento faz com que o useEffect seja executado apenas uma vez, semelhante ao componentDidMount.

  return (
    <>
      <div className="wrapperTextEnter">
        <div className="containertxt">
          <div className="txtwrapp">
            <textarea
              onChange={handleChange}
              cols={50}
              rows={2}
              wrap="ward"
              className="txt"
              value={textMessage}
            />
          </div>
          <div className="btncontainer">
            <IconButton className="icon">
              <Mic />
            </IconButton>
            <div className="file-input-container">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUploadPhoto}
                className="file-input"
              />
              <IconButton className="icon">
                <Photo />
              </IconButton>
            </div>
            <div className="btntxt">
              <button
                onClick={() => {
                  onSendMessage(textMessage, setTextMessage);
                }}
                className="btntxt"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}