import React from 'react';
import ProjectCard from './ProjectCard';
import './Projects.css';
import { useGithubProjects } from '../hooks/useGithubProjects';

const Projects = () => {
  const { data: projects, isLoading, isError } = useGithubProjects();
  
  // We only want the top 3 most recently updated for the featured section
  const featuredProjects = projects ? projects.slice(0, 3) : [];

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        
        {isError && <p style={{textAlign: 'center', color: '#ef4444'}}>Failed to load projects from GitHub</p>}
        {isLoading && <p style={{textAlign: 'center'}}>Loading projects...</p>}
        
        {!isLoading && !isError && (
          <div className="projects-grid">
            {featuredProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
