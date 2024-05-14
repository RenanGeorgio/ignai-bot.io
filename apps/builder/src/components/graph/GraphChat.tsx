import React, { useEffect, useRef } from 'react';
import Chart, { ChartConfiguration } from 'chart.js/auto';
import '@/assets/styles/graph.css';

interface GraphChatProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
      barPercentage?: number;
      fill?: boolean;
    }[];
  };
}

const GraphChat: React.FC<GraphChatProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  let chartInstance: Chart<'bar', number[], string> | null = null;

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        const chartConfig: ChartConfiguration<'bar', number[], string> = {
          type: 'bar', 
          data: {
            labels: ['1 Jan', '2 Jan', '3 Jan', '4 Jan', '5 Jan', '6 Jan', '7 Jan', '8 Jan', '9 Jan', '10 Jan'],
            datasets: [{
              label: 'Diário',
              data: [38, 45, 32, 38, 50, 45, 37, 42, 45, 36],  
              backgroundColor: 'rgba(255, 159, 67, 1)',
              borderColor: 'rgba(255, 205, 86, 1)',
              borderWidth: 1,
              barPercentage: 0.5,
            }, {
              type: 'bar',  
              label: 'Inscritos',
              data: [24, 28, 26, 29, 30, 40, 35, 31, 24, 28],
              borderColor: 'rgb(54, 162, 235)',
            }]
          },
          options: {
            indexAxis: 'x',
            scales: {
              y: {
                beginAtZero: true,
                max: 50,  
                ticks: {
                  callback: (value: string | number) => `${value}%` as string,  
                },
              },
              x: {
                grid: {
                  display: false,
                },
              },
            },
          },
        }
        
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
    <div className="graph-container">
      <canvas ref={chartRef} className="canvas-chart"></canvas>
    </div>
  );
};

export default GraphChat;