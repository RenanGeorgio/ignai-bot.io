import React, { useEffect, useRef } from 'react'
import Chart, { ChartConfiguration } from 'chart.js/auto'
import styles from '@/assets/styles/graph.module.css'
import useChat from '@/hooks/useChat'

interface GraphTicketProps {
  data?: number[]
}

const GraphTicket: React.FC<GraphTicketProps> = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null)
  let chartInstance: Chart<'doughnut'> | null = null

  const { messages } = useChat()

  useEffect(() => {
    if (chartRef.current && messages) {
      const ctx = chartRef.current.getContext('2d')
      if (ctx) {
        const data = messages.reduce((acc: { [key: string]: number }, msg: any) => {
          if (acc[msg.chatId]) {
            acc[msg.chatId]++
          } else {
            acc[msg.chatId] = 1
          }
          return acc
        }, {})

        const counts = Object.values(data)
        const labels = counts.map(count => `Messagens: ${count}`)

        const chartData = {
          labels: labels,
          datasets: [
            {
              data: Object.values(data),
              backgroundColor: [
                'rgba(40, 199, 111, 1)',
                '#7dbe9a',
                '#95b6a4',
                '#abcab9',
              ],
              hoverOffset: 4,
            },
          ],
        }

        const chartConfig: ChartConfiguration<'doughnut'> = {
          type: 'doughnut',
          data: chartData,
          options: {
            cutout: '70%',
            plugins: {
              legend: {
                display: true,
                position: 'bottom'
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
  }, [messages])

  return (
    <div className={styles['graph-container-ticket']}>
      <h3 className={styles['graph-title-ticket-you']}>Quantidade de Mensagens por Conversa</h3>
      <canvas ref={chartRef} className={styles['canvas']}></canvas>
    </div>
  )
}

export default GraphTicket
