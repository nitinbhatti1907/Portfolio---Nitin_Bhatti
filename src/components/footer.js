// src/components/footer.js
import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Icon } from '@components/icons';
import { socialMedia } from '@config';

/* ===== Animations for logo rings ===== */
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

/* ===== Layout ===== */
const StyledFooter = styled.footer`
  position: relative;
  z-index: 50;          /* footer stays in front */
  isolation: isolate;   /* ensures stacking works cleanly */

  padding: 18px 24px 20px;
  ${({ theme }) => theme.mixins.flexBetween};
  align-items: center;
  gap: 16px;
  border-top: 1px solid var(--light-navy);

  /* keeps same look but paints a layer */
  background: inherit;

  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 18px 16px 22px;
    gap: 10px;
  }
`;

/* Left side: logo + name + location */
const StyledBrandSide = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const StyledLogoWrapper = styled.div`
  position: relative;
  width: 44px;
  height: 44px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;   /* no ball */
  box-shadow: none;          /* remove orb glow */
`;

/* SVG itself so we can animate rings */
const StyledLogoSvg = styled.svg`
  display: block;
  width: 100%;
  height: 100%;
  fill: none;
  user-select: none;

  .ring-red,
  .ring-cyan {
    stroke-dasharray: 260;
    stroke-dashoffset: 260;
    animation: ${drawRing} 3s ease-in-out infinite;
  }

  .ring-cyan {
    animation-delay: 0.4s;
  }
`;

const StyledNameBlock = styled.div`
  min-width: 0;
  text-align: left;

  .name {
    font-size: clamp(14px, 1.9vw, 18px);
    font-weight: 600;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: transparent;
    background: linear-gradient(
      90deg,
      rgba(148, 163, 184, 0.9),
      rgba(94, 234, 212, 1),
      rgba(56, 189, 248, 0.9)
    );
    background-clip: text;
    -webkit-background-clip: text;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .location {
    margin-top: 3px;
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: var(--light-slate);
    opacity: 0.85;
  }

  @media (max-width: 768px) {
    text-align: left;
  }
`;

/* Right side: copyright */
const StyledCredit = styled.div`
  color: var(--light-slate);
  font-family: var(--font-mono);
  font-size: var(--fz-xxs);
  line-height: 1.5;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-align: right;
  opacity: 0.9;

  .meta {
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    gap: 6px;
  }

  .dot {
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    text-align: center;

    .meta {
      justify-content: center;
    }
  }
`;

/* Optional: mobile-only socials, still filtering GitHub/LinkedIn out */
const StyledSocialLinks = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    max-width: 270px;
    margin: 0 auto 4px;
    color: var(--light-slate);
  }

  ul {
    ${({ theme }) => theme.mixins.flexBetween};
    padding: 0;
    margin: 0 0 6px;
    list-style: none;

    a {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
      border-radius: 999px;
      border: 1px solid rgba(148, 163, 184, 0.28);
      background: radial-gradient(circle at top, rgba(15, 23, 42, 0.96), rgba(15, 23, 42, 0.98));
      backdrop-filter: blur(6px);
      transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;

      &:hover,
      &:focus-visible {
        transform: translateY(-2px) scale(1.05);
        border-color: rgba(100, 255, 218, 0.7);
        box-shadow: 0 0 14px rgba(100, 255, 218, 0.35);
        outline: none;
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

/* Reuse NB logo design from loader, just with CSS animation instead of anime.js */
const NBFooterLogo = () => (
  <StyledLogoSvg
    viewBox="0 0 64 64"
    role="img"
    aria-labelledby="footerLogoTitle"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
  >
    <title id="footerLogoTitle">NB monogram</title>

    <defs>
      <filter id="footer-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.25" />
      </filter>

      <mask id="footer-nb-mask">
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
    <g mask="url(#footer-nb-mask)">
      <ellipse
        className="ring-red"
        cx="36"
        cy="36"
        rx="26"
        ry="16"
        transform="rotate(-25 36 36)"
        fill="none"
        stroke="#ef4444"
        strokeWidth="6"
        strokeLinecap="round"
        filter="url(#footer-glow)"
      />
      <ellipse
        className="ring-cyan"
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

    {/* NB letters */}
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
  </StyledLogoSvg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const el = footerRef.current;
    if (!el) return;

    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const overlap = Math.min(rect.height, Math.max(0, window.innerHeight - rect.top));
      document.documentElement.style.setProperty('--footer-overlap', `${overlap}px`);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      document.documentElement.style.setProperty('--footer-overlap', '0px');
    };
  }, []);

  // Remove any GitHub / LinkedIn entries from footer social links
  const filteredSocialMedia = Array.isArray(socialMedia)
    ? socialMedia.filter(({ name }) => {
        if (!name) return true;
        const id = String(name).toLowerCase();
        return !id.includes('github') && !id.includes('linkedin');
      })
    : [];

  return (
    <StyledFooter ref={footerRef}>
      {/* mobile socials (if any, except github/linkedin) */}
      {filteredSocialMedia.length > 0 && (
        <StyledSocialLinks>
          <ul>
            {filteredSocialMedia.map(({ name, url }, i) => (
              <li key={i}>
                <a href={url} aria-label={name}>
                  <Icon name={name} />
                </a>
              </li>
            ))}
          </ul>
        </StyledSocialLinks>
      )}

      {/* Left side: logo + name + location */}
      <StyledBrandSide>
        <StyledLogoWrapper aria-label="Nitin Bhatti logo">
          <NBFooterLogo />
        </StyledLogoWrapper>

        <StyledNameBlock>
          <div className="name">NITIN BHATTI</div>
          <div className="location">Ontario, Canada</div>
        </StyledNameBlock>
      </StyledBrandSide>

      {/* Right side: copyright (kept) */}
      <StyledCredit tabIndex="-1">
        <div className="meta">
          <span>© {currentYear}</span>
          <span className="dot">•</span>
          <span>Designed &amp; Built by Nitin Bhatti</span>
        </div>
      </StyledCredit>
    </StyledFooter>
  );
};

export default Footer;