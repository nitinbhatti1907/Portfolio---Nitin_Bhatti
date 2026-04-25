// src/sections/about.js (or wherever your About component lives)
import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 1000px;
  margin: 0 auto 20px;

  /* single flow container; float will handle the layout */
  .inner {
    display: block;
  }

  /* clearfix so content below doesn't slide under the float */
  .text::after {
    content: '';
    display: table;
    clear: both;
  }

  /* paragraphs – justified for clean edges (NO word cutting) */
  .text p {
    text-align: justify;
    text-justify: inter-word;

    /* ✅ stop auto splits like "plat-forms" */
    hyphens: none;
    -webkit-hyphens: none;
    -ms-hyphens: none;

    /* ✅ keep whole words together */
    word-break: keep-all;
    overflow-wrap: normal;

    margin: 0 0 15px;
  }

  /* PHOTO — float right so text wraps responsively beside it */
  .pic {
    float: right;
    width: clamp(220px, 26vw, 320px);
    margin: 0 0 28px 32px; /* ↑ extra space below image */

    /* Make surrounding text keep a bit of distance from the photo’s edge */
    @supports (shape-outside: margin-box) {
      shape-outside: margin-box;
      shape-margin: 12px; /* buffer around the float (incl. bottom) */
    }
  }

  /* mobile: drop the float and center image */
  @media (max-width: 768px) {
    .pic {
      float: none;
      margin: 40px auto 28px;
      width: 70%;
    }
  }

  /* skills list keeps your existing styles but will naturally fall below the image */
`;

const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(180px, 1fr));
    gap: 6px 24px;
    padding: 0;
    margin: 24px 0 0;
    list-style: none;

    li {
      position: relative;
      padding-left: 24px;
      font-family: var(--font-mono);
      /* Bigger, responsive size */
      font-size: clamp(14px, 1.05vw, 16px);
      line-height: 1.6;

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        top: 0.15em;
        color: var(--green);
        font-size: 1em; /* keep bullet sized with the text */
        line-height: 1;
      }
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr 1fr;
      gap: 8px 16px;
      li {
        font-size: 15px;
      }
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
      li {
        font-size: 15px;
      }
    }
  }
`;

const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    position: relative;
    display: block;
    width: 100%;
    border-radius: var(--border-radius);
    background: transparent; /* no tint by default */
    transition: var(--transition);
  }

  /* ✅ keep the ORIGINAL hover motion for card + frame */
  .wrapper:hover,
  .wrapper:focus {
    outline: 0;
    transform: translate(-4px, -4px);
  }
  .wrapper:hover::after,
  .wrapper:focus::after {
    transform: translate(8px, 8px); /* same frame slide as before */
  }

  /* frame (behind the image) — unchanged */
  .wrapper::after {
    content: '';
    position: absolute;
    top: 14px;
    left: 14px;
    width: 100%;
    height: 100%;
    border: 2px solid var(--green);
    border-radius: var(--border-radius);
    transition: var(--transition);
    z-index: -1; /* stays behind */
  }

  /* cyan tint overlay — ONLY appears on hover */
  .wrapper::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--border-radius);
    background: var(--green);
    mix-blend-mode: multiply;
    opacity: 0; /* hidden by default */
    transition: var(--transition);
    pointer-events: none;
    z-index: 1; /* above the image, below nothing else */
  }
  .wrapper:hover::before,
  .wrapper:focus::before {
    opacity: 1; /* show cyan tint on hover */
  }

  /* normal photo (white/untinted) by default */
  .img {
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    border-radius: var(--border-radius);
    mix-blend-mode: normal;
    filter: none;
    transition: var(--transition);
    z-index: 0;
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'Python',
    'SQL',
    'DAX',
    'Pandas & NumPy',
    'scikit-learn & TensorFlow',
    'Matplotlib & Seaborn',
    'Power BI',
    'Metabase',
    'Tableau',
    'Django',
    'AWS Textract (OCR)',
    'Git & GitHub',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        {/* TEXT COLUMN with a floated photo at the top-right */}
        <StyledText className="text">
          <StyledPic className="pic">
            <div className="wrapper">
              <StaticImage
                className="img"
                src="../../images/headshot.jpg"
                width={500}
                quality={95}
                formats={['AUTO', 'WEBP', 'AVIF']}
                alt="Headshot"
              />
            </div>
          </StyledPic>

          <p>
            I'm Nitin Bhatti, a <b>Data Analyst / BI Developer</b> with 2.5+ years of experience
            turning messy data into dashboards business teams actually use. My core toolkit is
            <b> Power BI (DAX, Power Query), SQL, and Python</b> (pandas, NumPy, scikit-learn),
            supported by <b>Tableau, Metabase, and advanced Excel</b>. I care about clean ETL
            pipelines, dimensional data models, trustworthy KPIs, and explainable outputs—the kind
            that hold up in stakeholder reviews instead of needing a footnote.
          </p>

          <p>
            Currently, I work with the <b>NORDIK Institute (DATANORTH project)</b> on a remote
            intern position, structuring <b>Northern Ontario</b> datasets across population, health,
            weather, immigration, and community development into chart-ready indicators for a
            redesigned public data platform. At <b>TechAnek Technologies</b>, I built Power BI and
            Metabase dashboards that delivered 40% faster reporting and 20% fewer data
            inconsistencies on 50,000+ records, automated recurring analytics with
            <b> Python + SQL pipelines</b>, and tuned <b>DAX measures</b> and SQL queries to keep
            dashboards responsive at scale. Earlier, with <b>SAP India (Edunet Foundation)</b>, I
            prototyped AI/IoT and computer vision workflows and ran exploratory data analysis on
            training datasets that informed cleaner model splits. Teaching <b>Python</b> to 50+
            learners along the way sharpened how I explain technical work to non-technical
            audiences.
          </p>

          <p>
            My goal is to own analytics <b>end-to-end</b>—from requirements gathering and data
            modeling to dashboards that drive decisions. I'm actively expanding my
            <b> Power BI dashboard gallery</b>, deepening <b>DAX and SQL</b>, exploring
            <b> Microsoft Fabric</b> and semantic modeling, and practicing product-level
            storytelling with real Canadian datasets. While completing my M.Sc. in Computer
            Science at Algoma University, I'm open to work as a <b> Data Analyst, BI Developer,
            or Analytics Engineer roles</b> in Canada where I can ship measurable impact quickly.
          </p>

          <p className="skills-intro">Here are a few technologies I’ve been working with recently:</p>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>
      </div>
    </StyledAboutSection>
  );
};

export default About;
