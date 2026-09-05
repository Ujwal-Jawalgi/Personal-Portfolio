import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section id="about" className="hero-section">
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Ujwal
          </h1>
          <h2 className="hero-subtitle" style={{ fontSize: '1.5rem', marginTop: '-0.5rem' }}>Full Stack Developer | GenAI & RAG Engineer | React & Next.js</h2>
          <p className="hero-description">
            Building scalable, AI-powered web applications and intelligent systems using modern frontend, backend, and Generative AI technologies.
          </p>
          <div className="hero-cta">
            <Link to="/projects" className="btn btn-primary">View Projects</Link>
            <Link to="/contact" className="btn btn-secondary">Contact Me</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
