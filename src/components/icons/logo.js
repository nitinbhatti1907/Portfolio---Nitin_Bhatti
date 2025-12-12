// src/components/logo.js
import React from 'react';

const Logo = ({ size = 28, className }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 64 64"
    role="img"
    aria-labelledby="logoTitle"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
  >
    <title id="logoTitle">NB monogram</title>

    {/* subtle glow */}
    <defs>
      <filter id="g" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.25" />
      </filter>

      {/* mask so the swoosh tucks under the letters a bit */}
      <mask id="nb-mask">
        <rect width="100%" height="100%" fill="white" />
        {/* “cut out” the letters slightly thicker so swoosh goes behind */}
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

    {/* red + cyan rings, behind letters via mask */}
    <g mask="url(#nb-mask)">
      <ellipse
        className="nb-ring nb-ring-red"
        cx="38"
        cy="36"
        rx="25"
        ry="13"
        transform="rotate(-25 38 36)"
        fill="none"
        stroke="#ef4444"
        strokeWidth="6"
        strokeLinecap="round"
        filter="url(#g)"
      />
      {/* slim cyan edge highlight */}
      <ellipse
        className="nb-ring nb-ring-cyan"
        cx="38"
        cy="36"
        rx="25"
        ry="13"
        transform="rotate(-25 38 36)"
        fill="none"
        stroke="#22d3ee"
        strokeOpacity="0.9"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
    </g>

    {/* NB letters on top */}
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

export default Logo;