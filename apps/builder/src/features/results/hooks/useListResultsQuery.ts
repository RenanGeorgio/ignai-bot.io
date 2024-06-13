import { timeFilterValues } from '@/features/analytics/constants'
import { trpc } from '@/lib/trpc'
// import { Typebot } from '@typebot.io/prisma'

type Params = {
  timeFilter: (typeof timeFilterValues)[number]
  typebots: { id: string; name: string; icon: string | null; publishedTypebotId?: string | undefined; }[] | undefined
  onError?: (error: string) => void
}

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

export const useListResultsQuery = ({ timeFilter, typebots, onError }: Params) => {
  console.log(typebots)
  const { data, error, fetchNextPage, hasNextPage, refetch } =
    trpc.results.listTypebotsResults.useInfiniteQuery(
      {
        timeZone,
        timeFilter,
        typebotsIds: typebots?.map((typebot) => typebot.id) || [],
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    )

  if (error && onError) onError(error.message)
  return {
    data: data?.pages[0],
    isLoading: !error && !data,
    fetchNextPage,
    hasNextPage,
    refetch,
  }
}