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

    .company {
      color: var(--green);
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
                  &nbsp;@&nbsp;
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


// // src/components/sections/jobs.js
// import React, { useEffect, useRef, useState } from 'react';
// import styled from 'styled-components';
// import { srConfig } from '@config';
// import sr from '@utils/sr';
// import { usePrefersReducedMotion } from '@hooks';

// /* ----------------------------- styled blocks ----------------------------- */

// const Section = styled.section`
//   max-width: 900px;
//   margin: 50px auto 0; /* 🔹 consistent section gap after About */

//   .numbered-heading {
//     margin-bottom: 24px;
//   }
// `;

// const Rail = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   align-items: center;
//   gap: 14px;
//   margin-bottom: 22px;
//   padding-bottom: 6px;
// `;

// const LogoButton = styled.button`
//   appearance: none;
//   border: 0;
//   background: transparent;
//   padding: 0;
//   cursor: pointer;

//   width: 56px;
//   height: 56px;
//   border-radius: 999px;

//   box-shadow: inset 0 0 0 2px
//     ${({ $active }) => ($active ? 'var(--green)' : 'var(--lightest-navy)')};

//   transition: box-shadow 180ms ease, transform 180ms ease, background 180ms ease;

//   display: grid;
//   place-items: center;

//   &:hover,
//   &:focus-visible {
//     box-shadow: inset 0 0 0 2px var(--green), 0 0 0 4px var(--green-tint);
//     transform: translateY(-2px);
//     outline: none;
//   }

//   span.badge {
//     display: inline-grid;
//     place-items: center;
//     width: 42px;
//     height: 42px;
//     border-radius: 999px;
//     font-weight: 700;
//     letter-spacing: 0.5px;
//     font-size: 14px;
//     color: var(--lightest-slate);
//     background: ${({ $active }) =>
//       $active ? 'var(--green-tint)' : 'var(--light-navy)'};
//   }
// `;

// const Panels = styled.div`
//   position: relative;

//   /* inner panel fade/slide */
//   .panel-enter {
//     opacity: 0.001;
//     transform: translateY(6px);
//   }
//   .panel-enter-active {
//     opacity: 1;
//     transform: translateY(0);
//     transition: opacity 320ms cubic-bezier(0.22, 1, 0.36, 1),
//       transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
//   }
//   .panel-exit {
//     position: absolute;
//     left: 0;
//     right: 0;
//     opacity: 1;
//     transform: translateY(0);
//   }
//   .panel-exit-active {
//     opacity: 0.001;
//     transform: translateY(-6px);
//     transition: opacity 220ms ease, transform 220ms ease;
//   }
// `;

// const Panel = styled.div`
//   width: 100%;
//   padding: 6px 2px;

//   h3 {
//     margin: 0 0 6px 0;
//     font-size: clamp(22px, 3vw, 30px);
//     line-height: 1.25;

//     .company {
//       color: var(--green);
//     }
//   }

//   .range {
//     display: block;
//     margin-bottom: 16px;
//     font-family: var(--font-mono);
//     font-size: clamp(13px, 0.95vw, 15px);
//     color: var(--slate);
//   }

//   ul {
//     margin: 0;
//     padding: 0;
//     list-style: none;
//   }

//   li {
//     position: relative;
//     margin: 0 0 12px 0;
//     padding-left: 26px;
//     font-size: clamp(15px, 1.05vw, 18px);
//     line-height: 1.7;
//     color: var(--slate);

//     /* clean multi-line bullets */
//     text-align: justify;
//     text-justify: inter-word;

//     &::before {
//       content: '▹';
//       position: absolute;
//       left: 0;
//       top: 0.2em;
//       color: var(--green);
//     }
//   }
// `;

// /* hidden measuring wrapper */
// const HiddenMeasure = styled.div`
//   position: absolute;
//   visibility: hidden;
//   pointer-events: none;
//   left: 0;
//   right: 0;
//   top: 0;
// `;

// /* ----------------------------- helpers + data ----------------------------- */

// const getInitials = (name = '') => {
//   const parts = name
//     .replace(/[@&]/g, ' ')
//     .split(' ')
//     .filter(Boolean)
//     .slice(0, 3);
//   return parts
//     .map(p => p[0])
//     .join('')
//     .toUpperCase()
//     .slice(0, 3);
// };

// /* 🔹 You can edit these bullets any time – no markdown / GraphQL needed */
// const JOBS = [
//   {
//     title: 'Data Analyst',
//     company: 'TechAnek Technologies',
//     url: 'https://techanek.com',
//     range: '2023 – 2024',
//     points: [
//       'Designed and shipped interactive KPI dashboards in Power BI and Metabase for sales, marketing, and ops teams.',
//       'Automated recurring Excel / CSV reporting pipelines in Python, cutting manual effort by ~40%.',
//       'Implemented OCR ingestion flows using AWS Textract to turn PDFs into analytics-ready tables.',
//       'Built and monitored ML models for classification and anomaly detection, focusing on business-friendly explanations.',
//     ],
//   },
//   {
//     title: 'Project Intern – AI & IoT',
//     company: 'SAP India (Edunet Foundation)',
//     url: 'https://www.sap.com',
//     range: '2022 – 2023',
//     points: [
//       'Prototyped small AI/IoT utilities and computer-vision PoCs for learning and internal demos.',
//       'Worked with edge-device data streams, basic time-series analysis, and dashboarding for quick insights.',
//       'Collaborated with mentors to turn rough ideas into working technical demos under tight timelines.',
//     ],
//   },
//   {
//     title: 'Machine Learning Intern',
//     company: 'Infolabz',
//     url: 'https://infolabz.com',
//     range: '2021 – 2022',
//     points: [
//       'Trained and evaluated ML models on tabular datasets using scikit-learn and TensorFlow.',
//       'Created clear visualizations and summaries for client-facing reports and presentations.',
//       'Documented experiments, metrics, and data-prep steps to keep work reproducible for the team.',
//     ],
//   },
// ];

// /* -------------------------------- view -------------------------------- */

// const Jobs = () => {
//   const jobs = JOBS;
//   const [active, setActive] = useState(0);

//   const prefersReducedMotion = usePrefersReducedMotion();
//   const revealRef = useRef(null);
//   const panelsRef = useRef(null);
//   const measureRef = useRef(null);
//   const [minHeight, setMinHeight] = useState(0);

//   useEffect(() => {
//     if (!prefersReducedMotion) {
//       sr.reveal(revealRef.current, srConfig());
//     }
//   }, [prefersReducedMotion]);

//   const badges = jobs.map(job => getInitials(job.company));
//   const activeJob = jobs[active];

//   // Measure tallest panel once (and on resize) to reserve space -> prevents Projects jumping
//   useEffect(() => {
//     const measure = () => {
//       const wrap = measureRef.current;
//       if (!wrap) return;
//       const children = Array.from(wrap.children);
//       const maxH = children.reduce(
//         (mx, el) => Math.max(mx, el.offsetHeight || 0),
//         0,
//       );
//       setMinHeight(maxH);
//     };

//     const id = requestAnimationFrame(measure);
//     let t = null;
//     const onResize = () => {
//       clearTimeout(t);
//       t = setTimeout(measure, 120);
//     };
//     window.addEventListener('resize', onResize);

//     return () => {
//       cancelAnimationFrame(id);
//       window.removeEventListener('resize', onResize);
//       clearTimeout(t);
//     };
//   }, [jobs]);

//   return (
//     <Section id="experience" ref={revealRef}>
//       <h2 className="numbered-heading">Industry Experience</h2>

//       {/* Logo rail */}
//       <Rail role="tablist" aria-label="Company tabs">
//         {jobs.map((job, i) => (
//           <LogoButton
//             key={job.company + i}
//             onClick={() => setActive(i)}
//             aria-selected={active === i}
//             aria-controls={`panel-${i}`}
//             role="tab"
//             $active={active === i}
//             title={job.company}
//           >
//             <span className="badge">{badges[i]}</span>
//           </LogoButton>
//         ))}
//       </Rail>

//       {/* Content panel; minHeight reserves the tallest space so the next section never moves */}
//       <Panels
//         ref={panelsRef}
//         style={{ minHeight: minHeight ? `${minHeight}px` : undefined }}
//       >
//         {/* We keep just a simple panel now; animation classes are still available if you want transitions later */}
//         <Panel
//           id={`panel-${active}`}
//           role="tabpanel"
//           aria-labelledby={`tab-${active}`}
//         >
//           <h3>
//             <span>{activeJob.title}</span>
//             <span className="company">
//               &nbsp;@&nbsp;
//               <a href={activeJob.url} className="inline-link">
//                 {activeJob.company}
//               </a>
//             </span>
//           </h3>

//           <span className="range">{activeJob.range}</span>

//           <ul>
//             {activeJob.points.map((point, i) => (
//               <li key={i}>{point}</li>
//             ))}
//           </ul>
//         </Panel>
//       </Panels>

//       {/* Off-screen measurer renders all panels once to find the tallest height */}
//       <HiddenMeasure ref={measureRef} aria-hidden="true">
//         {jobs.map((job, i) => (
//           <Panel key={`measure-${i}`}>
//             <h3>
//               <span>{job.title}</span>
//               <span className="company">
//                 &nbsp;@&nbsp;
//                 <a href={job.url} className="inline-link">
//                   {job.company}
//                 </a>
//               </span>
//             </h3>
//             <span className="range">{job.range}</span>
//             <ul>
//               {job.points.map((point, idx) => (
//                 <li key={idx}>{point}</li>
//               ))}
//             </ul>
//           </Panel>
//         ))}
//       </HiddenMeasure>
//     </Section>
//   );
// };

// export default Jobs;
