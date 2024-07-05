import * as React from 'react';
import './ControlPanel.module.css';

function ControlPanel() {
  return (
    <div className="control-panel">
      <h3>Mapa</h3>
      <p>Passe o mouse sobre os locais marcados para destaca-los.</p>
    </div>
  );
}

export default React.memo(ControlPanel);