import * as React from 'react';
import './style.css';

import { TiltHoverCard } from './TiltHoverCard';

const App = () => {
  return (
    <div className="wrap">
      {/* Normal */}
      <TiltHoverCard>
        <p>01. Normal</p>
      </TiltHoverCard>

      {/* Reverse */}
      <TiltHoverCard tiltEffect="reverse">
        <p>02. Reverse</p>
      </TiltHoverCard>
    </div>
  );
};

export default App;
