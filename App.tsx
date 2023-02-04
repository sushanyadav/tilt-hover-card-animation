import * as React from 'react';
import './style.css';

const ParallaxTiltEffect = ({ tiltEffect = 'normal', children }) => {
  const containerRef = React.useRef(null);

  const width = 300;
  const height = 360;

  const handleMouseMove = (event: MouseEvent) => {
    let X: number;
    let Y: number;

    const { offsetX, offsetY } = event;

    if (tiltEffect === 'reverse') {
      X = (offsetX - width / 2) / 3 / 3;
      Y = -(offsetY - height / 2) / 3 / 3;
    } else if (tiltEffect === 'normal') {
      X = -(offsetX - width / 2) / 3 / 3;
      Y = (offsetY - height / 2) / 3 / 3;
    }

    containerRef.current.style.setProperty('--rY', X.toFixed(2));
    containerRef.current.style.setProperty('--rX', Y.toFixed(2));
  };

  const handleMouseEnter = () => {
    containerRef.current.classList.add('container--active');
  };

  const handleMouseLeave = () => {
    containerRef.current.classList.remove('container--active');
    containerRef.current.style.setProperty('--rY', 0);
    containerRef.current.style.setProperty('--rX', 0);
  };

  React.useEffect(() => {
    containerRef.current.addEventListener('mousemove', handleMouseMove);
    containerRef.current.addEventListener('mouseenter', handleMouseEnter);
    containerRef.current.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      containerRef.current.removeEventListener('mousemove', handleMouseMove);
      containerRef.current.removeEventListener('mouseenter', handleMouseEnter);
      containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="container" ref={containerRef} style={{ width, height }}>
      {children}
    </div>
  );
};

const App = () => {
  return (
    <div className="wrap">
      {/* Normal */}
      <ParallaxTiltEffect>
        <p>01. Normal</p>
      </ParallaxTiltEffect>

      {/* Reverse */}
      <ParallaxTiltEffect tiltEffect="reverse">
        <p>02. Reverse</p>
      </ParallaxTiltEffect>
    </div>
  );
};

export default App;
