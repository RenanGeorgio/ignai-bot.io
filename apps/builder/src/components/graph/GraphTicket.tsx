import React, { useEffect, useRef } from 'react'
import Chart, { ChartConfiguration } from 'chart.js/auto'
import styles from '@/assets/styles/graph.module.css'

interface GraphTicketProps {
  data: number[]
}

const GraphTicket: React.FC<GraphTicketProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null)
  let chartInstance: Chart<'doughnut'> | null = null

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d')
      if (ctx) {
        const chartConfig: ChartConfiguration<'doughnut'> = {
          type: 'doughnut',
          data: {
            labels: [
              'Tempo de Entrega',
              'Preço do Produto',
              'Transporte',
              'Endereço Incorreto',
            ],
            datasets: [
              {
                data,
                backgroundColor: [
                  'rgba(40, 199, 111, 1)',
                  '#7dbe9a',
                  '#95b6a4',
                  '#abcab9',
                ],
                hoverOffset: 4,
              },
            ],
          },
          options: {
            cutout: '70%',
            plugins: {
              legend: {
                display: false,
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
  }, [data])

  return (
    <div className={styles['graph-container-ticket']}>
      <h3 className={styles['graph-title']}>
        Taxa de Solução de tickets pelo robô
      </h3>
      <div className={styles['menu-icon']}>&#8942;</div>
      <canvas ref={chartRef} className={styles['canvas-ticket']}></canvas>
      <div className={styles['legenda']}>
        <div>
          <span
            className={styles['legenda-cor']}
            style={{ backgroundColor: '#abcab9' }}
          ></span>
          <span className={styles['legenda-texto']}>Endereço Incorreto</span>
        </div>
        <div>
          <span
            className={styles['legenda-cor']}
            style={{ backgroundColor: 'rgba(40, 199, 111, 1)' }}
          ></span>
          <span className={styles['legenda-texto']}>Tempo de Entrega</span>
        </div>
      </div>
      <div className={styles['legenda']}>
        <div>
          <span
            className={styles['legenda-cor']}
            style={{ backgroundColor: '#7dbe9a' }}
          ></span>
          <span className={styles['legenda-texto']}>Preço do Produto</span>
        </div>
        <div>
          <span
            className={styles['legenda-cor']}
            style={{ backgroundColor: '#95b6a4' }}
          ></span>
          <span className={styles['legenda-texto']}>Transporte</span>
        </div>
      </div>
    </div>
  )
}

export default GraphTicket
