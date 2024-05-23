import React from 'react'
import {
  PackageIcon,
  PercentageIcon,
  ClockIcon,
  UsersIcon,
  TruckIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  CircleCheckIcon,
} from '@/components/icons'
import styles from '@/assets/styles/graph.module.css'

interface GraphThemesProps {
  month?: string;
}

const GraphThemes: React.FC<GraphThemesProps> = () => {
  return (
    <div className={styles['graph-container-themes']}>
      <h3 className={styles['graph-title']}>Temas de atendimento</h3>
      <h4 className={styles['graph-subtitle']}>12% increase in this month</h4>
      <div className={styles['menu-icon-themes']}>&#8942;</div>
      <div className={styles['data-row-themes']}>
        <div className={styles['data-item']}>
          <div className={styles['graph-themes-icon']}>
            <PackageIcon />
          </div>
          <span className={styles['data-text']}>Problemas com pedido</span>
          <div className={styles['percentage-container']}>
            <ChevronUpIcon />
            <h4>25.8%</h4>
          </div>
          <span className={styles['data-number']}>200</span>
        </div>
      </div>
      <div className={styles['data-row-themes']}>
        <div className={styles['data-item']}>
          <div className={styles['graph-themes-icon']}>
            <TruckIcon />
          </div>
          <span className={styles['data-text']}>Problemas com transporte</span>
          <div className={styles['percentage-container']}>
            <ChevronUpIcon />
            <h4>4.3%</h4>
          </div>
          <span className={styles['data-number']}>150</span>
        </div>
      </div>
      <div className={styles['data-row-themes']}>
        <div className={styles['data-item']}>
          <div className={styles['graph-themes-icon']}>
            <CircleCheckIcon />
          </div>
          <span className={styles['data-text']}>Pedido entregue no prazo</span>
          <div className={styles['percentage-container']}>
            <ChevronDownIcon />
            <h4>12.5%</h4>
          </div>
          <span className={styles['data-number']}>100</span>
        </div>
      </div>
      <div className={styles['data-row-themes']}>
        <div className={styles['data-item']}>
          <div className={styles['graph-themes-icon']}>
            <PercentageIcon />
          </div>
          <span className={styles['data-text']}>Preço do produto</span>
          <div className={styles['percentage-container']}>
            <ChevronUpIcon />
            <h4>35.6%</h4>
          </div>
          <span className={styles['data-number']}>95</span>
        </div>
      </div>
      <div className={styles['data-row-themes']}>
        <div className={styles['data-item']}>
          <div className={styles['graph-themes-icon']}>
            <ClockIcon />
          </div>
          <span className={styles['data-text']}>Tempo de entrega</span>
          <div className={styles['percentage-container']}>
            <ChevronDownIcon />
            <h4>2.15%</h4>
          </div>
          <span className={styles['data-number']}>20</span>
        </div>
      </div>
      <div className={styles['data-row-themes']}>
        <div className={styles['data-item']}>
          <div className={styles['graph-themes-icon']}>
            <UsersIcon />
          </div>
          <span className={styles['data-text']}>Satisfação do cliente</span>
          <div className={styles['percentage-container']}>
            <ChevronUpIcon />
            <h4>5.7%</h4>
          </div>
          <span className={styles['data-number']}>20</span>
        </div>
      </div>
    </div>
  )
}

export default GraphThemes
