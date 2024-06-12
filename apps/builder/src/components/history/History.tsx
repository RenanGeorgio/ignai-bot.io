import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
// import { Button, Modal, IconButton } from '@chakra-ui/react'
import { DotsVertical, Edit, Trash } from '@/components/icons'
import rows from '../../assets/mock/dados/data.json'
import ModalHistory from './ModalHistory'
import styles from '@/assets/styles/leftmenu.module.css'
import { Button, Modal, IconButton } from '@mui/material'

interface Contato {
  name: string
  description: string
}

const ContatoCell: React.FC<{ contato: Contato }> = ({ contato }) => {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontWeight: 'bold' }}>{contato.name}</div>
        <div style={{ fontSize: 12, color: 'gray' }}>{contato.description}</div>
      </div>
    </>
  )
}

const getStatusStyles = (
  status: string
): { color: string; backgroundColor: string } => {
  const color = status === 'pendente' ? 'red' : 'green'
  const backgroundColor = status === 'pendente' ? '#ffadad' : 'lightgreen'

  return { color, backgroundColor }
}

const columns: GridColDef[] = [
  {
    field: 'contato',
    headerName: 'Contato',
    width: 300,
    renderCell: (params) => {
      return <ContatoCell contato={params.value as Contato} />
    },
  },
  { field: 'assunto', headerName: 'Assunto', width: 280 },
  {
    field: 'date',
    headerName: 'Data',
    type: 'date',
    width: 190,
    valueGetter: (params) => {
      return params ? new Date(params) : null
    },
  },
  { field: 'ticket', headerName: 'Ticket', width: 230 },
  {
    field: 'status',
    headerName: 'Status',
    width: 230,
    renderCell: (params) => (
      <div
        style={{
          color: getStatusStyles(params.value as string).color,
          backgroundColor: getStatusStyles(params.value as string)
            .backgroundColor,
          border: '1px solid',
          padding: '2px',
          borderRadius: '5px',
        }}
      >
        {params.value}
      </div>
    ),
  },
  {
    field: 'acao',
    headerName: 'Ação',
    width: 160,
    renderCell: () => {
      return (
        <div>
          <IconButton>
            <Edit />
          </IconButton>
          <IconButton
            color="primary"
            size="small"
            onClick={() => {
              // ...
            }}
          >
            <Trash />
          </IconButton>
          <IconButton>
            <DotsVertical />
          </IconButton>
        </div>
      )
    },
  },
]

export default function HistoryComponent() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <div
      style={{
        width: '94%',
        height: '100%',
        paddingTop: 2,
        paddingBottom: 24,
        paddingLeft: 90,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 1,
        display: 'inline-flex'
      }}
    >
      <div
        style={{
          borderRadius: 6,
          overflow: 'hidden',
          justifyContent: 'end',
          alignItems: 'flex-start',
          display: 'flex',
          width: '100%',
        }}
      >
        <div
          style={{
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
            paddingLeft: 10,
            paddingRight: 10,
            background: '#DEDBFC',
            color: 'rgb(151, 0, 0)',
            borderRight: '1px rgb(177, 106, 106) solid',
            justifyContent: 'end',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <Button>meus</Button>
        </div>
        <div
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            background: '#E8E6FC',
            color: 'rgb(151, 0, 0)',
            justifyContent: 'end',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <Button>Todos</Button>
        </div>
      </div>

      <div
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 24,
          display: 'flex',
          width: '98%',
          padding: '5px 0px 1px 10px',
          backgroundColor: 'white'
        }}
      >
        <div
          style={{
            flex: '1 ',
            height: 38,
            borderRadius: 6,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            display: 'flex',
            width: '100px',
          }}
        >
          <div
            style={{
              flex: '1 1 0',
              height: 38,
              background: 'white',
              borderRadius: 6,
              overflow: 'hidden',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              display: 'flex',
            }}
          >
            <form style={{ width: '100%', height: '95%' }}>
              <select style={{ width: '80%', height: '100%', borderRadius: 6, backgroundColor: 'white', color: 'black', border: '1px solid black' }}>
                <option value="" selected>
                  <em>None</em>
                </option>
                <option value={10}>Twenty</option>
                <option value={21}>Twenty one</option>
                <option value={22}>Twenty one and a half</option>
              </select>
            </form>
          </div>
        </div>
        <div
          style={{
            flex: '1 1 0',
            height: 38,
            borderRadius: 6,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            display: 'flex',
          }}
        >
          <div
            style={{
              flex: '1 1 0',
              height: 38,
              background: 'white',
              borderRadius: 6,
              overflow: 'hidden',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              display: 'flex',
            }}
          >
            <form style={{ width: '100%', height: '95%' }}>
              <select
                style={{
                  margin: 1,
                  width: '80%',
                  height: '100%',
                  borderRadius: 6,
                  backgroundColor: 'white', 
                  color: 'black',
                  border: '1px solid black'
                }}
              >
                <option value="" selected>
                  <em>None</em>
                </option>
                <option value={10}>Twenty</option>
                <option value={21}>Twenty one</option>
                <option value={22}>Twenty one and a half</option>
              </select>
            </form>
          </div>
        </div>
        <div
          style={{
            flex: '1 1 0',
            height: 38,
            borderRadius: 6,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            display: 'flex',
          }}
        >
          <div
            style={{
              flex: '1 1 0',
              height: 38,
              background: 'white',
              borderRadius: 6,
              overflow: 'hidden',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              display: 'flex',
            }}
          >
            <form style={{ width: '80%', height: '95%' }}>
              <select
                style={{ width: '100%', height: '100%', borderRadius: 6, backgroundColor: 'white', color: 'black', border: '1px solid black' }}
              >
                <option value="" selected>
                  <em>None</em>
                </option>
                <option value={10}>Twenty</option>
                <option value={21}>Twenty one</option>
                <option value={22}>Twenty one and a half</option>
              </select>
            </form>
          </div>
        </div>
      </div>

      <div
        style={{
          alignSelf: 'stretch',
          paddingLeft: 4,
          paddingRight: 1,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          display: 'inline-flex',
          width: '100%',
          backgroundColor: 'white'
        }}
      >
        <div
          style={{
            color: 'black',
            fontSize: 18,
            fontFamily: 'sans-serif',
            fontWeight: '500',
            lineHeight: 2,
            wordWrap: 'break-word',
            backgroundColor: 'white'
          }}
        >
          Filtro de busca
        </div>
      </div>

      <div
        style={{
          flex: '1 1 0',
          height: 38,
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
          display: 'flex',
          width: '100%',
          borderTop: '1px #DBDADE solid',
          padding: 10,
          backgroundColor: 'white'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 15,
            height: '100%',
            backgroundColor: 'white'
          }}
        >
          <select
            style={{
              display: 'flex',
              justifyContent: 'center',
              height: '2rem',
              width: '5rem',
              padding: '5px 5px 5px 5px',
              borderRadius: '5px',
              backgroundColor: 'white',
              marginTop: '-7px',
              color: 'black',
              border: '1px solid black'
            }}
          >
            <option selected>10</option>
            <option>20</option>
            <option>30</option>
            <option>40</option>
          </select>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 15,
            padding: '5px',
            backgroundColor: 'white'
          }}
        >
          <input
            className={styles['custom-placeholder']}
            title="Buscar"
            placeholder="Buscar"
            style={{
              height: 33,
              background: 'white',
              borderRadius: 6,
              border: '1px rgb(149, 0, 0) solid',
              justifyContent: 'flex-start',
              alignItems: 'center',
              display: 'flex',
              color: 'black'
            }}
          />

          <div>
            <Button
              style={{
                background: 'rgb(149, 0, 0)',
                boxShadow: '0px 2px 4px rgba(174, 163, 163, 0.3)',
                borderRadius: 6,
                justifyContent: 'center',
                alignItems: 'center',
                color: '#fff',
                //   fontSize: 14,
                display: 'flex',
              }}
              onClick={handleOpen}
            >
              Adicionar
            </Button>
          </div>
        </div>
      </div>

      <div style={{ height: 370, width: '100%', backgroundColor: 'white' }}>
        <DataGrid rows={rows} columns={columns} checkboxSelection />
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalHistory close={handleClose} />
      </Modal>
    </div>
  )
}
