import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectCard from './ProjectCard';
import './Projects.css';

const Projects = () => {
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/projects');
        setProjectList(data);
      } catch (error) {
        console.error('Error fetching projects', error);
        // Fallback to some dummy data for showcase purposes
        setProjectList([
          {
            _id: '1',
            title: 'E-commerce Platform',
            description: 'A full-stack e-commerce platform built with MERN stack featuring user authentication, payment integration, and admin dashboard.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
            githubLink: '#',
            liveLink: '#',
            imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
          },
          {
            _id: '2',
            title: 'AI Chat Application',
            description: 'Real-time chat application powered by AI for smart replies and sentiment analysis. Features WebSocket integration.',
            technologies: ['React', 'Socket.io', 'OpenAI API', 'Tailwind CSS'],
            githubLink: '#',
            liveLink: '#',
            imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
          }
        ]);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid">
          {projectList.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
