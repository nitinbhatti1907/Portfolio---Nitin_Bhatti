import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { email, srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import { Icon } from '@components/icons';

const Section = styled.section`
  padding: clamp(56px, 7vw, 96px) 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 420px);
  grid-column-gap: clamp(40px, 6vw, 96px);
  align-items: start;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    row-gap: 36px;
  }
`;

const Overline = styled.h2`
  margin: 0 0 clamp(12px, 1.8vw, 16px);
  color: var(--green);
  font-family: var(--font-mono);
  font-size: clamp(12px, 1.3vw, 16px);
  font-weight: 400;
`;

const Headline = styled.div`
  --fz: clamp(
    calc(42px * var(--ui-scale)),
    calc(5.8vw * var(--ui-scale)),
    calc(102px * var(--ui-scale))
  );
  --lh: 0.95;
  --word-gap: 0.22em;
  --line-gap: 0.14em;
  --hover-color: var(--green);

  font-family: var(--font-serif, ui-serif);
  font-size: var(--fz);
  line-height: var(--lh);
  font-weight: 800;
  color: var(--lightest-slate);
  letter-spacing: -0.01em;
  margin-top: 6px;

  .line {
    display: flex;
    flex-wrap: nowrap;
    gap: var(--word-gap);
  }
  .line + .line { margin-top: var(--line-gap); }

  .word {
    display: inline-flex;
    white-space: nowrap;
    transition: color .25s ease;
    cursor: default;
  }
  .char {
    display: inline-block;
    color: inherit;
    will-change: transform;
    transition: transform .25s ease, color .25s ease;
  }

  .word:hover .char               { transform: translateY(-4px); }
  .word:hover .char:nth-child(2n) { transform: translateY(-8px); }
  .word:hover .char:nth-child(3n) { transform: translateY(-6px); }
  .word:hover,
  .word:focus-visible { color: var(--hover-color); }

  @media (max-width: 680px) {
    .line { flex-wrap: wrap; }
  }
`;

const Subline = styled.p`
  margin: clamp(28px, 3.2vw, 44px) 0 0;
  && { margin-top: clamp(28px, 3.2vw, 20px); }
  max-width: 58ch;
  color: var(--slate);
  font-size: clamp(16px, 1.6vw, 18px);
`;

const Right = styled.aside`
  padding-top: clamp(6px, 1.2vw, 8px);
  && { padding-top: clamp(6px, 1.2vw, 50px); }
  display: grid;
  row-gap: 18px;
  align-content: start;

  .label {
    color: var(--slate);
    font-family: var(--font-mono);
    font-size: clamp(11px, 1.2vw, 14px);
    letter-spacing: .08em;
    text-transform: uppercase;
  }

  /* Email block with animated characters & colour on hover */
  .email {
    display: inline-block;
    margin-top: 6px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--lightest-navy);
    font-size: clamp(18px, 2vw, 22px);
    color: var(--lightest-slate);
    text-decoration: none;
    transition: border-color .25s ease;
  }
  .email-word {
    display: inline-flex;
    white-space: nowrap;
    transition: color .25s ease;
    color: inherit; /* inherits from .email */
  }
  .email-char {
    display: inline-block;
    color: inherit;
    will-change: transform;
    transition: transform .25s ease, color .25s ease;
  }
  .email:hover { border-color: var(--green); }
  .email:hover .email-word { color: var(--green); }
  .email:hover .email-char               { transform: translateY(-3px); }
  .email:focus-visible { outline: none; border-color: var(--green); }

  .social {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 4px;
  }
  .icon-link {
    display: inline-flex;
    width: 40px; height: 40px;
    border-radius: 10px;
    border: 1px solid var(--lightest-navy);
    align-items: center; justify-content: center;
    color: var(--lightest-slate);
    transition: var(--transition);
  }
  .icon-link:hover {
    border-color: var(--green);
    color: var(--green);
  }

  .cta {
    margin-top: 10px;
    display: inline-flex;
    align-items: center; justify-content: center;
    padding: 12px 18px;
    border-radius: 10px;
    border: 1px solid var(--lightest-navy);
    color: var(--green);
    font-family: var(--font-mono);
    text-decoration: none;
    transition: var(--transition);
  }
  .cta:hover { border-color: var(--green); box-shadow: 0 0 0 2px transparent; }
`;

function lineToWords(words) {
  return words.map((w, wi) => (
    <span className="word" key={`${w}-${wi}`} aria-label={w}>
      {[...w].map((ch, ci) => (
        <span className="char" key={`${w}-${ci}`}>{ch}</span>
      ))}
    </span>
  ));
}

const Contact = () => {
  const containerRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    sr.reveal(containerRef.current, srConfig());
  }, [prefersReducedMotion]);

  return (
    <Section id="contact" ref={containerRef} aria-labelledby="contact-overline">
      <Grid>
        <div>
          <Overline id="contact-overline">06. What’s Next?</Overline>

          <Headline aria-label="Need clean insights from your data?">
            <span className="line">{lineToWords(['Need', 'clean'])}</span>
            <span className="line">{lineToWords(['insights', 'from'])}</span>
            <span className="line">{lineToWords(['your', 'data?'])}</span>
          </Headline>

          <Subline>
            Or just say hello — I’d love to hear from you.
          </Subline>
        </div>

        <Right>
          <div>
            <div className="label">Email</div>
            <a className="email" href={`mailto:${email}`} aria-label={email}>
              <span className="email-word">
                {[...email].map((ch, i) => (
                  <span className="email-char" key={i}>{ch}</span>
                ))}
              </span>
            </a>
          </div>

          <div>
            <div className="label">Social</div>
            <div className="social">
              <a
                className="icon-link"
                href="https://www.linkedin.com/in/bhattinitin/"
                aria-label="LinkedIn"
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="Linkedin" />
              </a>
              <a
                className="icon-link"
                href="https://github.com/nitinbhatti1907"
                aria-label="GitHub"
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="GitHub" />
              </a>
            </div>
          </div>

          <a className="cta" href={`mailto:${email}`} aria-label="Say Hello">
            Say Hello
          </a>
        </Right>
      </Grid>
    </Section>
  );
};

export default Contact;
