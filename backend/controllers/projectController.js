const Project = require('../models/Project');
const { asyncHandler } = require('../middleware/errorMiddleware');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({}).sort({ createdAt: -1 });
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
