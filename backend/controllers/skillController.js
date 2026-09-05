const Skill = require('../models/Skill');
const { asyncHandler } = require('../middleware/errorMiddleware');

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
const getSkills = asyncHandler(async (req, res) => {
  const skills = await Skill.find({});
  res.json(skills);
});

// @desc    Create a skill
// @route   POST /api/skills
// @access  Public
const createSkill = asyncHandler(async (req, res) => {
  const { name, category, iconUrl } = req.body;
  const skill = await Skill.create({ name, category, iconUrl });
  res.status(201).json(skill);
});

// @desc    Update a skill
// @route   PUT /api/skills/:id
// @access  Public
const updateSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findById(req.params.id);

  if (skill) {
    skill.name = req.body.name || skill.name;
    skill.category = req.body.category || skill.category;
    skill.iconUrl = req.body.iconUrl || skill.iconUrl;
    const updatedSkill = await skill.save();
    res.json(updatedSkill);
  } else {
    res.status(404);
    throw new Error('Skill not found');
  }
});

// @desc    Delete a skill
// @route   DELETE /api/skills/:id
// @access  Public
const deleteSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findById(req.params.id);

  if (skill) {
    await skill.deleteOne();
    res.json({ message: 'Skill removed' });
  } else {
    res.status(404);
    throw new Error('Skill not found');
  }
});

module.exports = { getSkills, createSkill, updateSkill, deleteSkill };
