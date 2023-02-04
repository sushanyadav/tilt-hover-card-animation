import * as React from 'react';

import './tilt-hover-card.css';

interface TiltHoverCardProps {
  tiltEffect?: 'normal' | 'reverse';
}

export const TiltHoverCard = ({
  tiltEffect = 'normal',
  children,
}: React.PropsWithChildren<TiltHoverCardProps>) => {
  const containerRef = React.useRef(null);

  const handleMouseMove = (event: MouseEvent) => {
    const height = containerRef.current.clientHeight;
    const width = containerRef.current.clientWidth;

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
    containerRef.current.classList.add('container--active'); // see tilt-hover-card.css
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
    <div className="wrap">
      <div className="container" ref={containerRef}>
        {children}
      </div>
    </div>
  );
};
