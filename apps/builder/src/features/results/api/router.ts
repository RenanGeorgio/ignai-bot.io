import { router } from '@/helpers/server/trpc'
import { deleteResults } from './deleteResults'
import { getResultLogs } from './getResultLogs'
import { getResults } from './getResults'
import { getResult } from './getResult'
import { listTypebotsResults } from './listTypebotsResults'

export const resultsRouter = router({
  getResults,
  getResult,
  deleteResults,
  getResultLogs,
  listTypebotsResults
})
