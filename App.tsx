import * as React from 'react';
import './style.css';

import { TiltHoverCard } from './TiltHoverCard';

const App = () => {
  return (
    <div style={{ display: 'flex', gap: '36px' }}>
      {/* Normal */}
      <TiltHoverCard>
        <p>01. Normal</p>
      </TiltHoverCard>

      {/* Reverse */}
      <TiltHoverCard isReverse>
        <p>02. Reverse</p>
      </TiltHoverCard>
    </div>
  );
};

export default App;
