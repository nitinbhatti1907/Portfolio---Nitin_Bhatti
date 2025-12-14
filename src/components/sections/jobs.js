// src/components/sections/jobs.js
import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

/* ----------------------------- styled blocks ----------------------------- */

const Section = styled.section`
  max-width: 900px;
  margin: 0 auto 50px;

  .numbered-heading {
    margin-bottom: 24px;
  }
`;

const Rail = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px;
  margin-bottom: 22px;
  padding-bottom: 6px;
`;

const LogoButton = styled.button`
  appearance: none;
  border: 0;
  background: transparent;
  padding: 0;
  cursor: pointer;

  width: 56px;
  height: 56px;
  border-radius: 999px;

  box-shadow: inset 0 0 0 2px
    ${({ $active }) => ($active ? 'var(--green)' : 'var(--lightest-navy)')};

  transition: box-shadow 180ms ease, transform 180ms ease, background 180ms ease;

  display: grid;
  place-items: center;

  &:hover,
  &:focus-visible {
    box-shadow: inset 0 0 0 2px var(--green), 0 0 0 4px var(--green-tint);
    transform: translateY(-2px);
    outline: none;
  }

  span.badge {
    display: inline-grid;
    place-items: center;
    width: 42px;
    height: 42px;
    border-radius: 999px;
    font-weight: 700;
    letter-spacing: 0.5px;
    font-size: 14px;
    color: var(--lightest-slate);
    background: ${({ $active }) =>
    $active ? 'var(--green-tint)' : 'var(--light-navy)'};
  }
`;

const Panels = styled.div`
  position: relative;

  /* inner panel fade/slide */
  .panel-enter {
    opacity: 0.001;
    transform: translateY(6px);
  }
  .panel-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 320ms cubic-bezier(0.22, 1, 0.36, 1),
      transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  .panel-exit {
    position: absolute;
    left: 0;
    right: 0;
    opacity: 1;
    transform: translateY(0);
  }
  .panel-exit-active {
    opacity: 0.001;
    transform: translateY(-6px);
    transition: opacity 220ms ease, transform 220ms ease;
  }
`;

const Panel = styled.div`
  width: 100%;
  padding: 6px 2px;

  h3 {
    margin: 0 0 6px 0;
    font-size: clamp(22px, 3vw, 30px);
    line-height: 1.25;

    /* IMPORTANT: wrap only between title and the "@ + company" chunk */
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    column-gap: 10px;
    row-gap: 4px;

    .company {
      color: var(--green);

      /* keep "@ + company" together so wrap happens BEFORE @ */
      display: inline-flex;
      align-items: baseline;
      white-space: nowrap;

      .at {
        margin-right: 8px;
      }

      a.inline-link {
        color: inherit !important;
        position: relative;
        display: inline-block;
        text-decoration: none !important;
        outline: none;

        /* hard reset global inline-link styles (the "bar" one) */
        background: transparent !important;
        background-image: none !important;
        box-shadow: none !important;

        /* remove any existing ::before from global */
        &::before {
          content: none !important;
          display: none !important;
        }

        /* our underline (thin + left-to-right animation) */
        &::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 100%;
          height: 1px;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 220ms ease;
          pointer-events: none;
        }

        &:hover::after,
        &:focus-visible::after {
          transform: scaleX(1);
        }
      }
    }
  }

  .range {
    display: block;
    margin-bottom: 16px;
    font-family: var(--font-mono);
    font-size: clamp(13px, 0.95vw, 15px);
    color: var(--slate);
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    position: relative;
    margin: 0 0 12px 0;
    padding-left: 26px;
    font-size: clamp(15px, 1.05vw, 18px);
    line-height: 1.7;
    color: var(--slate);

    /* clean multi-line bullets */
    text-align: justify;
    text-justify: inter-word;

    &::before {
      content: '▹';
      position: absolute;
      left: 0;
      top: 0.2em;
      color: var(--green);
    }
  }
`;

/* hidden measuring wrapper */
const HiddenMeasure = styled.div`
  position: absolute;
  visibility: hidden;
  pointer-events: none;
  left: 0;
  right: 0;
  top: 0;
`;

/* ----------------------------- helpers ----------------------------- */

const getInitials = (name = '') => {
  const parts = name
    .replace(/[@&]/g, ' ')
    .split(' ')
    .filter(Boolean)
    .slice(0, 3);
  return parts
    .map(p => p[0])
    .join('')
    .toUpperCase()
    .slice(0, 3);
};

/* -------------------------------- view -------------------------------- */

const Jobs = () => {
  const data = useStaticQuery(graphql`
    query JobsQuery {
      jobs: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/jobs/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              company
              range
              url
            }
            html
          }
        }
      }
    }
  `);

  const jobs = data.jobs.edges ?? [];
  const [active, setActive] = useState(0);

  const prefersReducedMotion = usePrefersReducedMotion();
  const revealRef = useRef(null);
  const panelsRef = useRef(null);
  const measureRef = useRef(null);
  const [minHeight, setMinHeight] = useState(0);

  useEffect(() => {
    if (!prefersReducedMotion) {
      sr.reveal(revealRef.current, srConfig());
    }
  }, [prefersReducedMotion]);

  const activeNode = jobs[active]?.node;
  const activeFm = activeNode?.frontmatter ?? {};
  const activeHtml = activeNode?.html ?? '';

  const badges = useMemo(
    () => jobs.map(({ node }) => getInitials(node.frontmatter.company)),
    [jobs],
  );

  // Measure tallest panel once (and on resize) to reserve space -> prevents Projects jumping
  useEffect(() => {
    const measure = () => {
      const wrap = measureRef.current;
      if (!wrap) return;
      const children = Array.from(wrap.children);
      const maxH = children.reduce((mx, el) => Math.max(mx, el.offsetHeight || 0), 0);
      setMinHeight(maxH);
    };

    // measure after initial paint
    const id = requestAnimationFrame(measure);
    // re-measure on resize (debounced)
    let t = null;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(measure, 120);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', onResize);
      clearTimeout(t);
    };
  }, [jobs]);

  return (
    <Section id="experience" ref={revealRef}>
      <h2 className="numbered-heading">Industry Experience</h2>

      {/* Logo rail */}
      <Rail role="tablist" aria-label="Company tabs">
        {jobs.map(({ node }, i) => {
          const fm = node.frontmatter;
          return (
            <LogoButton
              key={fm.company + i}
              onClick={() => setActive(i)}
              aria-selected={active === i}
              aria-controls={`panel-${i}`}
              role="tab"
              $active={active === i}
              title={fm.company}
            >
              <span className="badge">{badges[i]}</span>
            </LogoButton>
          );
        })}
      </Rail>

      {/* Content panel; minHeight reserves the tallest space so the next section never moves */}
      <Panels ref={panelsRef} style={{ minHeight: minHeight ? `${minHeight}px` : undefined }}>
        <SwitchTransition mode="out-in">
          <CSSTransition key={active} classNames="panel" timeout={{ enter: 320, exit: 220 }} unmountOnExit>
            <Panel id={`panel-${active}`} role="tabpanel" aria-labelledby={`tab-${active}`}>
              <h3>
                <span>{activeFm.title}</span>
                <span className="company">
                  <span className="at">@</span>
                  <a href={activeFm.url} className="inline-link">
                    {activeFm.company}
                  </a>
                </span>
              </h3>

              <span className="range">{activeFm.range}</span>
              <div dangerouslySetInnerHTML={{ __html: activeHtml }} />
            </Panel>
          </CSSTransition>
        </SwitchTransition>
      </Panels>

      {/* Off-screen measurer renders all panels once to find the tallest height */}
      <HiddenMeasure ref={measureRef} aria-hidden="true">
        {jobs.map(({ node }, i) => {
          const fm = node.frontmatter;
          return (
            <Panel key={`measure-${i}`}>
              <h3>
                <span>{fm.title}</span>
                <span className="company">
                  &nbsp;@&nbsp;<a href={fm.url} className="inline-link">{fm.company}</a>
                </span>
              </h3>
              <span className="range">{fm.range}</span>
              <div dangerouslySetInnerHTML={{ __html: node.html }} />
            </Panel>
          );
        })}
      </HiddenMeasure>
    </Section>
  );
};

export default Jobs;