import React from 'react';
import ScrollyCanvas from '../components/ScrollyCanvas';
import About from './About';
import ProjectsPage from './ProjectsPage';
import Contact from './Contact';

const Home = () => {
  return (
    <>
      <ScrollyCanvas />
      <div id="about">
        <About />
      </div>
      <div id="projects">
        <ProjectsPage />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </>
  );
};

export default Home;
