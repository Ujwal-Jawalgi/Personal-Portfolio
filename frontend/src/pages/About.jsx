import React from 'react';
import './About.css';

const skills = [
  { _id: '1', name: 'Java (Core Java)', category: 'Languages' },
  { _id: '2', name: 'Python', category: 'Languages' },
  { _id: '3', name: 'JavaScript', category: 'Languages' },
  { _id: '4', name: 'TypeScript', category: 'Languages' },
  { _id: '5', name: 'RAG', category: 'AI / GenAI' },
  { _id: '6', name: 'AI Agents & Multi-Agent', category: 'AI / GenAI' },
  { _id: '7', name: 'Prompt Engineering', category: 'AI / GenAI' },
  { _id: '8', name: 'React', category: 'Frontend' },
  { _id: '9', name: 'Next.js', category: 'Frontend' },
  { _id: '10', name: 'Node.js', category: 'Backend' },
  { _id: '11', name: 'FastAPI', category: 'Backend' },
  { _id: '12', name: 'MongoDB', category: 'Databases / BaaS' }
];

const experience = [
  {
    _id: '1',
    title: 'Full Stack developer in IT Dept',
    company: 'Railwheel Factory',
    startDate: '2026-07-16',
    current: true,
    description: 'Working as a Full Stack developer in the IT Department.'
  },
  {
    _id: '2',
    title: 'Full Stack Development Intern',
    company: 'Thiranex',
    startDate: '2026-08-30',
    endDate: '2026-09-29',
    current: false,
    description: 'Working on practical full-stack projects under industry mentorship as part of a structured internship program.'
  },
  {
    _id: '3',
    title: 'GenAI Specialist',
    company: 'Augsta Infosystem Pvt. Ltd.',
    startDate: '2025-06-19',
    endDate: '2025-11-01',
    current: false,
    description: 'Built enterprise-grade GenAI solutions—designed AI agents for research, data extraction, and workflow automation; implemented RAG-based chatbots; orchestrated multi-agent LLM workflows.'
  }
];

const About = () => {

  return (
    <div className="container page-container">
      <h1 className="section-title">About Me</h1>
      
      <section className="about-section bio-section">
        <p className="bio-text">
          I'm a Computer Science student at BMS Institute of Technology and Management (BMSIT&M), Bengaluru, working at the intersection of GenAI and full-stack development. I completed a 6-month GenAI internship at Augsta Infosystem, building LLM pipelines, AI agents, and RAG-based chatbots, and I'm currently a Full Stack Development intern at Thiranex. Outside of internships, I build and ship projects fast &mdash; usually as hackathons: a voice-enabled multilingual RAG system, a blockchain-based carbon credit registry, and an IoT soil-monitoring platform, among others. I also serve as Chair of IEEE EMBS BMSIT&M, where I help run technical ideathons and events for 100+ participants.
        </p>
      </section>

      <section className="about-section mt-4">
        <h2>Education</h2>
        <div className="timeline">
          <div className="timeline-item">
            <h3>B.E. in Computer Science</h3>
            <p className="date">2024 &ndash; 2028</p>
            <p>BMS Institute of Technology and Management (BMSIT&M), Bengaluru</p>
          </div>
        </div>
      </section>

      <section className="about-section mt-4">
        <h2>Experience</h2>
        <div className="timeline">
          {experience.map(exp => (
            <div key={exp._id} className="timeline-item">
              <h3>{exp.title} at {exp.company}</h3>
              <p className="date">{new Date(exp.startDate).getFullYear()} - {exp.current ? 'Present' : new Date(exp.endDate).getFullYear()}</p>
              <p>{exp.description}</p>
            </div>
          ))}
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
      
      <section className="about-section mt-4">
        <h2>Leadership & Extracurriculars</h2>
        <div className="timeline">
          <div className="timeline-item">
            <h3>Chairperson, IEEE EMBS BMSIT&M</h3>
            <p className="date">May 2026 &ndash; Present</p>
            <p>Lead a 100+ member technical chapter; organized CORTEX 2026 MedTech Ideathon (120 participants, 25 teams). Previously Vice Chair (Jan-May 2026).</p>
          </div>
          <div className="timeline-item">
            <h3>Vice Head &ndash; Media & Marketing, E-Cell BMSIT&M</h3>
            <p className="date">May 2026 &ndash; Present</p>
            <p>Managing media presence and marketing strategies for entrepreneurship events.</p>
          </div>
          <div className="timeline-item">
            <h3>Vice President, NSS Unit BMSIT&M</h3>
            <p className="date">Mar 2025 &ndash; Present</p>
            <p>Led community-impact initiatives including blood donation camps, tree plantation, and awareness drives.</p>
          </div>
          <div className="timeline-item">
            <h3>Vice Head &ndash; Marketing, Coding Club BMSIT</h3>
            <p className="date">Apr 2025 &ndash; Mar 2026</p>
            <p>Spearheaded marketing efforts for competitive programming contests and coding workshops.</p>
          </div>
        </div>
      </section>

      <section className="about-section mt-4">
        <h2>Achievements</h2>
        <ul className="achievements-list">
          <li>🥉 <strong>3rd Place + ₹10,000 prize</strong> \u2014 Sustainathon 2025 (Vidyavardhaka College of Engineering) for "SmartFoot", an energy-harvesting system.</li>
          <li>🚀 <strong>Round 2</strong> \u2014 Smart India Hackathon 2025 for "Blue Carbon Ledger", a blockchain-based carbon credit MRV registry.</li>
          <li>🥉 <strong>3rd Place + Internship Offer</strong> \u2014 HACKSPHERE for "Agrobytes", an IoT-based soil monitoring system.</li>
          <li>🗣️ <strong>Built Voice-Enabled RAG</strong> \u2014 Developed a multilingual RAG system (15 Indic languages, 700K chunks) for HH Goa 2026.</li>
        </ul>
      </section>

      <section className="about-section mt-4">
        <h2>Certifications</h2>
        <ul className="certifications-list">
          <li><strong>Java Fundamentals</strong> \u2014 Coddy (Aug 2026)</li>
          <li><strong>Exploring SAP Business Technology Platform</strong> \u2014 SAP (Feb 2026)</li>
          <li><strong>SAP Emarsys</strong> \u2014 SAP (Feb 2026)</li>
        </ul>
      </section>

    </div>
  );
};

export default About;
