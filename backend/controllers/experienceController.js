const Experience = require('../models/Experience');
const { asyncHandler } = require('../middleware/errorMiddleware');

// @desc    Get all experience
// @route   GET /api/experience
// @access  Public
const getExperience = asyncHandler(async (req, res) => {
  const experiences = await Experience.find({}).sort({ startDate: -1 });
  res.json(experiences);
});

// @desc    Create an experience entry
// @route   POST /api/experience
// @access  Public
const createExperience = asyncHandler(async (req, res) => {
  const { title, company, location, startDate, endDate, current, description } = req.body;
  const experience = await Experience.create({
    title, company, location, startDate, endDate, current, description
  });
  res.status(201).json(experience);
});

// @desc    Update an experience entry
// @route   PUT /api/experience/:id
// @access  Public
const updateExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findById(req.params.id);

  if (experience) {
    experience.title = req.body.title || experience.title;
    experience.company = req.body.company || experience.company;
    experience.location = req.body.location || experience.location;
    experience.startDate = req.body.startDate || experience.startDate;
    experience.endDate = req.body.endDate || experience.endDate;
    experience.current = req.body.current !== undefined ? req.body.current : experience.current;
    experience.description = req.body.description || experience.description;
    
    const updatedExperience = await experience.save();
    res.json(updatedExperience);
  } else {
    res.status(404);
    throw new Error('Experience not found');
  }
});

// @desc    Delete an experience entry
// @route   DELETE /api/experience/:id
// @access  Public
const deleteExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findById(req.params.id);

  if (experience) {
    await experience.deleteOne();
    res.json({ message: 'Experience removed' });
  } else {
    res.status(404);
    throw new Error('Experience not found');
  }
});

module.exports = { getExperience, createExperience, updateExperience, deleteExperience };
