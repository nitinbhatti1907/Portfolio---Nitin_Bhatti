// src/components/sections/projects.js
import React from 'react';
import styled from 'styled-components';

/* ===========================
   SECTION WRAP
   =========================== */
const Wrap = styled.section`
  margin: 0 auto 30px;
  padding: 0 40px 90px;
  max-width: 1200px;

  h2.numbered-heading {
    margin-bottom: 12px;
  }

  .subtitle {
    margin: 0;
  }

  @media (max-width: 1024px) {
    padding: 0 24px 80px;
  }

  @media (max-width: 640px) {
    padding: 10px 16px 80px;

    .subtitle {
      margin-bottom: 32px;
    }

    /* ✅ allow wrapping, but keep the line INLINE after the text */
    h2.numbered-heading {
      display: inline-block;   /* text + ::after share one inline flow */
      white-space: normal;     /* allow “Other Noteworthy / Projects” */
      line-height: 1.2;
      max-width: 100%;
    }

    h2.numbered-heading::after {
      content: '';
      display: inline-block;
      position: relative;
      top: -0.15em;            /* slight tweak so line sits on same baseline */
      width: 80px;             /* length of the line on small screens */
      height: 1px;
      margin-left: 8px;        /* gap after “Projects” */
      background-color: var(--lightest-navy);
    }
  }

  /* < 500px: hide the line completely */
  @media (max-width: 274px) {
    h2.numbered-heading::after {
      display: none;
    }
  }
`;

/* ===========================
   HORIZONTAL SCROLLER
   (only really active on small screens)
   =========================== */
const ScrollOuter = styled.div`
  margin-top: clamp(130px, 25vh, 220px);

  /* when the screen is narrower, allow horizontal scroll only */
  @media (max-width: 1400px) {
    margin-top: 30px;
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: 12px; /* a bit of room for the scrollbar */
    -webkit-overflow-scrolling: touch;
  }
`;

/* ===========================
   DIAMOND CLUSTER
   =========================== */
const Cluster = styled.div`
  /* global knobs */
  --tile: clamp(190px, 20vw, 230px);
  --g: clamp(0px, 0.25vw, 6px);
  --pull: calc(var(--tile) * -0.48);

  display: grid;
  grid-template-columns: repeat(5, var(--tile));
  justify-content: center;
  align-items: start;
  column-gap: var(--g);
  row-gap: 0;

  /* place as: 1 2 3 4 5  ->  top, bottom, top, bottom, top */
  > :nth-child(1) {
    grid-column: 1;
  }
  > :nth-child(2) {
    grid-column: 2;
    margin-top: var(--pull);
  }
  > :nth-child(3) {
    grid-column: 3;
  }
  > :nth-child(4) {
    grid-column: 4;
    margin-top: var(--pull);
  }
  > :nth-child(5) {
    grid-column: 5;
  }

  @media (max-width: 1400px) {
    overflow-x: auto;
    overflow-y: hidden;
    height: 366px;
    align-content: center;
    align-items: self-end;
    /* the important part: start from the left, so first card is fully visible */
    justify-content: flex-start;
    padding-left: 40px; /* or 0 – whatever spacing you like */
  }
`;

/* ===========================
   DIAMOND CARD
   =========================== */
const Diamond = styled.a`
  position: relative;
  z-index: 0;
  width: var(--tile);
  height: var(--tile);
  justify-self: center;
  text-decoration: none;
  color: inherit;

  display: grid;
  place-items: center;

  background:
    radial-gradient(600px 240px at 0% 0%, rgba(34, 211, 238, 0.08), transparent 60%),
    linear-gradient(180deg, #0f1c2b, #0d1725);
  border: 1px solid rgba(34, 211, 238, 0.18);
  border-radius: 20px;

  box-shadow:
    0 18px 34px rgba(0, 0, 0, 0.28),
    0 0 0 1px rgba(255, 255, 255, 0.02) inset,
    0 0 22px rgba(34, 211, 238, 0.08);

  transform: rotate(45deg);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  overflow: hidden;

  &:hover {
    transform: rotate(45deg) translateY(-2px);
    box-shadow:
      0 28px 56px rgba(0, 0, 0, 0.38),
      0 0 0 1px rgba(255, 255, 255, 0.03) inset,
      0 0 34px rgba(34, 211, 238, 0.12);
  }

  &:before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px) 0 0 / 16px 16px,
      linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px) 0 0 / 16px 16px;
    pointer-events: none;
    opacity: 0.55;
  }
`;

/* ===========================
   SHOOTING STARS
   =========================== */
const Meteors = styled.div`
  position: absolute;
  inset: 8%;
  z-index: 1;
  pointer-events: none;
  transform: rotate(-45deg);
  opacity: 0;
  transition: opacity 0.25s ease;

  ${Diamond}:hover & {
    opacity: 1;
  }
`;

const Meteor = styled.span`
  --angle: 10deg;
  --len: 90px;
  --thick: 2px;
  --dur: 1.4s;
  --delay: 0s;

  position: absolute;
  left: -22%;
  top: var(--top, 30%);
  width: var(--len);
  height: var(--thick);
  transform: rotate(var(--angle));
  border-radius: 2px;
  background: linear-gradient(
    90deg,
    rgba(34, 211, 238, 0) 0%,
    rgba(180, 255, 250, 0.95) 35%,
    rgba(180, 255, 250, 0) 100%
  );
  filter: drop-shadow(0 0 6px rgba(34, 211, 238, 0.6));
  opacity: 0;
  will-change: transform, opacity;

  &::before {
    content: '';
    position: absolute;
    left: 24%;
    top: 50%;
    translate: -50% -50%;
    width: calc(var(--thick) * 3);
    height: calc(var(--thick) * 3);
    border-radius: 50%;
    background: radial-gradient(circle at 50% 50%, #dfffff, #8ff8ff 60%, transparent 65%);
    filter: drop-shadow(0 0 10px rgba(150, 255, 255, 0.9));
  }

  &::after {
    content: '';
    position: absolute;
    right: 8%;
    top: 50%;
    translate: 0 -50%;
    width: calc(var(--thick) * 1.2);
    height: calc(var(--thick) * 1.2);
    border-radius: 50%;
    background: radial-gradient(circle, rgba(160, 255, 250, 0.6), transparent 60%);
    filter: drop-shadow(0 0 6px rgba(120, 255, 250, 0.7));
  }

  animation: meteorFly var(--dur) linear infinite;
  animation-delay: var(--delay);
  animation-play-state: paused;

  ${Diamond}:hover & {
    animation-play-state: running;
  }

  @keyframes meteorFly {
    0% {
      transform: rotate(var(--angle)) translateX(0);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    85% {
      opacity: 1;
    }
    100% {
      transform: rotate(var(--angle)) translateX(170%);
      opacity: 0;
    }
  }
`;

/* ===========================
   CONTENT INSIDE DIAMOND
   =========================== */
const Inner = styled.div`
  position: relative;
  z-index: 2;
  transform: rotate(-45deg);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  padding: clamp(12px, 2vw, 16px);
  width: 82%;
  height: 82%;
  text-align: center;
`;

const Glyph = styled.div`
  width: clamp(28px, 3vw, 34px);
  height: clamp(28px, 3vw, 34px);
  margin-bottom: clamp(4px, 0.6vw, 6px);
  display: grid;
  place-items: center;

  svg {
    width: 90%;
    height: 90%;
    fill: #22d3ee;
    filter: drop-shadow(0 0 10px rgba(34, 211, 238, 0.32));
  }
`;

const Title = styled.h3`
  margin: 0;
  font-size: clamp(15px, 2vw, 18px);
  line-height: 1.25;
  color: var(--lightest-slate);
  text-align: center;
  padding: 0 2px;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const RepoBtn = styled.a`
  margin-top: 6px;
  display: inline-grid;
  place-items: center;
  width: clamp(34px, 3vw, 38px);
  height: clamp(34px, 3vw, 38px);
  border-radius: 10px;
  background: rgba(34, 211, 238, 0.08);
  border: 1px solid rgba(34, 211, 238, 0.25);
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;

  svg {
    width: clamp(19px, 2.1vw, 21px);
    height: clamp(19px, 2.1vw, 21px);
    fill: #22d3ee;
    opacity: 0.95;
  }

  &:hover {
    transform: translateY(-1px);
    background: rgba(34, 211, 238, 0.14);
    border-color: var(--green);
  }
`;

/* ===========================
   DATA
   =========================== */
const PROJECTS = [
  {
    title: 'CORAL: AI Assistant',
    icon: 'coral',
    repo: 'https://github.com/nitinbhatti1907/CORAL-AI-personalized-learning-assistant',
  },
  {
    title: 'Jarvis-AI',
    icon: 'star',
    repo: 'https://github.com/nitinbhatti1907/Jarvis-AI',
  },
  {
    title: 'Climb Race Automation',
    icon: 'game',
    repo: 'https://github.com/nitinbhatti1907/Climb-Race-Automation',
  },
  {
    title: 'Social Media App-Backend',
    icon: 'cog',
    repo: 'https://github.com/nitinbhatti1907/Social-Media-Application-Backend',
  },
  {
    title: 'Digital News Paper GUI',
    icon: 'news',
    repo: 'https://github.com/nitinbhatti1907/Digital-News-Paper-GUI',
  },
];

/* ===========================
   ICONS
   =========================== */
const Icon = ({ name }) => {
  switch (name) {
    case 'cog':
      return (
        <svg viewBox="0 0 18 18" aria-hidden="true">
          <path
            d="M4 4h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-4.5L9 15.8 8.4 13H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"
            fill="#22d3ee"
          />
          <circle cx={7} cy={8.8} r={1.1} fill="#020617" />
          <circle cx={10} cy={8.8} r={1.1} fill="#020617" />
          <circle cx={13} cy={8.8} r={1.1} fill="#020617" />
        </svg>
      );
    case 'coral':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x={4} y={4} width={17} height={16} rx={3.5} fill="#22d3ee" />
          <rect x={11} y={2} width={3} height={2} fill="#22d3ee" />
          <rect x={11} y={20} width={3} height={2} fill="#22d3ee" />
          <rect x={2} y={11} width={3} height={2} fill="#22d3ee" />
          <rect x={20} y={11} width={3} height={2} fill="#22d3ee" />
          <path
            d="M7.5 17.5L9.6 8.5h1.8l2.1 9h-1.7l-.35-1.5H9.55l-.35 1.5H7.5zM11 13.7l-.7-2.7h-.1l-.7 2.7H11z"
            fill="#020617"
          />
          <rect x={14.2} y={8.5} width={2} height={9} fill="#020617" />
        </svg>
      );
    case 'news':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x={3} y={5} width={14} height={14} rx={2} fill="#22d3ee" />
          <rect x={17} y={7} width={4} height={12} rx={1} fill="#22d3ee" />
          <rect x={7} y={9} width={7} height={1.6} fill="#020617" />
          <rect x={7} y={12} width={7} height={1.6} fill="#020617" />
          <rect x={7} y={15} width={4} height={1.6} fill="#020617" />
        </svg>
      );
    case 'star':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    case 'game':
      return (
        <svg viewBox="0 0 21 22" aria-hidden="true">
          <path d="M6 7h12a4 4 0 0 1 0 8h-2l-2 2h-4l-2-2H6a4 4 0 1 1 0-8Zm2.5 2.5h-1v1h-1v1h1v1h1v-1h1v-1h-1v-1Zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm2 3a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
        </svg>
      );
    default:
      return null;
  }
};

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.4-4-1.4-.6-1.4-1.3-1.7-1.3-1.7-1-.6.1-.6.1-.6 1.1.1 1.7 1.2 1.7 1.2 1 .1.6 1.9 2.7 1.4.1-.7.4-1.2.7-1.5-2.7-.3-5.6-1.4-5.6-6.2 0-1.4.5-2.5 1.2-3.4-.1-.3-.5-1.7.1-3.6 0 0 1-.3 3.5 1.3a12 12 0 0 1 6.4 0C18.2 6 19.2 6.3 19.2 6.3c.6 1.9.2 3.3.1 3.6.8.9 1.2 2 1.2 3.4 0 4.8-2.9 5.8-5.6 6.2.4.3.8 1 .8 2v3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
  </svg>
);

/* ===========================
   COMPONENT
   =========================== */
const Projects = () => {
  const visible = PROJECTS; // all 5 cards

  return (
    <Wrap id="other-projects">
      <h2 className="numbered-heading projects-heading">
        Other Noteworthy Projects
      </h2>
      <p className="subtitle">
        <a href="/archive">view the archive</a>
      </p>

      <ScrollOuter>
        <Cluster>
          {visible.map(p => (
            <Diamond
              key={p.title}
              href={p.repo}
              target="_blank"
              rel="noreferrer"
              aria-label={`${p.title} — GitHub`}
            >
              <Meteors aria-hidden="true">
                <Meteor
                  style={{
                    '--top': '18%',
                    '--angle': '8deg',
                    '--len': '90px',
                    '--dur': '1.5s',
                    '--delay': '0s',
                  }}
                />
                <Meteor
                  style={{
                    '--top': '31%',
                    '--angle': '14deg',
                    '--len': '110px',
                    '--dur': '1.2s',
                    '--delay': '.18s',
                  }}
                />
                <Meteor
                  style={{
                    '--top': '45%',
                    '--angle': '6deg',
                    '--len': '80px',
                    '--dur': '1.6s',
                    '--delay': '.42s',
                  }}
                />
                <Meteor
                  style={{
                    '--top': '58%',
                    '--angle': '11deg',
                    '--len': '120px',
                    '--dur': '1.3s',
                    '--delay': '.08s',
                  }}
                />
                <Meteor
                  style={{
                    '--top': '73%',
                    '--angle': '16deg',
                    '--len': '100px',
                    '--dur': '1.4s',
                    '--delay': '.55s',
                  }}
                />
                <Meteor
                  style={{
                    '--top': '86%',
                    '--angle': '5deg',
                    '--len': '95px',
                    '--dur': '1.7s',
                    '--delay': '.32s',
                  }}
                />
              </Meteors>

              <Inner>
                <Glyph>
                  <Icon name={p.icon} />
                </Glyph>
                <Title>{p.title}</Title>
                <RepoBtn
                  href={p.repo}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open GitHub repo"
                  onClick={e => e.stopPropagation()}
                >
                  <GithubIcon />
                </RepoBtn>
              </Inner>
            </Diamond>
          ))}
        </Cluster>
      </ScrollOuter>
    </Wrap>
  );
};

export default Projects;