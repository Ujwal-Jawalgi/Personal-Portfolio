require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project');
const Skill = require('./models/Skill');
const Experience = require('./models/Experience');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio');
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

const projects = [
  {
    title: 'Pikachu \u2014 Voice-Enabled Multilingual RAG System',
    description: 'A voice-enabled, multilingual Retrieval-Augmented Generation system built for HH Goa 2026. Ask a question by voice or text in any of 15 Indic languages; it transcribes speech, retrieves from a unified 700,000-chunk FAISS vector index, and generates a grounded, guardrailed answer with full latency transparency.',
    technologies: ['Next.js', 'FastAPI', 'Sarvam AI', 'Groq API', 'FAISS', 'Tailwind CSS'],
    githubLink: 'https://github.com/Ujwal-Jawalgi/Voice-Enabled-RAG',
    liveLink: 'https://voice-enabled-rag.vercel.app/',
    imageUrl: '/voiceRAG.png' // Local image
  },
  {
    title: 'AI Interview Preparation Platform',
    description: 'An AI-powered mock interview and resume-analysis platform. Includes an ATS resume analyzer, voice-based mock interviews, a built-in multi-language code editor, and AI evaluation of answers (communication, confidence, technical accuracy).',
    technologies: ['Next.js', 'React', 'Supabase', 'Clerk', 'Groq API', 'Web Speech API'],
    githubLink: 'https://github.com/Ujwal-Jawalgi/AI-Interview-Prep',
    liveLink: 'https://ai-interview-arun-khajapure.vercel.app/',
    imageUrl: '/prepmind.png'
  },
  {
    title: 'Mineral Chatbot',
    description: 'A specialized geology question-answering chatbot powered by the OpenAI API. Provides accurate, domain-specific answers about minerals and geological data.',
    technologies: ['Next.js', 'React', 'Supabase', 'OpenAI API'],
    githubLink: 'https://github.com/Ujwal-Jawalgi/Mineral-Chatbot',
    liveLink: 'https://mineral-chatbot.vercel.app',
    imageUrl: '/mineralchat.png'
  },
  {
    title: 'Pikachu HH Goa \u2014 ID Card Generator',
    description: 'A Goa beach-themed ID card generator built for the HH Goa hackathon. Users upload a photo and receive a unique HHG-XXXXX ID card with a QR code.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    githubLink: 'https://github.com/Ujwal-Jawalgi/Pikachu-HHGoa',
    liveLink: 'https://pikachu-hh-goa.vercel.app',
    imageUrl: '/idcard.png'
  },
  {
    title: 'Blue Carbon Ledger \u2014 Blockchain Registry',
    description: 'A decentralized MRV (Monitoring, Reporting, Verification) platform for blue carbon restoration projects built for Smart India Hackathon 2025. Contributed to the blockchain layer/smart contracts.',
    technologies: ['React', 'TypeScript', 'Solidity', 'Polygon', 'Hardhat', 'IPFS'],
    githubLink: 'https://github.com/Ujwal-Jawalgi/blockchain-carbon-registry-ujwal',
    liveLink: 'https://ujwal-bluecarbon-registry.lovable.app/',
    imageUrl: '/bluecarbon.png'
  },
  {
    title: 'SmartFoot \u2014 Energy Harvesting Platform',
    description: 'A prototype that converts footsteps into usable electrical energy via piezoelectric tiles. Built the frontend and backend integration with the ESP32 microcontroller.',
    technologies: ['React', 'Supabase', 'ESP32', 'Vite', 'Framer Motion'],
    githubLink: 'https://github.com/Ujwal-Jawalgi/SmartFoot',
    liveLink: 'https://smartfoot-liard.vercel.app',
    imageUrl: '/smartfoot.png'
  },
  {
    title: 'Personal Portfolio Website',
    description: 'My personal portfolio website showcasing my projects, skills, and experience. Built with a MERN stack featuring a dynamic React frontend and automated GitHub synchronization.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
    githubLink: 'https://github.com/Ujwal-Jawalgi/Personal-Portfolio',
    liveLink: 'https://personal-portfolio-allo.onrender.com',
    imageUrl: '/portfolio.png'
  },
  {
    title: 'Face Identification System',
    description: 'A facial recognition system built using machine learning and computer vision to accurately identify and verify individuals in real-time video streams.',
    technologies: ['Python', 'OpenCV', 'Machine Learning'],
    githubLink: 'https://github.com/Ujwal-Jawalgi',
    liveLink: '',
    imageUrl: '/faceid.png'
  }
];

const skills = [
  { name: 'Java (Core Java)', category: 'Languages' },
  { name: 'Python', category: 'Languages' },
  { name: 'JavaScript', category: 'Languages' },
  { name: 'TypeScript', category: 'Languages' },
  { name: 'RAG', category: 'AI / GenAI' },
  { name: 'AI Agents & Multi-Agent (Supertool)', category: 'AI / GenAI' },
  { name: 'Prompt Engineering', category: 'AI / GenAI' },
  { name: 'Groq / Llama / OpenAI', category: 'AI / GenAI' },
  { name: 'FAISS & Sentence-Transformers', category: 'AI / GenAI' },
  { name: 'Sarvam AI (Speech-to-Text)', category: 'AI / GenAI' },
  { name: 'React', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'Framer Motion', category: 'Frontend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'FastAPI', category: 'Backend' },
  { name: 'MongoDB', category: 'Databases / BaaS' },
  { name: 'Supabase (PostgreSQL)', category: 'Databases / BaaS' },
  { name: 'Solidity & Hardhat', category: 'Blockchain / Web3' },
  { name: 'Polygon & Ethers.js', category: 'Blockchain / Web3' }
];

const experiences = [
  {
    title: 'Full Stack Development Intern',
    company: 'Thiranex',
    location: 'Remote',
    startDate: new Date('2026-08-30'),
    endDate: new Date('2026-09-29'),
    current: true,
    description: 'Working on practical full-stack projects under industry mentorship as part of a structured internship program.'
  },
  {
    title: 'GenAI Intern',
    company: 'Augsta (SAP | Migration | BTP | Integration)',
    location: 'Remote',
    startDate: new Date('2025-06-01'),
    endDate: new Date('2025-11-30'),
    current: false,
    description: 'Built enterprise-grade GenAI solutions\u2014designed AI agents for research, data extraction, and workflow automation; implemented RAG-based chatbots; orchestrated multi-agent LLM workflows using Supertool.'
  }
];

const importData = async () => {
  try {
    await connectDB();
    
    await Project.deleteMany();
    await Skill.deleteMany();
    await Experience.deleteMany();

    await Project.insertMany(projects);
    await Skill.insertMany(skills);
    await Experience.insertMany(experiences);

    console.log('Data successfully seeded!');
    process.exit();
  } catch (error) {
    console.error('Error with data import', error);
    process.exit(1);
  }
};

importData();
