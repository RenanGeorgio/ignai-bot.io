import React, { useMemo } from 'react'
import { useListResultsQuery } from '@/features/results/hooks/useListResultsQuery'
import { parseResultHeader } from '@typebot.io/results/parseResultHeader'
import { parseCellContent } from '@/features/results/helpers/parseCellContent'
import { convertResultsToTableData } from '@typebot.io/results/convertResultsToTableData'
import { ResultsTable } from '@/features/results/components/table/ResultsTable'

export const ResultsPage = ({
  typebots,
}: {
  typebots:
    | {
        name: string
        id: string
        icon: string | null
        publishedTypebotId?: string | undefined
      }[]
    | undefined
}) => {
  const { data, fetchNextPage, hasNextPage } = useListResultsQuery({
    timeFilter: 'allTime',
    typebots,
    onError: (error) => {
      // showToast({ description: error })
      console.log(error)
    },
  })

  const resultHeader = useMemo(
    () =>
      data?.typebots
        ? data.typebots.flatMap((typebot) => {
            return parseResultHeader(typebot, [])
          })
        : [],
    [data?.typebots]
  )

  const tableData = useMemo(
    () =>
      typebots
        ? convertResultsToTableData(
            data?.results,
            resultHeader,
            parseCellContent
          )
        : [],
    [data, resultHeader, typebots]
  )
  return (
    <ResultsTable
      preferences={undefined}
      resultHeader={resultHeader}
      data={tableData}
      onScrollToBottom={fetchNextPage}
      hasMore={hasNextPage}
      timeFilter={'allTime'}
      onLogOpenIndex={() => {}} // TODO: implement
      onResultExpandIndex={() => {}} // TODO: implement
      onTimeFilterChange={() => {}}
    />
  )
}
