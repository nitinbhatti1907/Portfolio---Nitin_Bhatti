import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { Head, Loader, Nav, Email, Footer } from '@components';
import { GlobalStyle, theme } from '@styles';

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Layout = ({ children, location }) => {
  const isHome = location.pathname === '/';
  const [isLoading, setIsLoading] = useState(isHome);
  const hasMounted = useRef(false);

  // Sets target="_blank" rel="noopener noreferrer" on external links
  const handleExternalLinks = () => {
    const allLinks = Array.from(document.querySelectorAll('a'));
    if (allLinks.length > 0) {
      allLinks.forEach(link => {
        if (link.host !== window.location.host) {
          link.setAttribute('rel', 'noopener noreferrer');
          link.setAttribute('target', '_blank');
        }
      });
    }
  };

  useEffect(() => {
  if (isLoading) return;

  const scrollToHash = () => {
    const id =
      (location && location.hash ? location.hash : window.location.hash).slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'auto', block: 'start' });
      el.focus?.();
    }
  };

  // ⬇️ scroll to the hash on first render of the home route and when the hash changes
  if (isHome) {
    // wait one tick so the section nodes are mounted
    setTimeout(scrollToHash, 0);
    window.addEventListener('hashchange', scrollToHash);
  }

  handleExternalLinks();

  return () => {
    if (isHome) window.removeEventListener('hashchange', scrollToHash);
  };
}, [isLoading, isHome, location?.hash]);

  return (
    <>
      <Head />

      <div id="root">
        <ThemeProvider theme={theme}>
          <GlobalStyle />

          {/* <a className="skip-to-content" href="#content">
            Skip to Content
          </a> */}

          {isLoading && isHome ? (
            <Loader finishLoading={() => setIsLoading(false)} />
          ) : (
            <StyledContent>
              {!isHome && <Nav isHome={false} />}
              <Email isHome={isHome} />

              <div id="content">
                {children}
                <Footer />
              </div>
            </StyledContent>
          )}
        </ThemeProvider>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
};

export default Layout;
