import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Side } from '@components';
import { socialMedia, email as emailAddr } from '@config';
import { Icon } from '@components/icons'; // we already use this in Social

const StyledIconRail = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;

  li { margin: 10px 0; }

  a {
    padding: 10px;
    color: var(--light-slate);
    transition: transform .15s ease, color .15s ease;
  }
  a:hover, a:focus { color: var(--green); transform: translateY(-3px); }

  &::after {
    content: '';
    display: block;
    width: 1px;
    height: 90px;
    margin: 10px auto 0;
    background: var(--light-slate);
    opacity: .3;
    content: '';
    display: block;
    width: 3px;
    height: 160px;
    margin: 14px auto 0;
    background: var(--light-slate);
    opacity: .55;
    border-radius: 2px;
  }

  /* keep icon size consistent */
  svg { width: 20px; height: 20px; }

  /* 🔥 hide on tablet & mobile */
  @media (max-width: 1024px) {
    display: none;
  }
`;

// tiny inline mail icon to avoid depending on Icon's name map
// larger, bolder mail icon so it matches GitHub / LinkedIn
const MailIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    {/* outer envelope */}
    <rect
      x="2.4"
      y="4"
      width="19.2"
      height="16"
      rx="3"
      ry="3"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
    />
    {/* flap */}
    <path
      d="M4 6.6 12 12.3 20 6.6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Email = ({ isHome }) => {
  // pull GitHub & LinkedIn URLs from config
  const gh = socialMedia?.find(s => /git/i.test(s.name));
  const li = socialMedia?.find(s => /link/i.test(s.name));

  return (
    <Side isHome={isHome} orientation="right">
      <StyledIconRail>
        {li && (
          <li>
            <a href={li.url} aria-label="LinkedIn" target="_blank" rel="noreferrer">
              <Icon name="Linkedin" />
            </a>
          </li>
        )}
        {gh && (
          <li>
            <a href={gh.url} aria-label="GitHub" target="_blank" rel="noreferrer">
              <Icon name="GitHub" />
            </a>
          </li>
        )}
        <li>
          <a href={`mailto:${emailAddr}`} aria-label="Email">
            <MailIcon />
          </a>
        </li>
      </StyledIconRail>
    </Side>
  );
};

Email.propTypes = { isHome: PropTypes.bool };
export default Email;
