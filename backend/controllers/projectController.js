const Project = require('../models/Project');
const { asyncHandler } = require('../middleware/errorMiddleware');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = asyncHandler(async (req, res) => {
  try {
    const githubRes = await fetch('https://api.github.com/users/Ujwal-Jawalgi/repos?sort=updated');
    if (githubRes.ok) {
      const data = await githubRes.json();
      const validRepos = data.filter(repo => repo.name !== 'ToDo-list');
      
      for (const repo of validRepos) {
        let liveLink = repo.homepage;
        if (repo.name === 'blockchain-carbon-registry-ujwal') {
          liveLink = 'https://ujwal-bluecarbon-registry.lovable.app/';
        } else if (repo.name === 'SmartFoot') {
          liveLink = 'http://smartfoot-liard.vercel.app';
        }

        const projectData = {
          title: repo.name,
          description: repo.description || 'No description provided.',
          technologies: repo.language ? [repo.language] : [],
          githubLink: repo.html_url,
          liveLink: liveLink || '',
          imageUrl: 'https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        };

        await Project.findOneAndUpdate(
          { githubLink: repo.html_url }, 
          projectData, 
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
      }
    }
  } catch (error) {
    console.error('GitHub sync failed, falling back to cached DB data:', error);
  }

  const projects = await Project.find({}).sort({ updatedAt: -1 });
  res.json(projects);
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
