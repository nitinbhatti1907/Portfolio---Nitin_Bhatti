// src/components/sections/dashboards.js
import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { usePrefersReducedMotion } from '@hooks';
import { Link } from 'gatsby';
import { srConfig } from '@config';
import sr from '@utils/sr';

const STACK_GAP = 110;      // vertical spacing between sticky thresholds
const CARD_GAP = 16;        // visual space between cards
const MIN_SCALE = 0.86;
const START_SCALE_AT = 0.4;

/* ===========================
   LAYOUT
   =========================== */

const Section = styled.section`
  max-width: 1100px;
  // margin: 0 auto 10px; 
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 26px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const GalleryLink = styled(Link)`
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  padding: 9px 18px;
  margin-bottom: 5px;
  border-radius: 999px;
  border: 1px solid rgba(148,163,184,0.8);
  color: var(--lightest-slate);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;

  &:hover {
    border-color: var(--green);
    color: var(--green);
  }
`;

const Frame = styled.div`
  position: relative;
  height: ${({ $h }) => `${$h}px`};
`;

/* ===========================
   CARD
   =========================== */

const Card = styled.article`
  position: sticky;
  top: ${({ $top }) => `${$top}px`};
  z-index: ${({ $z }) => $z};
  margin-bottom: ${CARD_GAP}px;

  border-radius: 16px;

  /* >>> updated color to match other sections <<< */
  border: 1px solid rgba(15, 23, 42, 0.9);
  background:
    radial-gradient(140% 160% at 0% 0%, rgba(56,189,248,0.10), transparent 55%),
    radial-gradient(140% 160% at 100% 0%, rgba(59,130,246,0.08), transparent 55%),
    var(--light-navy);

  box-shadow: 0 20px 60px rgba(0,0,0,.35);
  overflow: hidden;
  transform-origin: center top;
  will-change: transform, opacity;
  transition: transform 0.1s linear;

  display: grid;
  grid-template-columns: 1.05fr 1fr;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Left = styled.div`
  padding: clamp(18px, 2.6vw, 28px);
  border-right: 1px solid rgba(148,163,184,.12);

  @media (max-width: 900px) {
    border-right: none;
    border-bottom: 1px solid rgba(148,163,184,.12);
  }
`;

const Eyebrow = styled.div`
  font-family: var(--font-mono);
  font-size: var(--fz-xxs);
  letter-spacing: .12em;
  color: var(--green);
  margin-bottom: 10px;
`;

const Title = styled.h3`
  margin: 0 0 8px;
  font-size: clamp(22px, 3.2vw, 34px);
  color: var(--lightest-slate);
  line-height: 1.2;
`;

const Blurb = styled.p`
  margin: 12px 0 18px;
  color: var(--light-slate);
`;

const Chips = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 20px 0 18px;

  li {
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    padding: 6px 10px;
    border-radius: 999px;
    background: rgba(148,163,184,.10);
    color: var(--light-slate);
  }
`;

const CTA = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-mono);
  color: var(--lightest-slate);
  border: 1px solid var(--lightest-navy);
  padding: 10px 14px;
  border-radius: 12px;
  text-decoration: none;

  &:hover {
    border-color: var(--green);
    color: var(--green);
  }

  &:before {
    content: "";
    width: 14px;
    height: 14px;
    border-radius: 4px;
    background: var(--green);
  }
`;

const Preview = styled.div`
  padding: 18px;
  display: grid;
  place-items: center;
  background:
    radial-gradient(900px 500px at 80% 90%, rgba(76,93,165,.22), transparent 60%),
    radial-gradient(600px 400px at 15% 20%, rgba(34,211,238,.10), transparent 55%),
    rgba(10,20,35,.55);

  canvas, img, video {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    border-radius: 12px;
    display: block;
  }
`;

/* ===========================
   DATA
   =========================== */

const DASHBOARDS = [
  {
    eyebrow: 'OVERVIEW',
    title: 'Climate Dashboard - Canada (Tableau)',
    blurb: 'Hottest Day, Coldest Day, Total Precipitation, and etc.',
    tags: ['Model Prediction', 'Data Preprocessing', 'KPI'],
    href: 'https://public.tableau.com/app/profile/nitin.pravinbhai.bhatti/viz/DataNorth/ClimateDashboard',
    image: '/dashboards/canada-climate.png',
  },
  {
    eyebrow: 'OVERVIEW',
    title: 'Personal Finance (Power BI)',
    blurb: 'Cashflow, savings rate, category trends, and target tracking.',
    tags: ['DAX', 'Data Modeling', 'KPI'],
    href: 'https://drive.google.com/file/d/1QstYuUGWija_QH8OHV7RFsZylvZeseRJ/view?usp=sharing',
    image: '/dashboards/personal-finance.png',
  },
];

/* ===========================
   COMPONENT
   =========================== */

export default function Dashboards() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const frameRef = useRef(null);
  const cardRefs = useRef([]);
  const revealArchiveLink = useRef(null);

  const [h, setH] = useState(900); // fallback height
  const cardCount = DASHBOARDS.length;

  // Fixed sticky offsets for all screen sizes (nice “stack”)
  const topOffsets = useMemo(
    () => Array.from({ length: cardCount }, (_, i) => 64 + i * 70),
    [cardCount]
  );

  useEffect(() => {
    const recomputeHeight = () => {
      const firstCard = cardRefs.current[0];
      const cardHeight = firstCard
        ? firstCard.getBoundingClientRect().height
        : 480;

      const totalHeight =
        cardHeight + STACK_GAP * (cardCount - 1) + window.innerHeight * 0.9;

      setH(totalHeight);
    };

    recomputeHeight();
    window.addEventListener('resize', recomputeHeight);
    return () => window.removeEventListener('resize', recomputeHeight);
  }, [cardCount]);

  // Scroll-based scaling for ALL screen sizes
  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = frameRef.current;
    if (!el) return;

    const STEP = STACK_GAP + CARD_GAP;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const frameTop = rect.top + window.scrollY;
      const scrollY = window.scrollY - frameTop;
      const total = Math.max(0, h - window.innerHeight);

      cardRefs.current.forEach((card, i) => {
        if (!card) return;

        const start = Math.max(0, i * STEP);
        const end = Math.min(total, (i + 1) * STEP);
        let p = (scrollY - start) / Math.max(1, end - start);
        p = Math.min(1, Math.max(0, p));

        const eased =
          p <= START_SCALE_AT ? 0 : (p - START_SCALE_AT) / (1 - START_SCALE_AT);
        const scale = 1 - (1 - MIN_SCALE) * eased;

        card.style.transform = `scale(${scale})`;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [h, prefersReducedMotion]);

  // Scroll-reveal for gallery link
  useEffect(() => {
    if (!prefersReducedMotion && revealArchiveLink.current) {
      sr.reveal(revealArchiveLink.current, srConfig());
    }
  }, [prefersReducedMotion]);

  const zIndexes = useMemo(
    () => Array.from({ length: cardCount }, (_, i) => i + 1),
    [cardCount]
  );

  return (
    <Section id="dashboards">
      <HeaderRow>
        <h2 className="numbered-heading">BI - Dashboards</h2>
        <GalleryLink
          to="/alldashboard"
          ref={revealArchiveLink}
          className="archive-link"
        >
          Check Out the Gallery →
        </GalleryLink>
      </HeaderRow>

      <Frame ref={frameRef} $h={h}>
        {DASHBOARDS.map((d, i) => (
          <Card
            key={d.title}
            ref={el => (cardRefs.current[i] = el)}
            $top={topOffsets[i] ?? 0}
            $z={zIndexes[i]}
            aria-label={`Dashboard ${i + 1} of ${cardCount}`}
          >
            <Left>
              <Eyebrow>{d.eyebrow}</Eyebrow>
              <Title>{d.title}</Title>
              <Blurb>{d.blurb}</Blurb>
              {!!d.tags?.length && (
                <Chips>{d.tags.map(t => <li key={t}>{t}</li>)}</Chips>
              )}
              <CTA href={d.href}>Learn more →</CTA>
            </Left>

            <Preview>
              {d.image ? (
                <img src={d.image} alt={d.title} loading="lazy" />
              ) : (
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '16/9',
                    borderRadius: 12,
                    background:
                      'radial-gradient(800px 480px at 75% 80%, rgba(88,128,255,.16), transparent 60%), #0f1c2f',
                    boxShadow: 'inset 0 0 0 1px rgba(148,163,184,.12)',
                  }}
                />
              )}
            </Preview>
          </Card>
        ))}
      </Frame>
    </Section>
  );
}
