import React, { useEffect, useRef } from 'react'
import Chart, { ChartConfiguration, ChartDataset } from 'chart.js/auto'
import styles from '@/assets/styles/graph.module.css'
import useUser from '@/hooks/useUser'

interface GraphTicketYouProps {
  data?: number[]
}

const GraphTicketYou: React.FC<GraphTicketYouProps> = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null)
  let chartInstance: Chart<'doughnut'> | null = null

  const { user } = useUser()

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d')
      if (ctx) {
        const data: ChartDataset<'doughnut', number[]>[] = [
          {
            label: 'Dados do Usuário',
            data: [
              user.name ? 1 : 0,
              user.email ? 1 : 0,
            ],
            backgroundColor: [
              'rgba(40, 199, 111, 1)',
              '#95b6a4',
            ],
            hoverOffset: 4,
          },
        ]

        const chartConfig: ChartConfiguration<'doughnut'> = {
          type: 'doughnut',
          data: {
            labels: ['Nome', 'Email'],
            datasets: data,
          },
          options: {
            cutout: '70%',
            plugins: {
              legend: {
                display: true,
                position: 'bottom',
                labels: {
                  generateLabels: (chart) => {
                    const data = chart.data
                    return data.labels?.map((label, index) => {
                      let value = ''
                      switch (label) {
                        case 'Nome':
                          value = user.name || 'N/A'
                          break
                        case 'Email':
                          value = user.email || 'N/A'
                          break
                      }
                      return {
                        text: `${label}: ${value}`,
                        fillStyle: (data.datasets[0] as any).backgroundColor[index],
                        hidden: false,
                        lineCap: 'butt',
                        lineDash: [],
                        lineDashOffset: 0,
                        lineJoin: 'miter',
                        strokeStyle: 'rgba(0,0,0,0.1)',
                        pointStyle: 'circle',
                        rotation: 0
                      }
                    }) || []
                  },
                  usePointStyle: true,
                  padding: 20,
                  boxWidth: 20,
                  boxHeight: 20,
                  font: {
                    size: 13
                  },
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
  }, [user])

  return (
    <div className={styles['graph-container-ticket']}>
      <h3 className={styles['graph-title-ticket']}>
        Dados do Usuário
      </h3>
      <canvas ref={chartRef} className={styles['canvas']}></canvas>
    </div>
  )
}

export default GraphTicketYou
