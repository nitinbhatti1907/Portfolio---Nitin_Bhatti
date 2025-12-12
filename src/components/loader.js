// src/components/loader.js
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import anime from 'animejs';
import styled, { keyframes } from 'styled-components';

const drawRing = keyframes`
  0% {
    stroke-dashoffset: 260;
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  70% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 0.4;
  }
`;

const StyledLoader = styled.div`
  ${({ theme }) => theme.mixins.flexCenter};
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  background-color: var(--dark-navy);
  z-index: 99;

  .logo-wrapper {
    width: max-content;
    max-width: 110px;
    transition: var(--transition);
    opacity: ${props => (props.isMounted ? 1 : 0)};
  }

  .logo-wrapper svg {
    display: block;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    fill: none;
    user-select: none;
  }

  /* ⬇️ SAME ANIMATION AS FOOTER LOGO */
  .logo-wrapper svg #ring-red,
  .logo-wrapper svg #ring-cyan {
    stroke-dasharray: 260;
    stroke-dashoffset: 260;
    animation: ${drawRing} 1.5s ease-in-out infinite;
  }

  .logo-wrapper svg #ring-cyan {
    animation-delay: 0.4s;
  }
`;

/** NB loader logo: NB always visible, rings animated via CSS */
const LoaderLogo = () => (
  <svg
    id="loader-logo"
    viewBox="0 0 64 64"
    role="img"
    aria-labelledby="loaderLogoTitle"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
  >
    <title id="loaderLogoTitle">NB monogram loader</title>

    <defs>
      <filter id="loader-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.25" />
      </filter>

      {/* mask so the rings tuck under the letters a bit */}
      <mask id="loader-nb-mask">
        <rect width="100%" height="100%" fill="white" />
        <text
          x="10"
          y="44"
          fontFamily="InterVariable, Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
          fontWeight="900"
          fontSize="30"
          letterSpacing="1"
          fill="black"
        >
          NB
        </text>
      </mask>
    </defs>

    {/* Saturn rings */}
    <g mask="url(#loader-nb-mask)">
      <ellipse
        id="ring-red"
        cx="36"
        cy="36"
        rx="26"
        ry="16"
        transform="rotate(-25 36 36)"
        fill="none"
        stroke="#ef4444"
        strokeWidth="6"
        strokeLinecap="round"
        filter="url(#loader-glow)"
      />
      <ellipse
        id="ring-cyan"
        cx="36"
        cy="36"
        rx="26"
        ry="16"
        transform="rotate(-25 36 36)"
        fill="none"
        stroke="#22d3ee"
        strokeOpacity="0.9"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
    </g>

    {/* NB letters — always visible */}
    <text
      x="10"
      y="44"
      fontFamily="InterVariable, Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
      fontWeight="900"
      fontSize="30"
      letterSpacing="1"
      fill="#e6f1ff"
      style={{ paintOrder: 'stroke', stroke: '#22d3ee', strokeWidth: 1 }}
    >
      NB
    </text>
  </svg>
);

const Loader = ({ finishLoading }) => {
  const [isMounted, setIsMounted] = useState(false);

  const animate = () => {
    const loader = anime.timeline({
      complete: () => finishLoading(),
    });

    loader
      // Rings are now CSS-animated; we only handle fade/scale out here
      .add({
        targets: '#loader-logo',
        delay: 1600, // let the ring animation play a bit
        duration: 420,
        easing: 'easeInOutQuart',
        opacity: 0,
        scale: 0.7,
      })
      .add({
        targets: '.loader',
        duration: 240,
        easing: 'easeInOutQuart',
        opacity: 0,
        zIndex: -1,
      });
  };

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 10);
    animate();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <StyledLoader className="loader" isMounted={isMounted}>
      <Helmet bodyAttributes={{ class: `hidden` }} />
      <div className="logo-wrapper">
        <LoaderLogo />
      </div>
    </StyledLoader>
  );
};

Loader.propTypes = {
  finishLoading: PropTypes.func.isRequired,
};

export default Loader;
