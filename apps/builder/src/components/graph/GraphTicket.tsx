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

  const { messages, currentChat } = useChat()

  useEffect(() => {
    if (chartRef.current && messages && currentChat) {
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

        const messageCount = data[currentChat._id] || 0
        const platform = currentChat.origin.platform
        const status = currentChat.status

        const labels = [
          `Messagens: ${messageCount}`,
          `Plataforma: ${platform}`,
          `Status: ${status}`
        ]

        const chartData = {
          labels: labels,
          datasets: [
            {
              data: [messageCount, 1, 1],
              backgroundColor: [
                'rgba(40, 199, 111, 1)',
                '#7dbe9a',
                '#b3cfc0'
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
                position: 'bottom',
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
      <h3 className={styles['graph-title-ticket-you']}>Dados da Conversa</h3>
      {messages && messages.length > 0 ? (
        <canvas ref={chartRef} className={styles['canvas']}></canvas>
      ) : (
        <p className={styles['canvasMessage']}>Selecione uma conversa para visualizar a quantidade de mensagens!</p>
      )}
    </div>
  )
}

export default GraphTicket
