import { useContext } from 'react'
import { ClientsContext } from '../contexts/ClientsContext'

export const useClients = () => useContext(ClientsContext)