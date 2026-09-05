import React from 'react';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
  const overrides = {
    'Personal-Portfolio': '/portfolio.png',
    'SmartFoot': '/smartfoot.png',
    'Pikachu-HHGoa': '/idcard.png',
    'Voice-Enabled-RAG': '/voiceRAG.png',
    'Face_Identification': '/faceid.png',
    'Mineral-Chatbot': '/mineralchat.png',
    'blockchain-carbon-registry-ujwal': '/bluecarbon.png',
    'AI-Interview-Prep': '/prepmind.png',
  };

  const finalImageUrl = overrides[project.title] || project.imageUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97';

  return (
    <div className="project-card">
      <div className="project-image">
        <img src={finalImageUrl} alt={project.title} />
      </div>
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <div className="project-tech">
          {project.technologies.map((tech, index) => (
            <span key={index} className="tech-tag">{tech}</span>
          ))}
        </div>
        <div className="project-links">
          {project.githubLink && (
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-link">
              <FaGithub size={20} /> Code
            </a>
          )}
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="project-link">
              <FaExternalLinkAlt size={18} /> Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
