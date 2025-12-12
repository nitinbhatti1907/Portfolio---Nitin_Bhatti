// src/components/sections/featured.js
import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import shot1 from '../../images/featured/shot1.jpg';
import shot2 from '../../images/featured/shot2.jpg';
import shot3 from '../../images/featured/shot3.jpg';

/* ===== Animations ===== */
const twinkle = keyframes`
  0%,100% { opacity: .25; }
  50%     { opacity: .6; }
`;
const drift = keyframes`
  0%   { transform: translate3d(0,0,0) }
  100% { transform: translate3d(0,-8px,0) }
`;
const rotateRing = keyframes`
  0%   { transform: rotate(-18deg) }
  100% { transform: rotate(342deg) }
`;
const shimmer = keyframes`
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;
const comet = keyframes`
  0%   { transform: translate3d(-10%, -20%, 0) rotate(-20deg); opacity: 0; }
  10%  { opacity: .9; }
  60%  { opacity: .9; }
  100% { transform: translate3d(120%, 100%, 0) rotate(-20deg); opacity: 0; }
`;

/* ⭕ small pulse + comet for the orbit buttons (same vibe as hero/nav) */
const buttonPulse = keyframes`
  0% {
    box-shadow:
      0 0 0 rgba(34, 211, 238, 0.0),
      0 0 10px rgba(34, 211, 238, 0.25);
  }
  50% {
    box-shadow:
      0 0 18px rgba(34, 211, 238, 0.6),
      0 0 36px rgba(34, 211, 238, 0.35);
  }
  100% {
    box-shadow:
      0 0 0 rgba(34, 211, 238, 0.0),
      0 0 10px rgba(34, 211, 238, 0.25);
  }
`;

const cometFly = keyframes`
  0%   { transform: translateX(-130%) translateY(-50%); opacity: 0; }
  20%  { opacity: 1; }
  60%  { transform: translateX(130%) translateY(-50%); opacity: 1; }
  100% { transform: translateX(170%) translateY(-50%); opacity: 0; }
`;

/* ===== Layout ===== */
const Section = styled.section`
  margin: 0 auto 50px;   /* 🔥 centered + consistent 50px space below */
  max-width: 1200px;

  @media (max-width: 980px) {
    padding: 96px 0 40px;
  }
`;

/* ===== Left group: Title above Image ===== */
const LeftGroup = styled.div`
  display: grid;
  gap: 14px;
`;

/* Title above the image (unchanged look) */
const TitleAbove = styled.h3`
  font-size: clamp(28px, 3.6vw, 30px);
  line-height: 1.12;
  color: var(--lightest-slate);
  margin: 0 0 6px;
  position: relative;

  &:after {
    content: '';
    position: absolute; left: 0; bottom: -10px;
    width: clamp(120px, 28vw, 280px);
    height: 2px;
    background: linear-gradient(90deg, rgba(34,211,238,0), var(--green), rgba(34,211,238,0));
    box-shadow: 0 0 16px rgba(34,211,238,.35);
  }
`;

/* ===== Cosmic Canvas (image) ===== */
const Canvas = styled.a`
  position: relative;
  display: block;
  min-height: 360px;
  border-radius: 22px;
  overflow: hidden;
  outline: none;
  background:
    radial-gradient(1200px 500px at -20% -10%, rgba(34,211,238,.10), transparent 60%),
    linear-gradient(180deg, #102131 0%, #0a1624 100%);
  box-shadow:
    0 50px 120px rgba(0,0,0,.5),
    inset 0 0 0 1px rgba(255,255,255,.03);
  transition: transform .35s ease, box-shadow .35s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-2px);
    box-shadow:
      0 60px 140px rgba(0,0,0,.6),
      inset 0 0 0 1px rgba(255,255,255,.06);
  }

  &:before {
    content: '';
    position: absolute; inset: 0;
    background:
      radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,.45) 60%, transparent 61%),
      radial-gradient(1.5px 1.5px at 70% 60%, rgba(255,255,255,.35) 60%, transparent 61%),
      radial-gradient(1.5px 1.5px at 35% 75%, rgba(255,255,255,.35) 60%, transparent 61%),
      radial-gradient(1px 1px at 82% 18%, rgba(255,255,255,.35) 60%, transparent 61%),
      radial-gradient(1px 1px at 55% 42%, rgba(255,255,255,.35) 60%, transparent 61%);
    opacity: .35;
    animation: ${twinkle} 4s ease-in-out infinite;
    pointer-events: none;
  }

  &:after {
    content: '';
    position: absolute; inset: -20%;
    background:
      radial-gradient(40% 30% at 20% 70%, rgba(34,211,238,.12), transparent 60%),
      radial-gradient(60% 40% at 100% 0%, rgba(34,211,238,.08), transparent 60%),
      radial-gradient(50% 30% at 0% 0%, rgba(34,211,238,.06), transparent 60%);
    filter: blur(2px);
    animation: ${drift} 7s ease-in-out infinite alternate;
    pointer-events: none;
  }

  .planet {
    position: absolute;
    left: -8%; bottom: -22%;
    width: 68%;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    background:
      radial-gradient(120% 120% at 30% 30%, rgba(34,211,238,.25) 0%, transparent 60%),
      radial-gradient(100% 100% at 50% 50%, #17b6c9 0%, #0f7f94 60%, #0c3c51 100%);
    box-shadow:
      inset 0 -30px 60px rgba(0,0,0,.35),
      0 40px 120px rgba(0,0,0,.45);
    transform: rotate(-8deg);
  }

  .glow {
    position: absolute;
    left: 2%; bottom: 6%;
    width: 64%;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    background: radial-gradient(60% 60% at 30% 35%, rgba(34,211,238,.35), transparent 70%);
    filter: blur(18px);
    pointer-events: none;
  }

  .ring {
    position: absolute;
    left: 5%; bottom: 2%;
    width: 80%; height: 38%;
    border: 6px solid rgba(34,211,238,.55);
    border-radius: 50%;
    transform: rotate(-18deg);
    transform-origin: 50% 50%;
    filter: drop-shadow(0 4px 14px rgba(34,211,238,.35));
    transition: transform .6s cubic-bezier(.2,.7,.2,1);
  }
  &:hover .ring,
  &:focus-visible .ring {
    animation: ${rotateRing} 14s linear infinite;
  }

  .comet {
    position: absolute;
    top: 8%; left: 2%;
    width: 140px; height: 2px;
    background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,.9), rgba(34,211,238,0));
    border-radius: 2px;
    opacity: 0;
    transform-origin: left center;
    animation: ${comet} 8s ease-in-out infinite;
    animation-delay: 1.8s;
    filter: drop-shadow(0 0 6px rgba(34,211,238,.7));
    pointer-events: none;
  }

  &[data-hasimg="true"] { background: #0b1827; }

  .shot {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: saturate(.95) contrast(1.05) brightness(.92);
    transform: scale(1.02);
    transition: transform .5s ease, filter .5s ease;
  }
  .overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(120% 90% at 0% 0%, rgba(34,211,238,.10), transparent 60%),
      linear-gradient(180deg, rgba(8,16,26,0) 0%, rgba(8,16,26,.15) 55%, rgba(8,16,26,.35) 100%);
  }
  &:hover .shot,
  &:focus-visible .shot {
    transform: scale(1.045);
    filter: saturate(1) contrast(1.08) brightness(.96);
  }
  &[data-hasimg="true"]::before,
  &[data-hasimg="true"]::after {
    opacity: .12;
    filter: blur(.5px);
  }
`;

/* ===== Right column: Meta ===== */
const Meta = styled.div`
  position: relative;
  display: grid;
  gap: 18px;

  .overline {
    color: var(--green);
    font-family: var(--font-mono);
    letter-spacing: .03em;
    font-size: var(--fz-sm);
  }
`;

/* glass bubble with shimmer */
const Bubble = styled.div`
  position: relative;
  border-radius: 14px;
  padding: 18px 20px;
  background: linear-gradient(180deg, rgba(12,22,36,.88), rgba(10,18,30,.88));
  border: 1px solid rgba(100,255,218,.18);
  box-shadow: 0 18px 40px rgba(0,0,0,.35);
  line-height: 1.55;

  &:before {
    content: '';
    position: absolute;
    left: -14px; top: 22px;
    width: 0; height: 0;
    border-right: 14px solid rgba(100,255,218,.18);
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    filter: drop-shadow(-2px 2px 6px rgba(0,0,0,.25));
  }
  &:after {
    content: '';
    position: absolute;
    left: -12px; top: 22px;
    width: 0; height: 0;
    border-right: 12px solid rgba(12,22,36,.88);
    border-top: 9px solid transparent;
    border-bottom: 9px solid transparent;
  }

  .shine {
    position: absolute;
    inset: 0;
    border-radius: 14px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.13), transparent);
    background-size: 200% 100%;
    pointer-events: none;
    animation: ${shimmer} 6s linear infinite;
    mix-blend-mode: screen;
  }
`;

const Tech = styled.ul`
  display: flex; flex-wrap: wrap;
  gap: 8px 12px; margin: 4px 0 8px; padding: 0; list-style: none;

  li {
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    color: var(--slate);
    background: rgba(34,211,238,.08);
    border: 1px solid rgba(34,211,238,.22);
    padding: 6px 10px;
    border-radius: 999px;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;

  .orbit-button {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 10px;                 /* space between text + icon */
    padding: 10px 18px;
    border-radius: 999px;
    border: 1px solid rgba(34, 211, 238, 0.85);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    letter-spacing: 0.05em;
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

  .orbit-button .label {
    white-space: nowrap;
  }

  .orbit-icon svg {
    width: 22px;
    height: 22px;
    display: block;
  }

  .orbit-button:hover,
  .orbit-button:focus-visible {
    background: radial-gradient(
      circle at 10% 0%,
      rgba(56, 189, 248, 0.3),
      rgba(34, 211, 238, 0.98)
    );
    color: #020617;
    border-color: rgba(56, 189, 248, 0.98);
    transform: translateY(-1px);
    box-shadow: 0 0 24px rgba(34, 211, 238, 0.55);
    outline: none;
  }
`;

const LiveIcon = () => (
  <span className="orbit-icon" aria-hidden="true">
    <svg viewBox="0 0 24 24">
      {/* longer diagonal arrow, uses more of the circle */}
      <path
        d="M7 17L17 7M10 7h7v7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

const RepoIcon = () => (
  <span className="orbit-icon" aria-hidden="true">
    <svg viewBox="0 0 24 24">
      {/* compact GitHub-style mark */}
      <path
        d="M12 2C6.48 2 2 6.58 2 12.26c0 4.51 2.87 8.33 6.84 9.68.5.1.68-.22.68-.5
           0-.25-.01-.9-.01-1.76-2.78.62-3.37-1.37-3.37-1.37-.45-1.17-1.11-1.48-1.11-1.48
           -.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.58 2.36 1.12 2.94.85.09-.67.35-1.12.63-1.38
           -2.22-.26-4.56-1.14-4.56-5.09 0-1.13.39-2.05 1.03-2.77-.1-.26-.45-1.3.1-2.7
           0 0 .84-.27 2.75 1.03.8-.23 1.65-.35 2.5-.35s1.7.12 2.5.35c1.9-1.3 2.74-1.03 2.74-1.03
           .55 1.4.2 2.44.1 2.7.64.72 1.02 1.64 1.02 2.77 0 3.96-2.35 4.82-4.6 5.07.36.32.68.95.68 1.92
           0 1.38-.01 2.49-.01 2.82 0 .28.18.6.69.5A10.02 10.02 0 0022 12.26C22 6.58 17.52 2 12 2z"
        fill="currentColor"
      />
    </svg>
  </span>
);

/* ===== Row with alternating layout ===== */
const Row = styled.article`
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 48px;
  align-items: center;
  margin-bottom: 120px;

  /* flip columns when reverse prop is true */
  ${({ reverse }) =>
    reverse &&
    css`
      grid-template-columns: 1fr 1.15fr;
      & > *:first-child {
        order: 2;
      }
      & > *:last-child {
        order: 1;
      }
    `}

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
    gap: 28px;
    margin-bottom: 84px;

    /* On mobile: always stack image first, then content */
    & > *:first-child {
      order: 1;
    }
    & > *:last-child {
      order: 2;
    }
  }
`;

/* ===== Data ===== */
const FEATURED = [
  {
    title: 'House Price Prediction',
    desc:
      'Engineered and deployed a real-time ML app using scikit-learn and FastAPI, achieving accurate predictions with structured statistical validation (GroupKFold, prediction intervals).',
    tech: ['Python', 'scikit-learn', 'Hugging Face', 'FastAPI', 'Tailwind', 'JavaScript'],
    href: 'https://nb1907-house-price-prediction.hf.space/',
    repo: 'https://github.com/nitinbhatti1907/house-price-prediction',
    image: shot1,
  },
  {
    title: 'Medical OCR Analyzer',
    desc:
      'Used OCR and Python to extract structured data from unstructured text documents, enabling pattern identification, trend communication,and statistical insight generation.',
    tech: ['Python', 'Azure - OCR', 'Groq AI - Llama 3', 'Django', 'Git', 'Render'],
    href: 'https://medical-ocr-analyzer.onrender.com/',
    repo: 'https://github.com/nitinbhatti1907/Medical-OCR-Analyzer',
    image: shot2,
  },
  {
    title: 'Potato Disease Classification',
    desc:
      'Deep learning model to classify potato leaf diseases from images; highlights end-to-end pipeline thinking and ML deployment awareness.',
    tech: ['Python', 'TensorFlow/Keras', 'Computer Vision', 'FastAPI', 'React'],
    href: 'https://github.com/nitinbhatti1907/Potato-Disease-Classification-Using-CNN',
    repo: 'https://github.com/nitinbhatti1907/Potato-Disease-Classification-Using-CNN',
    image: shot3,
  },
];

const Featured = () => {
  return (
    <Section id="projects">
      <h2 className="numbered-heading">Projects</h2>

      {FEATURED.map((p, i) => (
        <Row key={i} reverse={i % 2 === 1 /* 2nd, 4th, ... flip */}>
          {/* LEFT: title above the image, then image */}
          <LeftGroup>
            <TitleAbove>{p.title}</TitleAbove>

            <Canvas
              href={p.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${p.title} — open`}
              data-hasimg={Boolean(p.image)}
            >
              {p.image ? (
                <>
                  <img
                    className="shot"
                    src={p.image}
                    alt={`${p.title} preview`}
                    loading="lazy"
                  />
                  <div className="overlay" />
                </>
              ) : (
                <>
                  <div className="planet" />
                  <div className="glow" />
                  <div className="ring" />
                  <div className="comet" />
                </>
              )}
            </Canvas>
          </LeftGroup>

          {/* RIGHT: overline, blurb, tech, actions */}
          <Meta>
            <span className="overline">Featured Project</span>

            <Bubble>
              {p.desc}
              <span className="shine" aria-hidden="true" />
            </Bubble>

            <Tech>
              {p.tech.map(t => (
                <li key={t}>{t}</li>
              ))}
            </Tech>

            <Actions>
              <a
                className="orbit-button"
                href={p.href}
                target="_blank"
                rel="noreferrer"
              >
                <span className="label">Go Live</span>
                <LiveIcon />
              </a>

              {p.repo && (
                <a
                  className="orbit-button"
                  href={p.repo}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="label">GitHub</span>
                  <RepoIcon />
                </a>
              )}
            </Actions>
          </Meta>
        </Row>
      ))}
    </Section>
  );
};

export default Featured;