const Project = require('../models/Project');
const { asyncHandler } = require('../middleware/errorMiddleware');

// Hardcoded fallback data from seed.js in case DB is down
const fallbackProjects = [
  {
    _id: "1",
    title: 'Pikachu \u2014 Voice-Enabled Multilingual RAG System',
    description: 'A voice-enabled, multilingual Retrieval-Augmented Generation system built for HH Goa 2026. Ask a question by voice or text in any of 15 Indic languages; it transcribes speech, retrieves from a unified 700,000-chunk FAISS vector index, and generates a grounded, guardrailed answer with full latency transparency.',
    technologies: ['Next.js', 'FastAPI', 'Sarvam AI', 'Groq API', 'FAISS', 'Tailwind CSS'],
    githubLink: 'https://github.com/Ujwal-Jawalgi/Voice-Enabled-RAG',
    liveLink: 'https://voice-enabled-rag.vercel.app/',
    imageUrl: '/voiceRAG.png'
  },
  {
    _id: "2",
    title: 'AI Interview Preparation Platform',
    description: 'An AI-powered mock interview and resume-analysis platform. Includes an ATS resume analyzer, voice-based mock interviews, a built-in multi-language code editor, and AI evaluation of answers (communication, confidence, technical accuracy).',
    technologies: ['Next.js', 'React', 'Supabase', 'Clerk', 'Groq API', 'Web Speech API'],
    githubLink: 'https://github.com/Ujwal-Jawalgi/AI-Interview-Prep',
    liveLink: 'https://ai-interview-arun-khajapure.vercel.app/',
    imageUrl: '/prepmind.png'
  },
  {
    _id: "3",
    title: 'Mineral Chatbot',
    description: 'A specialized geology question-answering chatbot powered by the OpenAI API. Provides accurate, domain-specific answers about minerals and geological data.',
    technologies: ['Next.js', 'React', 'Supabase', 'OpenAI API'],
    githubLink: 'https://github.com/Ujwal-Jawalgi/Mineral-Chatbot',
    liveLink: 'https://mineral-chatbot.vercel.app',
    imageUrl: '/mineralchat.png'
  },
  {
    _id: "4",
    title: 'Pikachu HH Goa \u2014 ID Card Generator',
    description: 'A Goa beach-themed ID card generator built for the HH Goa hackathon. Users upload a photo and receive a unique HHG-XXXXX ID card with a QR code.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    githubLink: 'https://github.com/Ujwal-Jawalgi/Pikachu-HHGoa',
    liveLink: 'https://pikachu-hh-goa.vercel.app',
    imageUrl: '/idcard.png'
  },
  {
    _id: "5",
    title: 'Blue Carbon Ledger \u2014 Blockchain Registry',
    description: 'A decentralized MRV (Monitoring, Reporting, Verification) platform for blue carbon restoration projects built for Smart India Hackathon 2025. Contributed to the blockchain layer/smart contracts.',
    technologies: ['React', 'TypeScript', 'Solidity', 'Polygon', 'Hardhat', 'IPFS'],
    githubLink: 'https://github.com/Ujwal-Jawalgi/blockchain-carbon-registry-ujwal',
    liveLink: 'https://ujwal-bluecarbon-registry.lovable.app/',
    imageUrl: '/bluecarbon.png'
  },
  {
    _id: "6",
    title: 'SmartFoot \u2014 Energy Harvesting Platform',
    description: 'A prototype that converts footsteps into usable electrical energy via piezoelectric tiles. Built the frontend and backend integration with the ESP32 microcontroller.',
    technologies: ['React', 'Supabase', 'ESP32', 'Vite', 'Framer Motion'],
    githubLink: 'https://github.com/Ujwal-Jawalgi/SmartFoot',
    liveLink: 'https://smartfoot-liard.vercel.app',
    imageUrl: '/smartfoot.png'
  }
];

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = asyncHandler(async (req, res) => {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error('Database connection failed, using fallback projects:', error.message);
    res.json(fallbackProjects);
  }
});

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project) {
    res.json(project);
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

// @desc    Create a project
// @route   POST /api/projects
// @access  Public (No Auth required per user instruction)
const createProject = asyncHandler(async (req, res) => {
  const { title, description, technologies, githubLink, liveLink, imageUrl } = req.body;

  const project = await Project.create({
    title,
    description,
    technologies,
    githubLink,
    liveLink,
    imageUrl,
  });

  res.status(201).json(project);
});

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Public (No Auth required per user instruction)
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project) {
    project.title = req.body.title || project.title;
    project.description = req.body.description || project.description;
    project.technologies = req.body.technologies || project.technologies;
    project.githubLink = req.body.githubLink || project.githubLink;
    project.liveLink = req.body.liveLink || project.liveLink;
    project.imageUrl = req.body.imageUrl || project.imageUrl;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Public (No Auth required per user instruction)
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project) {
    await project.deleteOne();
    res.json({ message: 'Project removed' });
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
