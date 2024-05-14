import { useState } from 'react';

import Layout from '@/components/chat/layout/ChatLayout';
import History from '@/components/chat/layout/HistoryLayout';
import GraphChat from '@/components/graph/GraphChat';
import GraphTicket from '@/components/graph/GraphTicket';
import GraphTicketYou from '@/components/graph/GraphTicketYou';
import GraphThemes from '@/components/graph/GraphThemes';

import '@/assets/styles/forms.css';

const Chat: React.FC = () => {
  const [activePage, setActivePage] = useState("Atendimento");
  const handleButtonClick = (pageName: string) => {
    setActivePage(pageName);
  };

  return (
    <div style={{ overflow: "hidden" }} className="page-content">
      <div className="button-container">
        <button
          className={activePage === "Atendimento" ? "blueButtonChat" : "grayButtonChat"}
          onClick={() => handleButtonClick("Atendimento")}
        >
          Atendimento
        </button>
        <button
          className={activePage === "Histórico" ? "blueButtonChat" : "grayButtonChat"}
          onClick={() => handleButtonClick("Histórico")}
        >
          Histórico
        </button>
        <button
          className={activePage === "Painel" ? "blueButtonChat" : "grayButtonChat"}
          onClick={() => handleButtonClick("Painel")}
        >
          Painel
        </button>
      </div>
      <div>
        {activePage === "Atendimento" && (
          <div>
            <Layout />
          </div>
        )}
        {activePage === "Histórico" && (
          <>
            <History />
          </>
        )}
        {activePage === "Painel" && (
          <>
            <div className="graph-row">
              <GraphChat data={{datasets: [], labels:[] }}/>
              <GraphTicket data={[50, 30, 20, 10]} />
            </div>
            <div className="graph-row">
              <GraphThemes month={""} />
              <GraphTicketYou data={[50, 30, 20, 10]} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;