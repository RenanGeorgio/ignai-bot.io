import React, { useEffect, useRef } from 'react';
import Chart, { ChartConfiguration } from 'chart.js/auto';
import '@/assets/styles/graph.css';

interface GraphTicketYouProps {
  data: number[];
}

const GraphTicketYou: React.FC<GraphTicketYouProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  let chartInstance: Chart<'doughnut'> | null = null;

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        const chartConfig: ChartConfiguration<'doughnut'> = {
          type: 'doughnut',
          data: {
            labels: ['Tempo de Entrega', 'Preço do Produto', 'Transporte', 'Endereço Incorreto'],
            datasets: [{
              data,
              backgroundColor: [
                'rgba(40, 199, 111, 1)',
                '#7dbe9a',
                '#95b6a4',
                '#abcab9',
              ],
              hoverOffset: 4,
            }],
          },
          options: {
            cutout: '70%',
            plugins: {
              legend: {
                display: false,
              },
            },
          },
        };

        if (chartInstance) {
          chartInstance.destroy();
        }

        chartInstance = new Chart(ctx, chartConfig);
      }
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [data]);

  return (
    <div className="graph-container-ticket">
      <h3 className="graph-title">Taxa de Solução de tickets por você</h3>
      <div className="menu-icon-you">&#8942;</div>
      <canvas ref={chartRef} className="canvas-ticket-you"></canvas>
      <div className="legenda">
        <div>
          <span className="legenda-cor" style={{ backgroundColor: '#abcab9' }}></span>
          <span className="legenda-texto">Endereço Incorreto</span>
        </div>
        <div>
          <span className="legenda-cor" style={{ backgroundColor: 'rgba(40, 199, 111, 1)' }}></span>
          <span className="legenda-texto">Tempo de Entrega</span>
        </div>
      </div>
      <div className="legenda">
        <div>
          <span className="legenda-cor" style={{ backgroundColor: '#7dbe9a' }}></span>
          <span className="legenda-texto">Preço do Produto</span>
        </div>
        <div>
          <span className="legenda-cor" style={{ backgroundColor: '#95b6a4' }}></span>
          <span className="legenda-texto">Transporte</span>
        </div>
      </div>
    </div>
  );
};

export default GraphTicketYou;