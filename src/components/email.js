// import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import { Side } from '@components';
// import { socialMedia, email as emailAddr } from '@config';
// import { Icon } from '@components/icons'; // we already use this in Social


// const StyledIconRail = styled.ul`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin: 0;
//   padding: 0;
//   list-style: none;

//   li { margin: 10px 0; }

//   a {
//     padding: 10px;
//     color: var(--light-slate);
//     transition: transform .15s ease, color .15s ease;
//   }
//   a:hover, a:focus { color: var(--green); transform: translateY(-3px); }

//     &::after {
//     content: '';
//     display: block;
//     width: 3px;
//     height: 160px;
//     margin: 14px auto 0;
//     background: var(--light-slate);
//     opacity: 0.55;
//     border-radius: 2px;

//     /* CUT the bottom part when footer overlaps */
//     clip-path: inset(0 0 var(--footer-overlap, 0px) 0);
//     will-change: clip-path;
//     transform: translateZ(0);
//     transition: clip-path 50ms linear;
//   }

//   /* keep icon size consistent */
//   svg { width: 20px; height: 20px; }

//   /* 🔥 hide on tablet & mobile */
//   @media (max-width: 1024px) {
//     display: none;
//   }
// `;

// // tiny inline mail icon to avoid depending on Icon's name map
// // larger, bolder mail icon so it matches GitHub / LinkedIn
// const MailIcon = () => (
//   <svg viewBox="0 0 24 24" aria-hidden="true">
//     {/* outer envelope */}
//     <rect
//       x="2.4"
//       y="4"
//       width="19.2"
//       height="16"
//       rx="3"
//       ry="3"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.9"
//     />
//     {/* flap */}
//     <path
//       d="M4 6.6 12 12.3 20 6.6"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.9"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// const Email = ({ isHome }) => {
//   // pull GitHub & LinkedIn URLs from config
//   const gh = socialMedia?.find(s => /git/i.test(s.name));
//   const li = socialMedia?.find(s => /link/i.test(s.name));

//   return (
//     <Side isHome={isHome} orientation="right">
//       <StyledIconRail>
//         {li && (
//           <li>
//             <a href={li.url} aria-label="LinkedIn" target="_blank" rel="noreferrer">
//               <Icon name="Linkedin" />
//             </a>
//           </li>
          
//         )}
//         {gh && (
//           <li>
//             <a href={gh.url} aria-label="GitHub" target="_blank" rel="noreferrer">
//               <Icon name="GitHub" />
//             </a>
//           </li>
//         )}
//         <li>
//           <a href={`mailto:${emailAddr}`} aria-label="Email">
//             <MailIcon />
//           </a>
//         </li>
//       </StyledIconRail>
//     </Side>
//   );
// };

// Email.propTypes = { isHome: PropTypes.bool };
// export default Email;



import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Side } from '@components';
import { socialMedia, email as emailAddr } from '@config';
import { Icon } from '@components/icons';

const StyledIconRail = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    margin: 10px 0;
  }

  a {
    padding: 10px;
    color: var(--light-slate);
    transition: transform 0.15s ease, color 0.15s ease;
  }

  a:hover,
  a:focus {
    color: var(--green);
    transform: translateY(-3px);
  }

  &::after {
    content: '';
    display: block;
    width: 3px;
    height: 160px;
    margin: 14px auto 0;
    background: var(--light-slate);
    opacity: 0.55;
    border-radius: 2px;
    clip-path: inset(0 0 var(--footer-overlap, 0px) 0);
    will-change: clip-path;
    transform: translateZ(0);
    transition: clip-path 50ms linear;
  }

  svg {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

const MailIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
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

const LeetCodeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
  </svg>
);

const Email = ({ isHome }) => {
  const gh = socialMedia?.find(s => /git/i.test(s.name));
  const li = socialMedia?.find(s => /link/i.test(s.name));
  const lc = socialMedia?.find(s => /leet/i.test(s.name));

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

        {lc && (
          <li>
            <a href={lc.url} aria-label="LeetCode" target="_blank" rel="noreferrer">
              <LeetCodeIcon />
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

Email.propTypes = {
  isHome: PropTypes.bool,
};

export default Email;