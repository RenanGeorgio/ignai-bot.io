import React from 'react';
import { 
  PackageIcon,
  PercentageIcon, 
  ClockIcon,
  UsersIcon, 
  TruckIcon, 
  ChevronUpIcon, 
  ChevronDownIcon, 
  CircleCheckIcon 
} from '@/components/icons';
import '@/assets/styles/graph.css'; 

interface GraphThemesProps {
  month: string;
}
  
const GraphThemes: React.FC<GraphThemesProps> = ({ month }) => {
  return (
    <div className="graph-container-themes">
      <h3 className="graph-title">Temas de atendimento</h3>
      <h4 className='graph-subtitle'>12% increase in this month</h4>
      <div className="menu-icon-themes">&#8942;</div>
      <div className="data-row-themes">
        <div className="data-item">
          <div className="graph-themes-icon">
            <PackageIcon/>
          </div>
          <span className="data-text">Problemas com pedido</span>
          <div className="percentage-container">
            <ChevronUpIcon/>
            <h4>25.8%</h4>
          </div>
          <span className="data-number">200</span>
        </div>
      </div>
      <div className="data-row-themes">
        <div className="data-item">
          <div className="graph-themes-icon">        
            <TruckIcon/>
          </div>
          <span className="data-text">Problemas com transporte</span>
          <div className="percentage-container">
            <ChevronUpIcon/>
            <h4>4.3%</h4>
          </div>
          <span className="data-number">150</span>
        </div>
      </div>
      <div className="data-row-themes">
        <div className="data-item">
          <div className="graph-themes-icon">
            <CircleCheckIcon />
          </div>
          <span className="data-text">Pedido entregue no prazo</span>
          <div className="percentage-container">
            <ChevronDownIcon/>
            <h4>12.5%</h4>
          </div>
          <span className="data-number">100</span>
        </div>
      </div>
      <div className="data-row-themes">
        <div className="data-item">
          <div className="graph-themes-icon">
            <PercentageIcon/>
          </div>
          <span className="data-text">Preço do produto</span>
          <div className="percentage-container">
            <ChevronUpIcon/>
            <h4>35.6%</h4>
          </div>
          <span className="data-number">95</span>
        </div>
      </div>
      <div className="data-row-themes">
        <div className="data-item">
          <div className="graph-themes-icon">
            <ClockIcon/>
          </div>
          <span className="data-text">Tempo de entrega</span>
          <div className="percentage-container">
            <ChevronDownIcon/>
            <h4>2.15%</h4>
          </div>
          <span className="data-number">20</span>
        </div>
      </div>
      <div className="data-row-themes">
        <div className="data-item">
          <div className="graph-themes-icon">
            <UsersIcon />
          </div>
          <span className="data-text">Satisfação do cliente</span>
          <div className="percentage-container">
            <ChevronUpIcon/>
            <h4>5.7%</h4>
          </div>
          <span className="data-number">20</span>
        </div>
      </div>
    </div>
  );
};

export default GraphThemes;