import React from 'react';
import ScrollyCanvas from '../components/ScrollyCanvas';
import About from './About';
import Projects from '../components/Projects';
import Contact from './Contact';

const Home = () => {
  return (
    <>
      <ScrollyCanvas />
      <div id="about">
        <About />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </>
  );
};

export default Home;
