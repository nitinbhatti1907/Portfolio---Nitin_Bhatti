import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// ⟵ import the actual components that exist
import Layout from '@components/layout';
import Hero from '@components/sections/hero';
import About from '@components/sections/about';   // was Profile
import Jobs from '@components/sections/jobs';     // was Experience
import Projects from '@components/sections/projects';
import Contact from '@components/sections/contact';

// keep these only if the files exist and export default
import Certifications from '@components/sections/certifications';
import Dashboards from '@components/sections/dashboards';
import { Featured } from '../components';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <StyledMainContainer className="fillHeight">
      <Hero />
      <About />         {/* id="profile" inside about.js */}
      <Jobs />          {/* id="experience" inside jobs.js */}
      <Featured />
      <Projects />
      <Certifications />{/* if file exists; otherwise comment out */}
      <Dashboards />    {/* if file exists; otherwise comment out */}
      <Contact />
    </StyledMainContainer>
  </Layout>
);

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default IndexPage;