import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

/* =====================  styles  ===================== */

const StyledSection = styled.section`
  max-width: 1000px;
  margin: 0 auto 50px; 
`;

const FilterBar = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px 0 20px;

  button {
    border: 1px solid var(--lightest-navy);
    background: transparent;
    color: var(--slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    padding: 8px 12px;
    border-radius: 999px;
    transition: var(--transition);

    &:hover { color: var(--lightest-slate); border-color: var(--green); }
    &.active { background: var(--green-tint); color: var(--lightest-slate); border-color: var(--green); }
  }
`;

const Row = styled.ul`
  --gap: 16px;
  --edge: 22px;

  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  gap: var(--gap);
  list-style: none;
  margin: 0;
  padding: 0 var(--edge);

  overflow-x: auto;
  overflow-y: hidden;
  overscroll-behavior-inline: contain;
  scroll-snap-type: inline mandatory;
  padding-bottom: 22px;
  scrollbar-gutter: stable both-edges;
  scroll-padding-left: var(--edge);
  scroll-padding-right: var(--edge);

  -webkit-mask-image: none !important;
  mask-image: none !important;

  &::before,
  &::after { content: none !important; }
`;

const enter = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Card = styled.li`
  scroll-snap-align: start;

  width: clamp(260px, 28vw, 320px);
  border: 1px solid var(--lightest-navy);
  border-radius: 14px;
  background: rgba(13, 25, 43, 0.6);
  padding: 14px;
  transition: box-shadow 200ms ease, transform 200ms ease, border-color 200ms ease;

  ${({ $planned }) =>
    $planned &&
    `
      border-style: dashed;
      background:
        linear-gradient(0deg, rgba(34,211,238,0.06), rgba(34,211,238,0.06)),
        rgba(13,25,43,0.6);
    `}

  &:hover {
    transform: translateY(-3px);
    border-color: var(--green);
    box-shadow: 0 12px 30px rgba(34, 211, 238, 0.15);
  }

  ${({ $noMotion }) =>
    $noMotion
      ? css`opacity: 1; transform: none;`
      : css`
          opacity: 0;
          animation: ${enter} 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
          animation-delay: var(--delay, 0ms);
        `}
`;

const HeadRow = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
`;

const Badge = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid rgba(148, 163, 184, 0.25);
  display: grid;
  place-items: center;
  font-weight: 700;
  color: var(--lightest-slate);
  background: linear-gradient(180deg, rgba(148,163,184,0.10), rgba(148,163,184,0.02));
  letter-spacing: .5px;
  line-height: 1;
  white-space: nowrap;
  overflow: hidden;
  font-size: ${({ $chars }) => ($chars > 2 ? '0.78rem' : '0.95rem')};
  padding-inline: ${({ $chars }) => ($chars > 2 ? '2px' : '0')};
`;

const TitleWrap = styled.div`
  min-width: 0;

  h3 {
    margin: 0 0 2px;
    font-size: clamp(16px, 2vw, 18px);
    color: var(--lightest-slate);
    line-height: 1.25;
  }
  .meta {
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    color: var(--slate);
    opacity: .9;
  }
`;

const Pill = styled.span`
  padding: 3px 8px;
  border-radius: 999px;
  font-family: var(--font-mono);
  font-size: var(--fz-xxs);
  color: ${({ $kind }) => ($kind === 'planned' ? 'var(--green)' : 'var(--slate)')};
  border: 1px dashed ${({ $kind }) => ($kind === 'planned' ? 'var(--green)' : 'var(--lightest-navy)')};
  background: ${({ $kind }) => ($kind === 'planned' ? 'var(--green-tint)' : 'transparent')};
  white-space: nowrap;
`;

const Body = styled.div`
  color: var(--light-slate);
  font-size: var(--fz-sm);
  margin: 6px 0 10px;
`;

const Skills = styled.ul`
  display: flex; flex-wrap: wrap; gap: 6px 8px;
  list-style: none; padding: 0; margin: 0 0 10px;

  li {
    padding: 4px 8px;
    border-radius: 999px;
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    color: var(--light-slate);
    background: rgba(148, 163, 184, 0.08);
    white-space: nowrap;
  }
`;

const Actions = styled.div`
  display: flex; gap: 8px;

  a, button {
    border: 1px solid var(--lightest-navy);
    background: transparent;
    color: var(--lightest-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    padding: 6px 9px;
    border-radius: 8px;
    transition: var(--transition);
  }
  a:hover { border-color: var(--green); color: var(--green); }
  .disabled { opacity: .45; pointer-events: none; }
`;

/* =====================  data  ===================== */

const CERTS = [
  { title: 'PL-300 — Power BI Data Analyst', issuer: 'Microsoft', status: 'planned', date: '—',
    skills: ['Power BI', 'DAX', 'Data Modeling','Data Preprocessing'], url: '', badge: 'MS' },
  { title: 'Introduction to AI', issuer: 'Simplilearn', status: 'completed', date: '2024',
    skills: ['AI Basics','Generative AI','Python','ML'], url: 'https://drive.google.com/file/d/1-GOxGojiltYKCFLrB17iAhxxpPM2lQvr/view', badge: 'SL' },
  { title: 'Python for Data Science', issuer: 'Great Learning', status: 'completed', date: '2023',
    skills: ['Python', 'NumPy', 'Pandas'], url: 'https://drive.google.com/file/d/1UI_kLfTULcL8NL_HtZCPkuFf69XiTyTO/view', badge: 'GL' },
  { title: 'Training on Emerging Technology', issuer: 'SAP India', status: 'completed', date: '2024',
    skills: ['Python', 'AI', 'IoT', 'DL', 'ML'], url: 'https://drive.google.com/file/u/0/d/1BUlKkibGFPqPTrF5Ezj-LGMk1Mcw9S10/view?usp=sharing&pli=1', badge: 'SAP' },
  { title: '100 Activity Points', issuer: 'GTU', status: 'completed', date: '2024',
    skills: ['Co-curricular', 'Professional Development'], url: 'https://drive.google.com/file/d/1qYhOzWGuIuJ7i1WIAETjEnHOp1sN1wwd/view?usp=sharing', badge: 'GTU' },
  { title: 'Professional & Life Skill Development', issuer: 'Saffrony Institution', status: 'completed', date: '2024',
    skills: ['Soft Skills', 'Communication'], url: 'https://drive.google.com/file/d/18vgRzU_9_9iHF87RFGuOw_VW9OQDXmur/view', badge: 'SIT' },
  { title: 'AWS Certified – (MLS-C01): Data Engineering', issuer: 'LinkedIn Learning',
    status: 'completed', date: '2025', skills: ['AWS', 'Data Engineering', 'Applied ML'], url: 'https://www.linkedin.com/learning/certificates/044e74b174a77c62d56ddcbec0ef55b98d97f949fab0bd35637a79e0553ebbb2?u=76683114', badge: 'LI' },
  { title: 'Introduction to DAX', issuer: 'SQLBI', status: 'completed', date: '2025',
    skills: ['DAX', 'PowerBI'], url: 'https://drive.google.com/file/d/1TcJ5Gdz7dFu-sRs7uJ-BUqD8QAHIiDTW/view?usp=sharing', badge: 'S-BI' },
  { title: 'India AI Impact Festival 2024', issuer: 'MeitY-Gov. of India', status: 'completed', date: '2024',
    skills: ['AI', 'Python', 'Django', 'Google API', 'Hugging Face'], url: 'https://drive.google.com/file/d/18KFibs2uIWe2KFD7ork6I0oD7FLh-Y4g/view?usp=sharing', badge: 'GoI' },
  { title: 'VEYG 2022 - Annual Tech Fest (CPU Assemble)', issuer: 'Saffrony Institution', status: 'completed', date: '2022',
    skills: ['Computer Hardware', 'CPU Design'], url: 'https://drive.google.com/file/d/17sook3tQdrANDjyQOhDLPXewzGWfvs0l/view?usp=sharing', badge: 'SIT' },
  { title: 'Career Essentials in Data Analysis', issuer: 'Microsoft and LinkedIn', status: 'completed', date: '2025',
    skills: ['Data Analysis', 'Data Visualization', 'Data Analytics'], url: 'https://www.linkedin.com/learning/certificates/decfd494524a47f6c928c10d7262b9ed8e519356248f86bda3d4c486619c3943', badge: 'MS' }, 
];

/* ===== helpers for ordering ===== */
const yearVal = s => {
  const m = typeof s === 'string' ? s.trim().match(/^\d{4}$/) : null;
  return m ? parseInt(m[0], 10) : -Infinity; // non-year → lowest
};
const sortByYearDesc = (a, b) => yearVal(b.date) - yearVal(a.date);

/* =====================  component  ===================== */

export default function Certifications() {
  const sectionRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [filter, setFilter] = useState('all'); // all | completed | planned

  useEffect(() => {
    if (prefersReducedMotion) return;
    sr.reveal(sectionRef.current, srConfig());
  }, [prefersReducedMotion]);

  // Ordered list per your rules:
  // - all: planned first (original order), then completed (DESC by year)
  // - completed: DESC by year
  // - planned: original order
  let list = [];
  if (filter === 'completed') {
    list = CERTS.filter(c => c.status === 'completed').sort(sortByYearDesc);
  } else if (filter === 'planned') {
    list = CERTS.filter(c => c.status === 'planned');
  } else {
    const planned = CERTS.filter(c => c.status === 'planned');
    const completed = CERTS.filter(c => c.status === 'completed').sort(sortByYearDesc);
    list = [...planned, ...completed];
  }

  return (
    <StyledSection id="certifications" ref={sectionRef}>
      <h2 className="numbered-heading">Certifications</h2>

      <FilterBar role="tablist" aria-label="Filter certifications">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')} aria-pressed={filter === 'all'}>
          All
        </button>
        <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')} aria-pressed={filter === 'completed'}>
          Completed
        </button>
        <button className={filter === 'planned' ? 'active' : ''} onClick={() => setFilter('planned')} aria-pressed={filter === 'planned'}>
          Planned
        </button>
      </FilterBar>

      <Row>
        {list.map((c, i) => (
          <Card
            key={c.title}
            $planned={c.status === 'planned'}
            $noMotion={prefersReducedMotion}
            style={{ '--delay': `${i * 90}ms` }}
          >
            <HeadRow>
              <Badge aria-hidden="true" $chars={c.badge.length}>{c.badge}</Badge>
              <TitleWrap>
                <h3>{c.title}</h3>
                <div className="meta">
                  {c.issuer} {c.date !== '—' && `· ${c.date}`}
                </div>
              </TitleWrap>
              <Pill $kind={c.status}>{c.status === 'planned' ? 'Planned' : 'Completed'}</Pill>
            </HeadRow>

            <Body>
              {c.status === 'planned'
                ? 'Scheduled prep and practice exams underway.'
                : 'Successfully completed and applied concepts in projects.'}
            </Body>

            {c.skills?.length > 0 && (
              <Skills>
                {c.skills.map(s => <li key={s}>{s}</li>)}
              </Skills>
            )}

            <Actions>
              {c.url
                ? <a href={c.url} className="verify" target="_blank" rel="noreferrer">Verify</a>
                : <button className="disabled" aria-disabled="true">No link</button>}
            </Actions>
          </Card>
        ))}
      </Row>
    </StyledSection>
  );
}
