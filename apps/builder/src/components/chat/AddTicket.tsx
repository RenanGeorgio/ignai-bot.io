import React from 'react'
import { IconButton } from '@chakra-ui/react'
import { DotsVertical, Pencil, Trash, Upload } from '@/components/icons'

import styles from './AddTicket.module.css'

interface AddTicketProps {
  onUploadFile: (file: File) => void
  // onSetShow: () => void
}

//export default function AddTicket({ onUploadFile, onSetShow }: AddTicketProps) {
export default function AddTicket({ onUploadFile }: AddTicketProps) {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      const file = files[0]
      // Aqui você pode fazer algo com o arquivo, como enviar para o servidor
      console.log('Arquivo enviado:', file)

      // Se você quiser notificar o componente Treatment sobre o upload, chame a função
      if (onUploadFile) {
        onUploadFile(file)
      }
    }
  }

  return (
    <div className={styles['main-container']}>
      <div className={styles.box}>
        <div className={styles.section}>
          <div className={styles['section-3']}>
            <span className={styles['text-2add']}>Atendimento via:</span>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles['section-3']}>
            <span className={styles['text-2add']}>Cliente:</span>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles['section-3']}>
            <span className={styles['text-2add']}>Responsável:</span>
          </div>
        </div>
      </div>

      <div className={styles['group-2']}>
        {/* primeiro select  */}
        <div className={styles['group-3']}>
          <div className={styles['wrapper-2']}>
            <select className={styles['section-5']}>
              <option selected className={styles['text-4']}>
                Telefone
              </option>
            </select>
          </div>
        </div>

        {/* segundo select  */}
        <div className={styles['group-3']}>
          <div className={styles['wrapper-3']}>
            <select className={styles['group-4']}>
              <option selected className={styles['text-5']}>
                Samuel
              </option>
            </select>
          </div>
        </div>

        {/* terceiro select  */}
        <div className={styles['group-3']}>
          <div className={styles['wrapper-4']}>
            <select className={styles['box-3']}>
              <option selected className={styles['text-6']}>
                Roberto Almeida
              </option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles['wrapper-5']}>
        <div className={styles['wrapper-6']}>
          {/* <div className='img-3' /> */}
          <div className={styles['group-6']}>
            <div className={styles['box-4']}>
              <div className={styles['wrapper-7']}>
                <span className={styles['text-7']}>
                  Ticket protocolo 2023103377{' '}
                </span>
                <span className={styles['text-8']}>- </span>
                <span className={styles['text-9']}>
                  Número gerado automaticamente{' '}
                </span>
              </div>
            </div>
            <div className={styles['section-6']}>
              <span className={styles['text-focused']}>Cliente: Samuel </span>
            </div>
            <span className={styles['text-address']}>
              23 Shatinon Mekalan, CEP 29065-616, Brasil
            </span>
          </div>
          <div className={styles['wrapper-8']}>
            <div className={styles['wrapper-9']}>
              <div className={styles['section-7']}>
                <IconButton className={styles['pic-2']} aria-label="Edit">
                  <Pencil />
                </IconButton>
              </div>
            </div>
            <div className={styles['group-7']}>
              <div className={styles['section-8']}>
                <IconButton className={styles['img-4']} aria-label="Delete">
                  <Trash />
                </IconButton>
              </div>
            </div>
            <div className={styles['wrapper-a']}>
              <div className={styles['group-8']}>
                <IconButton
                  className={styles['img-5']}
                  aria-label="More options"
                >
                  <DotsVertical />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
        {/* <div className='img-6' /> */}
        <div className={styles['box-5']}>
          <div className={styles['box-6']}>
            {/* <div className='pic-3' /> */}
            <div className={styles['wrapper-b']}>
              <span className={styles['text-c']}>
                Assunto: Atraso no pedido
              </span>
              <span className={styles['text-d']}>
                Data 17/10/2023 - Hora: 17:55
              </span>
            </div>
            <div className={styles['section-9']}>
              <div className={styles['wrapper-9']}>
                <div className={styles['section-7']}>
                  <IconButton className={styles['pic-2']} aria-label="Edit">
                    <Pencil />
                  </IconButton>
                </div>
              </div>
              <div className={styles['group-7']}>
                <div className={styles['section-8']}>
                  <IconButton className={styles['img-4']} aria-label="Delete">
                    <Trash />
                  </IconButton>
                </div>
              </div>
              <div className={styles['wrapper-a']}>
                <div className={styles['group-8']}>
                  <IconButton
                    className={styles['img-5']}
                    aria-label="More options"
                  >
                    <DotsVertical />
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
          <div className={styles['group-d']}>
            <span className={styles['text-e']}>Ocorrido</span>
            <span className={styles['text-f']}>
              Cliente do pedido número 558990 disse que o pedido está atrasado.
              <br />
              Time de logística foi contatado e informou que será enviado em 2
              dias úteis.
            </span>
            <div className={styles['card-heading']}>
              <div className={styles['form']}>
                <div className={styles['container-image-upload']}>
                  <div className={styles['image-upload']}>
                    <Upload />
                  </div>
                </div>

                <span className={styles['text-10']}>
                  Jogue aqui seu arquivo
                </span>
                <span className={styles['text-11']}>ou</span>

                <div className={styles['buttonContainerInput']}>
                  <input
                    type="file"
                    className={styles['inputs']}
                    onChange={handleFileUpload}
                  />
                  <span className={styles['attachFileSpan']}>
                    Buscar Arquivo
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
