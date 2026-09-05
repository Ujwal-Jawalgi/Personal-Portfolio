require('dotenv').config();
const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  technologies: [String],
  githubUrl: String,
  liveUrl: String,
});
// Need to handle if model is already compiled or not
const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

const updates = {
  'Personal portfolio': '/portfolio.png',
  'smartFoot': '/smartfoot.png',
  'Pikachu-HHGoa': '/idcard.png',
  'Voice-Enabled_RAG': '/voiceRAG.png',
  'Face_Identification': '/faceid.png',
  'Mineral-Chatbot': '/mineralchat.png',
  'blockchain-carbon-registry-ujwal': '/bluecarbon.png',
  'AI-Interview-Prep': '/prepmind.png',
};

async function updateImages() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const projects = await Project.find({});
    
    for (const project of projects) {
      if (updates[project.title]) {
        project.imageUrl = updates[project.title];
        await project.save();
        console.log(`Updated image for: ${project.title} to ${project.imageUrl}`);
      } else {
        console.log(`No match found for: ${project.title}`);
      }
    }
    console.log('Done!');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit();
  }
}

updateImages();
