import React, { useEffect, useRef } from 'react'
import Chart, { ChartConfiguration } from 'chart.js/auto'
import styles from '@/assets/styles/graph.module.css'
import useChat from '@/hooks/useChat'

interface GraphChatProps {
  data: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    datasets: any[]
    labels: string[]
  }
}

const GraphChat: React.FC<GraphChatProps> = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null)
  let chartInstance: Chart<'bar'> | null = null

  const { userChats } = useChat()

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d')
      if (ctx) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const labels = userChats.map((chat: any, index: number) => {
          const platform = chat.origin.platform.charAt(0).toUpperCase() + chat.origin.platform.slice(1)
          const status = chat.status.charAt(0).toUpperCase() + chat.status.slice(1)
          return `Chat ${index + 1} - ${platform} (${status})`
        })

        const data = {
          labels: labels,
          datasets: [
            {
              label: 'Quantidade de Membros',
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              data: userChats.map((chat: any) => chat.members.length),
              backgroundColor: 'rgba(40, 199, 111, 1)',
              hoverOffset: 4,
            },
          ],
        }

        const chartConfig: ChartConfiguration<'bar'> = {
          type: 'bar',
          data,
          options: {
            plugins: {
              legend: {
                display: true,
                position: 'bottom',
                labels: {
                  boxWidth: 20,
                  font: {
                    size: 10,
                  },
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1,
                },
              },
            },
          },
        }

        if (chartInstance) {
          chartInstance.destroy()
        }

        chartInstance = new Chart(ctx, chartConfig)
      }
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy()
      }
    }
  }, [userChats])

  return (
    <div className={styles['graph-container']}>
      <h3 className={styles['graph-title']}>Quantidade de Chats Disponíveis</h3>
      <canvas ref={chartRef}></canvas>
    </div>
  )
}

export default GraphChat
