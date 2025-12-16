// src/components/nav.js
import React, { useEffect, useRef, useState } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

const GlobalAnchorOffset = createGlobalStyle`
  /* Prevent headings from being hidden under the sticky bar */
  section[id] { scroll-margin-top: var(--header-offset, 76px); }
`;

/* ✨ same vibe as the hero button */
const buttonPulse = keyframes`
  0% {
    box-shadow:
      0 0 0 rgba(34, 211, 238, 0.0),
      0 0 14px rgba(34, 211, 238, 0.25);
  }
  50% {
    box-shadow:
      0 0 22px rgba(34, 211, 238, 0.6),
      0 0 52px rgba(34, 211, 238, 0.35);
  }
  100% {
    box-shadow:
      0 0 0 rgba(34, 211, 238, 0.0),
      0 0 14px rgba(34, 211, 238, 0.25);
  }
`;

const cometFly = keyframes`
  0%   { transform: translateX(-130%) translateY(-50%); opacity: 0; }
  20%  { opacity: 1; }
  60%  { transform: translateX(130%) translateY(-50%); opacity: 1; }
  100% { transform: translateX(170%) translateY(-50%); opacity: 0; }
`;

/* 🪐 EXACT ring creation animation (same as footer) */
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

const menuFadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(8px) scale(0.97);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

/* ✅ Same SVG animation approach as footer */
const StyledNavLogoSvg = styled.svg`
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

  @media (prefers-reduced-motion: reduce) {
    .ring-red,
    .ring-cyan {
      animation: none;
      stroke-dashoffset: 0;
      opacity: 1;
    }
  }
`;

const NBNavLogo = (props) => (
  <StyledNavLogoSvg
    viewBox="0 0 64 64"
    role="img"
    aria-labelledby="navLogoTitle"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    {...props}
  >
    <title id="navLogoTitle">NB monogram</title>

    <defs>
      {/* renamed ids to avoid conflicts with footer */}
      <filter id="nav-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.25" />
      </filter>

      <mask id="nav-nb-mask">
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
    <g mask="url(#nav-nb-mask)">
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
        filter="url(#nav-glow)"
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
  </StyledNavLogoSvg>
);

const Wrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;

  /* full-bleed background (KEEP SAME TECHNIQUE) */
  left: 0;
  right: 0;

  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);

  /* ✅ FIX: prevent the tiny mobile extra width that creates right-side space */
  @supports (width: 100svw) {
    width: 100svw;
    margin-left: calc(50% - 50svw);
    margin-right: calc(50% - 50svw);
  }

  @supports (width: 100dvw) {
    width: 100dvw;
    margin-left: calc(50% - 50dvw);
    margin-right: calc(50% - 50dvw);
  }

  overflow-x: clip;

  @supports not (overflow: clip) {
    overflow-x: hidden;
  }


  backdrop-filter: ${(p) => (p.$stuck ? 'blur(8px)' : 'none')};
  background: ${(p) => (p.$stuck ? 'rgba(2, 12, 27, 0.65)' : 'transparent')};
  border-bottom: ${(p) =>
    p.$stuck ? '1px solid rgba(100, 255, 218, 0.18)' : 'transparent'};
  transition: background 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
`;

const Progress = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  pointer-events: none;
  z-index: 1001;

  &:after {
    content: '';
    display: block;
    height: 100%;
    width: var(--scroll-progress, 0%);
    transform-origin: left center;
    background: var(--green);
    transition: width 0.1s linear;
  }
`;

const Bar = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${(p) => (p.$stuck ? '10px 20px' : '12px 20px')};

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  transition: padding 0.2s ease;

  /* ✅ FIX: make sure this flex row never forces extra width */
  width: 100%;
  box-sizing: border-box;
  min-width: 0;

  /* === brand / logo === */
  .brand {
    display: inline-flex;
    align-items: center;
    height: 36px;
    line-height: 0;
    padding: 0;

    /* ✅ FIX: keep space for burger and prevent logo from pushing width */
    min-width: 0;
    max-width: calc(100% - 52px);
  }

  .brand > svg.brand-logo {
    display: block;
    height: 135%;
    width: auto;
    overflow: visible;
    transform: ${(p) => (p.$stuck ? 'scale(1.55)' : 'scale(1.68)')};
    transform-origin: left center;
    margin: -5px 0 -5px;

    /* ✅ FIX: hard cap just to avoid ultra-small screens overflow */
    max-width: 92px;
  }

  /* === links (desktop) === */
  .links {
    display: flex;
    align-items: center;
    gap: 18px;
  }

  a.navlink {
    position: relative;
    color: var(--slate);
    font-weight: 600;
    letter-spacing: 0.2px;
    text-decoration: none;
    padding: 6px 8px;
    border-radius: 8px;
    transition: color 0.18s ease, text-shadow 0.18s ease;

    &::before,
    &::after {
      content: '';
      position: absolute;
      left: 16%;
      right: 16%;
      height: 2px;
      border-radius: 999px;
      background: linear-gradient(
        90deg,
        rgba(15, 118, 143, 0),
        rgba(34, 211, 238, 0.8),
        rgba(15, 118, 143, 0)
      );
      transform-origin: center;
      transform: scaleX(0);
      opacity: 0;
      transition: transform 0.22s ease-out, opacity 0.22s ease-out;
      pointer-events: none;
    }

    &::before {
      top: 0;
    }
    &::after {
      bottom: 0;
    }
  }

  a.navlink:hover,
  a.navlink:focus-visible {
    color: var(--lightest-slate);
    text-shadow: 0 0 4px rgba(15, 118, 143, 0.8);
    outline: none;
  }

  a.navlink:hover::before,
  a.navlink:hover::after,
  a.navlink:focus-visible::before,
  a.navlink:focus-visible::after {
    opacity: 1;
    transform: scaleX(1);
  }

  /* 🌌 Resume pill */
  .resume {
    position: relative;
    margin-left: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 9px 18px;
    border-radius: 999px;
    border: 1px solid rgba(34, 211, 238, 0.85);
    font-family: var(--font-mono);
    font-weight: 600;
    letter-spacing: 0.06em;
    text-decoration: none;
    color: var(--green);

    background:
      radial-gradient(circle at 0% 0%, rgba(34, 211, 238, 0.16), transparent 60%),
      radial-gradient(circle at 120% 120%, rgba(56, 189, 248, 0.22), transparent 65%),
      rgba(7, 13, 28, 0.98);

    overflow: hidden;
    transform: translateZ(0);
    transition:
      background 0.35s ease,
      color 0.2s ease,
      transform 0.2s ease,
      border-color 0.2s ease,
      box-shadow 0.2s ease;
  }

  .resume::before {
    content: '';
    position: absolute;
    inset: -40%;
    background-image:
      radial-gradient(1px 1px at 18% 30%, rgba(248, 250, 252, 0.9), transparent 55%),
      radial-gradient(1px 1px at 60% 80%, rgba(248, 250, 252, 0.75), transparent 55%),
      radial-gradient(1px 1px at 85% 40%, rgba(248, 250, 252, 0.85), transparent 55%);
    opacity: 0;
    mix-blend-mode: screen;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }

  .resume::after {
    content: '';
    position: absolute;
    left: -130%;
    top: 50%;
    width: 140%;
    height: 2px;
    background: linear-gradient(
      90deg,
      rgba(248, 250, 252, 0),
      rgba(248, 250, 252, 0.95),
      rgba(248, 250, 252, 0)
    );
    opacity: 0;
    pointer-events: none;
  }

  .resume:hover,
  .resume:focus-visible {
    background: radial-gradient(
      circle at 10% 0%,
      rgba(56, 189, 248, 0.3),
      rgba(34, 211, 238, 0.98)
    );
    color: #020617;
    border-color: rgba(56, 189, 248, 0.98);
    transform: translateY(-1px);
    animation: ${buttonPulse} 1.4s ease-in-out infinite;
    outline: none;
  }

  .resume:hover::before,
  .resume:focus-visible::before {
    opacity: 1;
  }

  .resume:hover::after,
  .resume:focus-visible::after {
    opacity: 1;
    animation: ${cometFly} 1s ease-out infinite;
  }

  /* === mobile burger === */
  .burger {
    display: none;
    width: 40px;
    height: 32px;
    border: 0;
    background: transparent;
    cursor: pointer;
    position: relative;

    /* ✅ FIX: make sure burger never gets pushed out */
    flex: 0 0 auto;
  }

  .burger span,
  .burger:before,
  .burger:after {
    content: '';
    position: absolute;
    left: 8px;
    right: 8px;
    height: 2px;
    background: var(--lightest-slate);
    transition: transform 0.2s ease, top 0.2s ease, opacity 0.2s ease;
  }
  .burger span { top: 15px; }
  .burger:before { top: 8px; }
  .burger:after { top: 22px; }

  .burger[aria-expanded='true'] span { opacity: 0; }
  .burger[aria-expanded='true']:before {
    top: 15px;
    transform: rotate(45deg);
  }
  .burger[aria-expanded='true']:after {
    top: 15px;
    transform: rotate(-45deg);
  }

  @media (max-width: 900px) {
    .links { display: none; }
    .burger { display: block; }

    .brand { height: 34px; }
    .brand > svg.brand-logo {
      transform: ${(p) => (p.$stuck ? 'scale(1.45)' : 'scale(1.58)')};
      margin: -4px 0 -4px;
    }
  }
`;

/* === Full-screen mobile overlay menu === */
const MobileOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 900;
  display: none;

  /* ✅ safe guard against any horizontal overflow */
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;

  @media (max-width: 900px) {
    display: ${({ $open }) => ($open ? 'flex' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1200;

    justify-content: center;
    align-items: center;
    padding: 16px;

    background:
      radial-gradient(circle at 0% 0%, rgba(56, 189, 248, 0.18), transparent 55%),
      radial-gradient(circle at 100% 100%, rgba(34, 211, 238, 0.12), transparent 55%),
      #020617;
    backdrop-filter: blur(14px);
  }

  align-items: center;
  justify-content: center;

  opacity: ${(p) => (p.$open ? 1 : 0)};
  pointer-events: ${(p) => (p.$open ? 'auto' : 'none')};
  transition: opacity 0.25s ease;

  .backdrop {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 0% 0%, rgba(56, 189, 248, 0.08), transparent 55%),
      radial-gradient(circle at 100% 100%, rgba(34, 211, 238, 0.08), transparent 55%),
      rgba(4, 15, 31, 0.96);
  }

  .panel {
    position: relative;
    z-index: 1;
    min-width: 72%;
    max-width: 420px;
    border-radius: 26px;
    padding: 32px 26px 30px;
    border: 1px solid rgba(34, 211, 238, 0.35);
    background:
      radial-gradient(circle at 0% 0%, rgba(56, 189, 248, 0.16), transparent 60%),
      radial-gradient(circle at 120% 120%, rgba(34, 211, 238, 0.16), transparent 60%),
      rgba(5, 18, 36, 0.98);
    box-shadow:
      0 22px 40px rgba(0, 0, 0, 0.55),
      0 0 0 1px rgba(15, 23, 42, 0.9);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    animation: ${menuFadeIn} 0.25s ease-out;
  }

  .panel ul {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 18px;
    align-items: center;
  }

  .panel li {
    font-family: var(--font-mono);
    font-size: 13px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    text-align: center;
  }

  .panel .nav-item-link {
    border: 0;
    background: none;
    color: var(--lightest-slate);
    text-decoration: none;
    cursor: pointer;
    padding: 4px 0 14px;
    position: relative;
    display: inline-block;
  }

  .panel .nav-item-link::after {
    content: '';
    position: absolute;
    left: 18%;
    right: 18%;
    bottom: 0;
    height: 2px;
    border-radius: 999px;
    background: linear-gradient(
      90deg,
      rgba(15, 118, 143, 0),
      rgba(34, 211, 238, 0.8),
      rgba(15, 118, 143, 0)
    );
    opacity: 0.95;
  }

  .panel .label {
    display: block;
    font-size: 14px;
    font-weight: 600;
  }

  .panel .nav-item-link:hover .label {
    color: #e5f7ff;
  }

  .panel .resume-pill {
    margin-top: 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 11px 32px;
    border-radius: 999px;
    border: 1px solid rgba(34, 211, 238, 0.85);
    color: var(--green);
    font-family: var(--font-mono);
    font-size: 13px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    text-decoration: none;
    background:
      radial-gradient(circle at 0% 0%, rgba(34, 211, 238, 0.18), transparent 60%),
      radial-gradient(circle at 120% 120%, rgba(56, 189, 248, 0.22), transparent 65%),
      rgba(7, 13, 28, 1);
  }

  .panel .resume-pill:hover {
    background: radial-gradient(
      circle at 10% 0%,
      rgba(56, 189, 248, 0.3),
      rgba(34, 211, 238, 0.98)
    );
    color: #020617;
  }
`;

/* mobile overlay items – no numbers now */
const mobileLinks = [
  { label: 'Profile', href: '/#about' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Certifications', href: '/#certifications' },
  { label: 'Analytics', href: '/#dashboards' },
  { label: 'Contact', href: '/#contact' },
];

const Nav = () => {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const setOffset = () => {
      const h = el.getBoundingClientRect().height;
      document.documentElement.style.setProperty('--header-offset', `${Math.round(h)}px`);
    };
    setOffset();
    const ro = new ResizeObserver(setOffset);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const sentinel = document.getElementById('nav-sentinel');
    if (!sentinel) {
      setStuck(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setStuck(!entry.isIntersecting), {
      threshold: 0,
    });
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      document.documentElement.style.setProperty('--scroll-progress', `${pct}%`);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMobile = () => setOpen(false);
  const handleBackdropClick = () => closeMobile();
  const handlePanelClick = (e) => e.stopPropagation();

  return (
    <>
      <GlobalAnchorOffset />
      <Wrapper
        ref={navRef}
        $stuck={stuck}
        className={stuck ? 'stuck' : ''}
        aria-label="Site navigation"
      >
        <Progress />
        <Bar $stuck={stuck}>
          <a
            href="/#profile"
            className="brand"
            onClick={closeMobile}
            aria-label="Go to profile"
          >
            <NBNavLogo className="brand-logo" />
          </a>

          <div className="links" role="menubar" aria-label="Primary">
            <a className="navlink" href="/#about">Profile</a>
            <a className="navlink" href="/#experience">Experience</a>
            <a className="navlink" href="/#projects">Projects</a>
            <a className="navlink" href="/#certifications">Certifications</a>
            <a className="navlink" href="/#dashboards">Analytics</a>
            <a className="navlink" href="/#contact">Contact</a>
            <a className="resume" href="/resume.pdf" target="_blank" rel="noreferrer">
              Resume
            </a>
          </div>

          <button
            className="burger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
          </button>
        </Bar>
      </Wrapper>

      <MobileOverlay id="mobile-menu" $open={open} onClick={handleBackdropClick}>
        <div className="backdrop" />
        <div className="panel" onClick={handlePanelClick}>
          <ul>
            {mobileLinks.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="nav-item-link" onClick={closeMobile}>
                  <span className="label">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <a
            className="resume-pill"
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            onClick={closeMobile}
          >
            Resume
          </a>
        </div>
      </MobileOverlay>
    </>
  );
};

export default Nav;
