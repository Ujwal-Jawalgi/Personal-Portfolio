import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectDetail = () => {
  const { id } = useParams();
  
  const { data: project, isLoading, error } = useQuery({
    queryKey: ['project', id],
    queryFn: () => api.get(`/projects/${id}`).then(res => res.data)
  });

  if (isLoading) return <div className="page-container container"><p>Loading...</p></div>;
  if (error) return <div className="page-container container"><p>Project not found.</p></div>;

  return (
    <div className="container page-container">
      <Link to="/projects" className="btn btn-secondary" style={{ marginBottom: '2rem' }}>&larr; Back to Projects</Link>
      <h1 className="section-title" style={{ textAlign: 'left' }}>{project.title}</h1>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginTop: '2rem' }}>
        <div style={{ flex: '1 1 400px' }}>
          <img src={project.imageUrl} alt={project.title} style={{ width: '100%', borderRadius: '1rem', border: '1px solid var(--border)' }} />
        </div>
        <div style={{ flex: '1 1 400px' }}>
          <h3>Description</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '2rem' }}>{project.description}</p>
          
          <h3>Technologies</h3>
          <div className="project-tech" style={{ marginBottom: '2rem' }}>
            {project.technologies.map((tech, i) => (
              <span key={i} className="tech-tag">{tech}</span>
            ))}
          </div>

          <h3>Links</h3>
          <div className="project-links">
            {project.githubLink && (
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <FaGithub /> Source Code
              </a>
            )}
            {project.liveLink && (
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <FaExternalLinkAlt /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
