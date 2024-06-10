import { ResultsPage } from '../../features/dashboard/components/ResultsPage'
import { useWorkspace } from '@/features/workspace/WorkspaceProvider'
import { useTypebots } from '@/features/dashboard/hooks/useTypebots'
import { useToast } from '@/hooks/useToast'

export default function Results() {
  const { workspace } = useWorkspace()
  const { showToast } = useToast()
  const {
    typebots,
    isLoading: isTypebotLoading,
    refetch: refetchTypebots,
  } = useTypebots({
    workspaceId: workspace?.id,
    folderId: 'root',
    onError: (error) => {
      showToast({
        description: error.message,
      })
    },
  })
  if (isTypebotLoading) {
    return <>loading...</>
  }

  return <ResultsPage typebots={typebots} />
}