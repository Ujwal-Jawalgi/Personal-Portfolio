const mongoose = require('mongoose');

const skillSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a skill name'],
      trim: true,
      maxlength: [50, 'Skill name cannot exceed 50 characters'],
    },
    category: {
      type: String,
      required: [true, 'Please add a category (e.g. Frontend, Backend)'],
      enum: ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Other'],
    },
    iconUrl: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Skill', skillSchema);
