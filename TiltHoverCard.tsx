// taken from: https://codepen.io/Coding_Journey/pen/RwGzqgJ

import * as React from 'react';

import './tilt-hover-card.css';

interface TiltHoverCardProps {
  max?: number; // max tilt rotation (degrees (deg))
  perspective?: number; // transform perspective, the lower the more extreme the tilt gets (pixels (px))
  scale?: number; // transform scale - 2 = 200%, 1.5 = 150%, etc..
  speed?: number; // speed (transition-duration) of the enter/exit transition (milliseconds (ms))
  easing?: string; // easing (transition-timing-function) of the enter/exit transition
  isReverse?: boolean;
}

export const TiltHoverCard = ({
  children,
  max = 15,
  perspective = 1600,
  scale = 1.1,
  speed = 1500,
  easing = 'cubic-bezier(.03,.98,.52,.99)',
  isReverse = false,
}: React.PropsWithChildren<TiltHoverCardProps>) => {
  const cardRef = React.useRef(null);

  // set the transition
  const setTransition = () => {
    const card = cardRef.current;

    clearTimeout(card.transitionTimeoutId);
    card.style.transition = `transform ${speed}ms ${easing}`;

    card.transitionTimeoutId = setTimeout(() => {
      card.style.transition = '';
    }, speed);
  };

  // handle mouse enter event
  const handleMouseEnter = () => {
    setTransition();
  };

  // handle mouse move event
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { offsetWidth, offsetHeight, offsetLeft, offsetTop, style } =
      cardRef.current;

    const cardWidth = offsetWidth;
    const cardHeight = offsetHeight;

    const centerX = offsetLeft + cardWidth / 2;
    const centerY = offsetTop + cardHeight / 2;

    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;

    const rotateXUncapped = (+1 * max * mouseY) / (cardHeight / 2);
    const rotateYUncapped = (-1 * max * mouseX) / (cardWidth / 2);

    type Direction = 'X' | 'Y';

    const getRotateDeg = (direction: Direction) => {
      const _rotateUnCapped: Record<Direction, number> = {
        X: rotateXUncapped,
        Y: rotateYUncapped,
      };

      const rotateUnCapped = _rotateUnCapped[direction];

      if (rotateUnCapped < -max) {
        return -max;
      }

      if (rotateUnCapped > max) {
        return rotateUnCapped > max;
      }

      return rotateUnCapped;
    };

    const rotateX = getRotateDeg('X');
    const rotateY = getRotateDeg('Y');

    // apply transform styles
    style.transform = `perspective(${perspective}px) rotateX(${
      isReverse ? -rotateX : rotateX
    }deg) rotateY(${isReverse ? -rotateY : rotateY}deg) 
                        scale3d(${scale}, ${scale}, ${scale})`;
  };

  // handle mouse leave event
  const handleMouseLeave = () => {
    const card = cardRef.current;
    // reset transform styles
    card.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    setTransition();
  };

  return (
    <div
      ref={cardRef}
      className="card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {children}
    </div>
  );
};
