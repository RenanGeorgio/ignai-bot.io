import * as React from 'react'
import { Button } from '@chakra-ui/react'
import styles from './history.module.css'

interface ModalHistoryProps {
  close: () => void
}

export default function ModalHistory({ close }: ModalHistoryProps) {
  const [open, setOpen] = React.useState(true)

  const handleClose = () => {
    setOpen(false)
    close()
  }

  return (
    <div>
      {open && (
        <div className={styles.wrapperHistory}>
          <div className={styles.add}>
            <span className={styles.textTitle}>Adicionar</span>
            <div className={styles.btnClose}>
              <button onClick={handleClose}>X</button>
            </div>
          </div>
          <div className={styles.formHistory}>
            <div className={styles.containerHistory}>
              <span className={styles.spanTitle}>Contato</span>
              <input className={styles.inputHistory} type="text" />
            </div>

            <div className={styles.containerHistory}>
              <span className={styles.spanTitle}>Assunto</span>
              <input className={styles.inputHistory} type="text" />
            </div>
            <div className={styles.containerHistory}>
              <span className={styles.spanTitle}>Data</span>
              <input className={styles.inputHistory} type="date" />
            </div>

            <div className={styles.containerHistory}>
              <span className={styles.spanTitle}>Ticket</span>
              <input className={styles.inputHistory} type="text" />
            </div>
            <div className={styles.containerHistory}>
              <span className={styles.spanTitle}>Status</span>
              <input className={styles.inputHistory} type="text" />
            </div>
            <div className={styles.buttonContainerHistory}>
              <Button variant={styles.contained}>Confirmar</Button>
              <Button variant={styles.contained} disabled>
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
