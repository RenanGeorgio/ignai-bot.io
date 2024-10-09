import { api } from '@/services/api'
import type { Templates } from '../types'

export async function createEmailTemplate(
  template: Templates
): Promise<Templates> {
  const res = await api.post('templates/email', {
    json: template,
  })

  if (!res.ok) {
    throw new Error('Falha ao criar o template de email')
  }

  return res.json()
}
