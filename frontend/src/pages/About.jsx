import React from 'react';
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt, FaAward, FaBuilding, FaUserTie, FaDownload } from 'react-icons/fa';
import './About.css';

const skills = [
  { _id: '1', name: 'Java (Core Java)', category: 'Languages' },
  { _id: '2', name: 'Python', category: 'Languages' },
  { _id: '3', name: 'JavaScript', category: 'Languages' },
  { _id: '4', name: 'TypeScript', category: 'Languages' },
  { _id: '5', name: 'RAG', category: 'AI / GenAI' },
  { _id: '6', name: 'AI Agents & Multi-Agent', category: 'AI / GenAI' },
  { _id: '7', name: 'Prompt Engineering', category: 'AI / GenAI' },
  { _id: '8', name: 'React.js', category: 'Frontend' },
  { _id: '9', name: 'Next.js', category: 'Frontend' },
  { _id: '10', name: 'Node.js', category: 'Backend' },
  { _id: '10.5', name: 'Express.js', category: 'Backend' },
  { _id: '11', name: 'FastAPI', category: 'Backend' },
  { _id: '12', name: 'MongoDB', category: 'Databases / BaaS' }
];

const experience = [
  {
    _id: '1',
    title: 'Full Stack developer in IT Dept',
    company: 'Railwheel Factory',
    date: 'Jul 2026 - Present',
    description: 'Working as a Full Stack developer in the IT Department, optimizing and maintaining enterprise software solutions.'
  },
  {
    _id: '2',
    title: 'Full Stack Development Intern',
    company: 'Thiranex',
    date: 'Aug 2026 - Sep 2026',
    description: 'Developed practical full-stack applications under industry mentorship, mastering the MERN stack in a fast-paced environment.'
  },
  {
    _id: '3',
    title: 'GenAI Specialist',
    company: 'Augsta Infosystem Pvt. Ltd.',
    date: 'Jun 2025 - Nov 2025',
    description: 'Built enterprise-grade GenAI solutions including multi-agent architectures, scalable LLM pipelines, and contextual RAG-based chatbots.'
  }
];

const leadership = [
  {
    _id: '1',
    organization: 'IEEE EMBS BMSIT',
    roles: [
      { title: 'Chairperson', date: 'May 2026 - Present', description: 'Driving strategic initiatives, technical events, and interdisciplinary engineering collaborations.' },
      { title: 'Vice Chair', date: 'Jan 2026 - May 2026', description: 'Managed chapter operations and led biomedical-engineering interface programs.' },
      { title: 'Events Dynamo', date: 'Jan 2025 - Jan 2026', description: 'Coordinated execution of events bridging engineering and medicine.' }
    ]
  },
  {
    _id: '2',
    organization: 'Entrepreneurship Cell, BMSIT&M',
    roles: [
      { title: 'Vice Head - Media & Marketing', date: 'May 2026 - Present', description: 'Leading branding, marketing, and media initiatives across digital platforms.' },
      { title: 'Associate - Media & Marketing', date: 'May 2025 - May 2026', description: 'Contributed to dynamic marketing campaigns for entrepreneurship development.' }
    ]
  },
  {
    _id: '3',
    organization: 'NSS Unit BMSIT&M',
    roles: [
      { title: 'Vice President', date: 'Mar 2025 - Present', description: 'Spearheaded social-impact initiatives, community outreach, and critical resource management.' }
    ]
  },
  {
    _id: '4',
    organization: 'Coding Club BMSIT',
    roles: [
      { title: 'Vice Head - Marketing', date: 'Apr 2025 - Mar 2026', description: 'Formulated marketing strategies to nurture a vibrant programming culture on campus.' }
    ]
  },
  {
    _id: '5',
    organization: 'ALTERINO BMSIT',
    roles: [
      { title: 'WebDev Team', date: 'Feb 2025 - Jan 2026', description: 'Designed and developed front-end systems during collaborative coding sprints.' }
    ]
  },
  {
    _id: '6',
    organization: 'IEEE Signal Processing Society',
    roles: [
      { title: 'Events & Operations', date: 'Jan 2025 - Jan 2026', description: 'Organized and managed technical workshops, expert seminars, and academic conferences.' }
    ]
  },
  {
    _id: '7',
    organization: 'Pulse - Sports Club',
    roles: [
      { title: 'Operations Team', date: 'May 2025 - Nov 2025', description: 'Managed event logistics, schedules, and seamless tournament execution across campus.' }
    ]
  }
];

const certificates = [
  {
    _id: '1',
    name: 'Java Fundamentals',
    issuer: 'Coddy',
    date: 'Aug 2026',
    url: 'https://coddy.tech/certifications/nRHzji-java-jx1zAL'
  },
  {
    _id: '2',
    name: 'Exploring SAP Business Technology Platform',
    issuer: 'SAP',
    date: 'Feb 2026',
    url: 'https://badger.learning.sap.com/verify/xotyp-lavuv-vohur-ripar-dygir'
  },
  {
    _id: '3',
    name: 'SAP Engagement Cloud - Emarsys',
    issuer: 'SAP',
    date: 'Feb 2026',
    url: 'https://badger.learning.sap.com/verify/xorev-racom-tagov-lugan-bepic'
  }
];

const achievements = [
  { _id: '1', title: '3rd Place + ₹10,000 prize', event: 'Sustainathon 2025 (Vidyavardhaka College)', description: 'For "SmartFoot", an energy-harvesting system.' },
  { _id: '2', title: 'Round 2 Finalist', event: 'Smart India Hackathon 2025', description: 'For "Blue Carbon Ledger", a blockchain-based carbon credit MRV registry.' },
  { _id: '3', title: '3rd Place + Internship Offer', event: 'HACKSPHERE', description: 'For "Agrobytes", an IoT-based soil monitoring system.' },
  { _id: '4', title: 'Voice-Enabled RAG Developer', event: 'HH Goa 2026', description: 'Built a multilingual RAG system (15 Indic languages, 700K chunks).' }
];

const About = ({ isHome = false }) => {
  const displayLeadership = isHome ? leadership.slice(0, 3) : leadership;
  const displayAchievements = isHome ? achievements.slice(0, 3) : achievements;

  return (
    <div className="container page-container">
      <h1 className="section-title">About Me</h1>
      
      <section className="about-section bio-section">
        <p className="bio-text">
          I'm a Computer Science student at BMS Institute of Technology and Management (BMSIT&M), Bengaluru, working at the intersection of GenAI and full-stack development. I completed a 6-month GenAI internship at Augsta Infosystem, building LLM pipelines, AI agents, and RAG-based chatbots, and I'm currently a Full Stack Development intern at Thiranex. Outside of internships, I build and ship projects fast &mdash; usually as hackathons: a voice-enabled multilingual RAG system, a blockchain-based carbon credit registry, and an IoT soil-monitoring platform, among others.
        </p>
        <div style={{ marginTop: '1.5rem' }}>
          <a href="/Ujwal_Resume.pdf" download="Ujwal_Resume.pdf" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaDownload /> Download Resume
          </a>
        </div>
      </section>

      <section id="experience" className="about-section mt-4">
        <h2>Experience</h2>
        <div className="about-grid experience-grid">
          {experience.map(exp => (
            <div key={exp._id} className="about-card experience-card">
              <div className="card-header">
                <FaBuilding className="card-icon" />
                <div className="card-title-group">
                  <h3>{exp.title}</h3>
                  <span className="card-subtitle">{exp.company}</span>
                </div>
              </div>
              <span className="card-date">{exp.date}</span>
              <p className="card-desc">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="leadership" className="about-section mt-4">
        <h2>Leadership & Organizations</h2>
        <div className="about-grid leadership-grid">
          {displayLeadership.map(org => (
            <div key={org._id} className="about-card leadership-card">
              <div className="card-header">
                <FaUserTie className="card-icon" />
                <h3>{org.organization}</h3>
              </div>
              <div className="roles-list">
                {org.roles.map((role, idx) => (
                  <div key={idx} className="role-item">
                    <div className="role-header">
                      <span className="role-title">{role.title}</span>
                      <span className="role-date">{role.date}</span>
                    </div>
                    <p className="role-desc">{role.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {isHome && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
            <Link to="/about#leadership" className="btn btn-outline" style={{ padding: '0.8rem 2rem', fontSize: '1.1rem' }}>
              See All Leadership
            </Link>
          </div>
        )}
      </section>

      <section className="about-section mt-4">
        <h2>Education</h2>
        <div className="about-grid education-grid">
          <div className="about-card education-card">
            <h3>BMS Institute of Technology and Management (BMSIT&M)</h3>
            <span className="card-subtitle">B.E. in Computer Science</span>
            <span className="card-date">2024 &ndash; 2028</span>
            <p className="card-desc">Bengaluru, Karnataka</p>
          </div>
        </div>
      </section>

      <section className="about-section mt-4">
        <h2>Skills</h2>
        <div className="skills-grid">
          {skills.map(skill => (
            <div key={skill._id} className="skill-item">
              <span className="skill-name">{skill.name}</span>
              <span className="skill-category">{skill.category}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="achievements" className="about-section mt-4">
        <h2>Achievements</h2>
        <div className="about-grid achievements-grid">
          {displayAchievements.map(ach => (
            <div key={ach._id} className="about-card achievement-card">
              <div className="card-header">
                <FaAward className="card-icon award-icon" />
                <h3>{ach.title}</h3>
              </div>
              <span className="card-subtitle">{ach.event}</span>
              <p className="card-desc">{ach.description}</p>
            </div>
          ))}
        </div>
        {isHome && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
            <Link to="/about#achievements" className="btn btn-outline" style={{ padding: '0.8rem 2rem', fontSize: '1.1rem' }}>
              See All Achievements
            </Link>
          </div>
        )}
      </section>

      <section className="about-section mt-4">
        <h2>Certifications</h2>
        <div className="about-grid certifications-grid">
          {certificates.map(cert => (
            <a key={cert._id} href={cert.url} target="_blank" rel="noopener noreferrer" className="about-card certificate-card clickable">
              <div className="card-header">
                <h3>{cert.name}</h3>
                <FaExternalLinkAlt className="external-icon" />
              </div>
              <span className="card-subtitle">{cert.issuer}</span>
              <span className="card-date">{cert.date}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
