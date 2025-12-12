// src/components/sections/hero.js
import React from 'react';
import styled, { keyframes } from 'styled-components';
import Nav from '@components/nav'; // adjust path if your alias differs

const rise = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const sweep = keyframes`
  0%   { background-size: 0% 40%; }
  60%  { background-size: 100% 40%; }
  100% { background-size: 100% 40%; }
`;

/* ✨ new: subtle pulsating glow for the button on hover */
const buttonPulse = keyframes`
  0% {
    box-shadow:
      0 0 0 rgba(34, 211, 238, 0.0),
      0 0 16px rgba(34, 211, 238, 0.25);
  }
  50% {
    box-shadow:
      0 0 26px rgba(34, 211, 238, 0.6),
      0 0 72px rgba(34, 211, 238, 0.35);
  }
  100% {
    box-shadow:
      0 0 0 rgba(34, 211, 238, 0.0),
      0 0 16px rgba(34, 211, 238, 0.25);
  }
`;

/* ✨ new: shooting comet streak across the button */
const cometFly = keyframes`
  0%   { transform: translateX(-130%) translateY(-50%); opacity: 0; }
  20%  { opacity: 1; }
  60%  { transform: translateX(130%) translateY(-50%); opacity: 1; }
  100% { transform: translateX(170%) translateY(-50%); opacity: 0; }
`;

const StyledHeroSection = styled.section`
  min-height: 88vh;
  display: grid;
  place-items: center;
  padding-top: 10vh;
  margin-bottom: 50px;

  .inner {
    width: 100%;
    max-width: 1100px;
    text-align: center;
    animation: ${rise} 0.5s ease forwards;
  }

  .overline {
    color: var(--green);
    font-family: var(--font-mono);
    letter-spacing: 0.06em;
    font-size: clamp(14px, 1.6vw, 16px);
    margin-bottom: 22px;
  }

  .name {
    color: var(--lightest-slate);
    line-height: 1.05;
    font-weight: 800;
    font-size: clamp(42px, 8vw, 84px);
    margin: 0 0 10px;
  }

  .tagline {
    color: var(--slate);
    line-height: 1.06;
    font-weight: 700;
    font-size: clamp(28px, 6.5vw, 64px);
    letter-spacing: 0.2px;
    margin: 0 0 22px;
  }

  .highlight {
    color: var(--lightest-slate);
    position: relative;
    background-image: linear-gradient(
      to right,
      var(--green-tint),
      rgba(34, 211, 238, 0.35)
    );
    background-repeat: no-repeat;
    background-position: 0 78%;
    background-size: 0% 40%;
    animation: ${sweep} 1.1s 0.2s ease forwards;
    border-radius: 4px;
    padding: 0 0.12em;
  }
  .nowrap { white-space: nowrap; }

  .sub {
    max-width: 800px;
    margin: 0 auto 28px;
    color: var(--light-slate);
    font-size: clamp(16px, 2.1vw, 20px);
    line-height: 1.6;
  }

  .pills {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
    margin: 12px auto 32px;
    padding: 0;
    list-style: none;
  }
  .pill {
    border: 1px solid rgba(34, 211, 238, 0.35);
    border-radius: 999px;
    padding: 8px 14px;
    font-family: var(--font-mono);
    font-size: clamp(12px, 1.6vw, 14px);
    color: var(--lightest-slate);
    background: rgba(34, 211, 238, 0.06);
  }

  .cta {
    display: flex;
    justify-content: center;
    gap: 14px;
  }

  /* 🌌 Space / cosmos button */
  .btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 14px 26px;
    border-radius: 999px;
    border: 1px solid rgba(34, 211, 238, 0.85);
    font-family: var(--font-mono);
    font-weight: 600;
    letter-spacing: 0.06em;
    text-decoration: none;
    cursor: pointer;
    color: var(--green);

    /* subtle “space” background */
    background:
      radial-gradient(circle at 0% 0%, rgba(34, 211, 238, 0.16), transparent 60%),
      radial-gradient(circle at 100% 120%, rgba(56, 189, 248, 0.22), transparent 65%),
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

  /* tiny starfield that appears on hover */
  .btn::before {
    content: '';
    position: absolute;
    inset: -40%;
    background-image:
      radial-gradient(1px 1px at 12% 22%, rgba(248, 250, 252, 0.9), transparent 55%),
      radial-gradient(1px 1px at 38% 78%, rgba(248, 250, 252, 0.75), transparent 55%),
      radial-gradient(1.2px 1.2px at 72% 32%, rgba(248, 250, 252, 0.9), transparent 55%),
      radial-gradient(1px 1px at 90% 64%, rgba(248, 250, 252, 0.8), transparent 55%);
    opacity: 0;
    mix-blend-mode: screen;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }

  /* comet streak */
  .btn::after {
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

  .btn:hover,
  .btn:focus-visible {
    background: radial-gradient(
      circle at 10% 0%,
      rgba(56, 189, 248, 0.3),
      rgba(34, 211, 238, 0.98)
    );
    color: #020617; /* near-black */
    border-color: rgba(56, 189, 248, 0.98);
    transform: translateY(-1px);
    animation: ${buttonPulse} 1.5s ease-in-out infinite;
    outline: none;
  }

  .btn:hover::before,
  .btn:focus-visible::before {
    opacity: 1;
  }

  .btn:hover::after,
  .btn:focus-visible::after {
    opacity: 1;
    animation: ${cometFly} 1.1s ease-out infinite;
  }
`;

const Hero = () => {
  return (
    <>
      <StyledHeroSection id="profile" aria-label="Intro">
        <div className="inner">
          <div className="overline">Hi, My self</div>

          <h1 className="name">Nitin Bhatti</h1>

          <h2 className="tagline">
            Turning messy data into<br />
            <span className="highlight nowrap">clear decisions</span>
          </h2>

          <p className="sub">
            I’m a Data Analyst focused on Business Intelligence (Power&nbsp;BI, Metabase, Tableau), Python &amp; ML —
            transforming raw data into actionable insights.
          </p>

          <ul className="pills" aria-label="Key skills">
            <li className="pill">Python</li>
            <li className="pill">Machine Learning</li>
            <li className="pill">BI Tools: Power&nbsp;BI | Metabase | Tableau</li>
            <li className="pill">Deep Learning</li>
            <li className="pill">Django + REST</li>
          </ul>

          <div className="cta">
            <a className="btn" href="#contact">Let’s Connect</a>
            {/* optional secondary:
            <a className="btn" href={`mailto:${email}`} aria-label="Email me">Email me</a>
            */}
          </div>
        </div>

        {/* Sentinel for sticky transition (observed by Nav) */}
        <span
          id="nav-sentinel"
          style={{ display: 'block', width: 1, height: 1, opacity: 0 }}
          aria-hidden="true"
        />
      </StyledHeroSection>

      {/* NAV BAR RENDERS **AFTER** HERO (exact behavior you wanted) */}
      <Nav />
    </>
  );
};

export default Hero;