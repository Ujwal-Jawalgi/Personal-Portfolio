import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import ProjectCard from '../components/ProjectCard';
import '../components/Projects.css';

const ProjectsPage = () => {
  const [filter, setFilter] = useState('All');

  const { data: projects, isLoading, isError, refetch } = useQuery({
    queryKey: ['github-projects'],
    queryFn: () => fetch('https://api.github.com/users/Ujwal-Jawalgi/repos?sort=updated').then(res => res.json()).then(data => {
      // Map GitHub repos to ProjectCard format and filter out ToDo-list
      return data
        .filter(repo => repo.name !== 'ToDo-list')
        .map(repo => {
          let liveLink = repo.homepage;
          // Manual overrides for live links
          if (repo.name === 'blockchain-carbon-registry-ujwal') {
            liveLink = 'https://ujwal-bluecarbon-registry.lovable.app/';
          } else if (repo.name === 'SmartFoot') {
            liveLink = 'http://smartfoot-liard.vercel.app';
          }

          return {
            _id: repo.id,
            title: repo.name,
            description: repo.description || 'No description provided.',
            technologies: repo.language ? [repo.language] : [],
            githubLink: repo.html_url,
            liveLink,
            imageUrl: 'https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' // Placeholder for GitHub repos
          };
        });
    })
  });

  const allTechs = projects 
    ? Array.from(new Set(projects.flatMap(p => p.technologies).filter(Boolean)))
    : [];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects?.filter(p => p.technologies.includes(filter));

  return (
    <div className="container page-container">
      <h1 className="section-title">My Projects</h1>
      
      {isError ? (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p style={{ color: '#ef4444', marginBottom: '1rem' }}>Failed to load projects. Please try again.</p>
          <button onClick={() => refetch()} className="btn btn-primary">Retry</button>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem', justifyContent: 'center' }}>
            <button 
              onClick={() => setFilter('All')} 
              className={`btn ${filter === 'All' ? 'btn-primary' : 'btn-secondary'}`}
            >
              All
            </button>
            {allTechs.map(tech => (
              <button 
                key={tech} 
                onClick={() => setFilter(tech)}
                className={`btn ${filter === tech ? 'btn-primary' : 'btn-secondary'}`}
              >
                {tech}
              </button>
            ))}
          </div>

          {isLoading ? (
            <p style={{ textAlign: 'center' }}>Loading projects...</p>
          ) : projects?.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '4rem 0' }}>
              <h2>No projects found</h2>
              <p>Check back later for updates!</p>
            </div>
          ) : (
            <div className="projects-grid">
              {filteredProjects?.map(project => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProjectsPage;
