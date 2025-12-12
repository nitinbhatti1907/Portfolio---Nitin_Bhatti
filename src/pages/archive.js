// src/pages/archive.js
import React, { useRef, useEffect } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';
import { Icon } from '@components/icons';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

/* === Outer layout: same behaviour as All Dashboards === */
const PageWrap = styled.main`
  max-width: 1200px;
  margin: 0 auto;
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
    padding: 48px 16px 72px;

    p.subtitle {
      margin-bottom: 22px;
    }
  }
`;

/* === Table layout: desktop + mobile collapse like All Dashboards === */
const TableWrap = styled.div`
  margin-top: 6px;

  table {
    width: 100%;
    border-collapse: collapse;
  }

  thead th {
    padding: 10px 12px;
    text-align: left;
    font-weight: 700;
    color: var(--lightest-slate);
  }

  /* header separator line */
  thead tr {
    border-bottom: 1px solid rgba(148, 163, 184, 0.7);
  }

  tbody tr {
    &:hover {
      background: var(--light-navy);
    }
  }

  /* a bit more space under the header line */
  tbody tr:first-child td {
    padding-top: 22px;
  }

  td,
  th {
    padding: 14px 12px;
    vertical-align: top;

    &:first-child {
      padding-left: 0;
    }
    &:last-child {
      padding-right: 23px;
    }
  }

  /* shared helper: hide columns on mobile */
  .hide-on-mobile {
    @media (max-width: 768px) {
      display: none;
    }
  }

  .col-series {
    width: 15%;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
  }

  .col-title {
    width: 41%;
    color: var(--lightest-slate);
    font-weight: 700;
    font-size: clamp(16px, 2.1vw, 22px);
  }

  .col-tech {
    width: 34%;
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    color: var(--slate);
    line-height: 1.7;

    .separator {
      margin: 0 6px;
    }

    span {
      display: inline-block;
    }
  }

  .col-link {
    width: 10%;
    text-align: right;
  }

  .links {
    display: inline-flex;
    align-items: center;
    gap: 20px;
    justify-content: flex-end;
  }

  .icon-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    border: 1px solid var(--lightest-navy);
    color: var(--lightest-slate);
    transition: var(--transition);
  }

  .icon-link:hover,
  .icon-link:focus-visible {
    color: var(--green);
    border-color: var(--green);
    outline: none;
  }

  /* ===== Mobile layout ===== */
  @media (max-width: 768px) {
    thead th {
      font-size: var(--fz-xs);
      padding: 8px 8px;
    }

    td,
    th {
      padding: 10px 8px;
    }

    .col-series {
      width: 18%;
    }

    .col-title {
      width: 58%;
      /* titles can wrap on mobile */
    }

    .col-link {
      width: 24%;
    }
  }
`;

const ArchivePage = ({ location, data }) => {
  const projects = data.allMarkdownRemark.edges;
  const revealTitle = useRef(null);
  const revealTable = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealTable.current, srConfig(200, 0));
    revealProjects.current.forEach((ref, i) =>
      sr.reveal(ref, srConfig(i * 10)),
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Layout location={location}>
      <Helmet title="Archive" />
      <PageWrap>
        <header ref={revealTitle}>
          <h1 className="big-heading">Archive</h1>
          <p className="subtitle">A small list of things I’ve worked on</p>
        </header>

        <TableWrap ref={revealTable}>
          <table>
            <thead>
              <tr>
                <th>Series</th>
                <th>Project Title</th>
                <th className="hide-on-mobile">Built with</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {projects.length > 0 &&
                projects.map(({ node }, i) => {
                  const { serial, github, external, title, tech } =
                    node.frontmatter;

                  return (
                    <tr
                      key={i}
                      ref={el => (revealProjects.current[i] = el)}
                    >
                      <td className="col-series">{serial}</td>

                      <td className="col-title">{title}</td>

                      <td className="col-tech hide-on-mobile">
                        {tech?.length > 0 &&
                          tech.map((item, idx) => (
                            <span key={idx}>
                              {item}
                              {idx !== tech.length - 1 && (
                                <span className="separator">&middot;</span>
                              )}
                            </span>
                          ))}
                      </td>

                      <td className="col-link">
                        <div className="links">
                          {github && (
                            <a
                              className="icon-link"
                              href={github}
                              aria-label="GitHub link"
                              target="_blank"
                              rel="noreferrer"
                              title="GitHub"
                            >
                              <Icon name="GitHub" />
                            </a>
                          )}
                          {external && (
                            <a
                              className="icon-link"
                              href={external}
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
                  );
                })}
            </tbody>
          </table>
        </TableWrap>
      </PageWrap>
    </Layout>
  );
};

ArchivePage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default ArchivePage;

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/projects/" } }
      sort: { fields: [frontmatter___serial], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            serial
            title
            tech
            github
            external
          }
          html
        }
      }
    }
  }
`;