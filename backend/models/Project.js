const mongoose = require('mongoose');

const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      trim: true,
    },
    technologies: {
      type: [String],
      required: [true, 'Please add at least one technology'],
      validate: [v => v.length > 0, 'Must provide at least one technology']
    },
    githubLink: {
      type: String,
      match: [
        /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/,
        'Please use a valid GitHub URL',
      ],
    },
    liveLink: {
      type: String,
      match: [
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
        'Please use a valid HTTP/HTTPS URL',
      ],
    },
    imageUrl: {
      type: String,
      required: [true, 'Please provide an image URL'],
    },
  },
  {
    timestamps: true,
  }
);

projectSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Project', projectSchema);
