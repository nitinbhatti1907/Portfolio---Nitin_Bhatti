// src/pages/alldashboard.js
import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { Layout } from '@components';
import { Icon } from '@components/icons';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const PageWrap = styled.main`
  max-width: 1200px;
  margin: 0 auto;

  /* add horizontal padding so content doesn't touch the edge */
  padding: clamp(56px, 7vw, 84px) 20px 96px;

  h1.big-heading {
    margin: 0 0 10px;
    line-height: 1.08;
  }

  p.subtitle {
    margin: 0 0 28px;
    color: var(--green);
    font-family: var(--font-mono);
  }

  @media (max-width: 768px) {
    /* a bit tighter on very small screens, but still padded */
    padding: 48px 16px 72px;

    p.subtitle {
      margin-bottom: 22px;
    }
  }
`;

/* 🔹 Filter / tabs row */
const FilterBar = styled.div`
  margin: 6px 0 18px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  @media (max-width: 768px) {
    margin-bottom: 14px;
  }

  @media (max-width: 600px) {
    gap: 8px;
    overflow-x: auto;
    padding-bottom: 4px;
  }

  button {
    position: relative;
    padding: 6px 14px;
    border-radius: 999px;
    border: 1px solid rgba(148, 163, 184, 0.45);
    background: transparent;
    color: var(--slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    white-space: nowrap;
    transition:
      background 0.22s ease,
      color 0.22s ease,
      border-color 0.22s ease,
      box-shadow 0.22s ease;
  }

  button[data-active='true'] {
    color: #020617;
    border-color: rgba(34, 211, 238, 0.95);
    background: radial-gradient(
      circle at 10% 0%,
      rgba(56, 189, 248, 0.4),
      rgba(34, 211, 238, 0.98)
    );
    box-shadow: 0 0 16px rgba(34, 211, 238, 0.4);
  }

  button:hover:not([data-active='true']),
  button:focus-visible:not([data-active='true']) {
    border-color: rgba(148, 163, 184, 0.85);
    color: var(--lightest-slate);
    outline: none;
  }

  @media (max-width: 600px) {
    button {
      padding: 4px 10px;
      font-size: 9px;
      letter-spacing: 0.06em;
    }
  }
`;

const TableWrap = styled.div`
  /* desktop / large screens: stretch slightly past content to match Archive vibe */
  margin: 90px -20px 0;

  /* small & medium screens: no negative margin → no horizontal scroll */
  @media (max-width: 1200px) {
    margin: 50px 0 0;
    max-width: 100%;
    overflow-x: hidden;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    .hide-on-mobile {
      @media (max-width: 768px) {
        display: none;
      }
    }

    thead tr {
      border-bottom: 1px solid rgba(148, 163, 184, 0.7);
    }

    tbody tr {
      &:hover,
      &:focus {
        background-color: var(--light-navy);
      }
    }

    th,
    td {
      padding: 10px;
      text-align: left;

      &:first-child {
        padding-left: 20px;

        @media (max-width: 768px) {
          padding-left: 10px;
        }
      }
      &:last-child {
        padding-right: 20px;

        @media (max-width: 768px) {
          padding-right: 10px;
        }
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }

    tr {
      cursor: default;

      td:first-child {
        border-top-left-radius: var(--border-radius);
        border-bottom-left-radius: var(--border-radius);
      }
      td:last-child {
        border-top-right-radius: var(--border-radius);
        border-bottom-right-radius: var(--border-radius);
      }
    }

    td {
      &.series {
        padding-right: 20px;
        color: var(--green);
        font-family: var(--font-mono);

        @media (max-width: 768px) {
          padding-right: 10px;
          font-size: var(--fz-sm);
        }
      }

      &.tool {
        color: var(--green);
        font-family: var(--font-mono);
        font-size: var(--fz-xs);
      }

      &.title {
        padding-top: 15px;
        padding-right: 20px;
        color: var(--lightest-slate);
        font-size: var(--fz-xl);
        font-weight: 600;
        line-height: 1.25;
        white-space: nowrap;

        @media (max-width: 1024px) {
          white-space: normal;
        }
      }

      &.tags {
        font-size: var(--fz-xxs);
        font-family: var(--font-mono);
        line-height: 1.5;

        .separator {
          margin: 0 5px;
        }
        span {
          display: inline-block;
        }
      }

      &.links {
        min-width: 100px;

        div {
          display: flex;
          align-items: center;

          a {
            ${({ theme }) => theme.mixins.flexCenter};
            flex-shrink: 0;
          }

          a + a {
            margin-left: 10px;
          }
        }
      }
    }
  }
`;

/* Rows: add more dashboards later; filters auto-update from `tool` */
const rows = [
  {
    series: '01',
    tool: 'Power BI',
    title: 'Sales Insights',
    tags: 'Region · Product · Drilldowns',
    href: 'https://drive.google.com/file/d/1rWlweySLS6Ok16gCAnDepFsfCjdtXTbT/view',
    github: 'https://github.com/nitinbhatti1907/PowerBI-Dashboards',
  },
  {
    series: '02',
    tool: 'Power BI',
    title: 'Personal Finance',
    tags: 'DAX · Data Modeling · Budget vs. Actual',
    href: 'https://drive.google.com/file/u/0/d/1QstYuUGWija_QH8OHV7RFsZylvZeseRJ/view?usp=sharing&pli=1',
    github: 'https://github.com/nitinbhatti1907/PowerBI-Dashboards',
  },
  {
    series: '03',
    tool: 'Tableau',
    title: 'Climate Dashboard - Canada',
    tags: 'Model Prediction · KPI · Data Preprocessing',
    href: 'https://public.tableau.com/app/profile/nitin.pravinbhai.bhatti/viz/DataNorth/ClimateDashboard',
    github: 'https://github.com/nitinbhatti1907/Tableau-Dashboards',
  },
  // later you can add Metabase rows like:
  // { series: '04', tool: 'Metabase', title: '...', tags: '...', href: '...', github: '...' },
];

export default function AllDashboards({ location }) {
  const revealTitle = useRef(null);
  const revealTable = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // 🔹 filter state
  const [activeTool, setActiveTool] = useState('All');

  // tools list is derived from data → adding a new tool auto-creates a tab
  const toolFilters = ['All', ...Array.from(new Set(rows.map((r) => r.tool)))];

  // rows to show under current filter
  const visibleRows =
    activeTool === 'All' ? rows : rows.filter((r) => r.tool === activeTool);

  useEffect(() => {
    if (prefersReducedMotion) return;
    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealTable.current, srConfig(200, 0));
  }, [prefersReducedMotion]);

  return (
    <Layout location={location}>
      <Helmet title="All Dashboards" />
      <PageWrap>
        <header ref={revealTitle}>
          <h1 className="big-heading">All Dashboards</h1>
          <p className="subtitle">A compact list of visuals I’ve built</p>
        </header>

        {/* 🔹 Filter / tabs */}
        <FilterBar>
          {toolFilters.map(label => (
            <button
              key={label}
              type="button"
              data-active={activeTool === label}
              onClick={() => setActiveTool(label)}
            >
              {label === 'All' ? 'All tools' : label}
            </button>
          ))}
        </FilterBar>

        <TableWrap ref={revealTable}>
          <table>
            <thead>
              <tr>
                <th>Series</th>
                <th className="hide-on-mobile">Tool</th>
                <th>Title</th>
                <th className="hide-on-mobile">Focus / Tags</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((r, i) => (
                <tr key={`${r.series}-${i}`}>
                  <td className="overline series">{r.series}</td>
                  <td className="tool hide-on-mobile">{r.tool}</td>
                  <td className="title">{r.title}</td>
                  <td className="tags hide-on-mobile">{r.tags}</td>
                  <td className="links">
                    <div className="links-inner">
                      {r.github && (
                        <a
                          className="icon-link"
                          href={r.github}
                          aria-label="GitHub link"
                          target="_blank"
                          rel="noreferrer"
                          title="GitHub"
                        >
                          <Icon name="GitHub" />
                        </a>
                      )}
                      {r.href && (
                        <a
                          className="icon-link"
                          href={r.href}
                          aria-label="External link"
                          target="_blank"
                          rel="noreferrer"
                          title="Open"
                        >
                          <Icon name="External" />
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrap>
      </PageWrap>
    </Layout>
  );
}
