// src/styles/variables.js
import { css } from 'styled-components';

const variables = css`
  :root {
    /* ⭐ Global UI scale (tune this: 0.80 = same as your old 80% zoom look) */
    --ui-scale: 0.76;

    --dark-navy: #020c1b;
    --navy: #0a192f;
    --light-navy: #112240;
    --lightest-navy: #233554;
    --navy-shadow: rgba(2, 12, 27, 0.7);
    --dark-slate: #495670;
    --slate: #8892b0;
    --light-slate: #a8b2d1;
    --lightest-slate: #ccd6f6;
    --white: #e6f1ff;
    --green: #64ffda;
    --green-tint: rgba(100, 255, 218, 0.1);
    --pink: #f57dff;
    --blue: #57cbff;

    --font-sans: 'Calibre', 'Inter', 'San Francisco', 'SF Pro Text', -apple-system, system-ui,
      sans-serif;
    --font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;

    --fz-xxs: calc(12px * var(--ui-scale));
    --fz-xs: calc(13px * var(--ui-scale));
    --fz-sm: calc(14px * var(--ui-scale));
    --fz-md: calc(16px * var(--ui-scale));
    --fz-lg: calc(18px * var(--ui-scale));
    --fz-xl: calc(20px * var(--ui-scale));   /* body uses this */
    --fz-xxl: calc(22px * var(--ui-scale));
    --fz-heading: calc(32px * var(--ui-scale));

    --border-radius: calc(4px * var(--ui-scale));
    --nav-height: calc(100px * var(--ui-scale));
    --nav-scroll-height: calc(70px * var(--ui-scale));
    --tab-height: calc(42px * var(--ui-scale));
    --tab-width: calc(120px * var(--ui-scale));

    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition: all 0.25s var(--easing);

    /* Optional: if you want global section spacing scaled too */
    --section-padding-y: calc(100px * var(--ui-scale));
    --section-padding-y-md: calc(80px * var(--ui-scale));
    --section-padding-y-sm: calc(60px * var(--ui-scale));
  }

    @media (max-width: 768px) {
    :root {
      --ui-scale: 0.90;
    }
  }
`;

export default variables;
