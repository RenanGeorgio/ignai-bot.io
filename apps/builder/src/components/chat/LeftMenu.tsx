import React, { useState, ReactNode, MouseEventHandler } from 'react';
import { Phone } from '@/components/icons';

import '@/assets/styles/leftmenu.css';

interface LeftMenuProps {
  onAddTicketClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}

export const LeftMenu: React.FC<LeftMenuProps> = ({ onAddTicketClick, children }) => {
  const [openPage, setOpenPage] = useState(false);
  const [openTicket, setOpenTicket] = useState(false);
  const [showAddTicket, setShowAddTicket] = useState(false);
  
  const toggleAddTicket: MouseEventHandler<HTMLButtonElement> = (event) => {
    setShowAddTicket(!showAddTicket);
    onAddTicketClick(event);
  };

  return (
    <div className="left-menu">
      <header className="header-left">
        <img
          className="icon-instance-node"
          src="https://c.animaapp.com/5uY2Jqwr/img/avatar-14@2x.png"
          alt="Avatar-14"
        />
        <input className="instance" placeholder="Search for contact..." />
      </header>

      <div className="div-3">
        <div className="heading">
          <button
            style={{ width: "100%" }}
            className={showAddTicket ? "blueButtonTicket" : "grayButtonTicket"}
            onClick={toggleAddTicket}
          >
            Adicionar&nbsp;&nbsp;ticket
            <span className="phoneCall">
              <Phone />
            </span>
          </button>
        </div>
        {children}
      </div>

      <div className="div-3">
        <div className="heading-3">
          <div className="text-wrapper-3">Leads</div>
        </div>
        <div className="div-content">
          <div className="listLeftLead">
            <div className="text-2">
              <img
                className="img-2"
                alt="World wide web PNG"
                src="https://c.animaapp.com/5uY2Jqwr/img/world-wide-web-png-pic-1-1@2x.png"
              />
              <div className="text-wrapper-10">Lead 04432</div>
              <div className="text-wrapper-9">Pedido de catálogo</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}