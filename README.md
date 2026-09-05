# Personal Developer Portfolio

A full-stack (MERN) personal portfolio application to showcase projects, skills, and experience.

## Live Demo
* **Frontend**: [https://ujwal-portfolio1.vercel.app/](https://ujwal-portfolio1.vercel.app/)
* **Backend API**: [https://personal-portfolio-aii0.onrender.com/health](https://personal-portfolio-aii0.onrender.com/health)

## Tech Stack
*   **Frontend**: React, Vite, React Router, React Query, React Hook Form, Zod
*   **Backend**: Node.js, Express, MongoDB, Mongoose
*   **Integrations**: Nodemailer (Gmail), Cloudinary (Image Uploads)

## Setup Instructions

### 1. Backend Setup
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file based on `.env.example`:
   ```env
   MONGO_URI=mongodb://localhost:27017/portfolio
   PORT=5000
   NODE_ENV=development
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_RECEIVER=your-email@gmail.com
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ADMIN_API_KEY=your_secure_admin_api_key
   FRONTEND_URL=http://localhost:5173
   ```
4. Start the development server: `npm run dev`

### 2. Frontend Setup
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Create a `.env` file:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the Vite dev server: `npm run dev`

## API Endpoints

### Projects
*   `GET /api/projects` - Get all projects (Public)
*   `GET /api/projects/:id` - Get project by ID (Public)
*   `POST /api/projects` - Create a project (Requires `x-api-key` header)
*   `PUT /api/projects/:id` - Update a project (Requires `x-api-key` header)
*   `DELETE /api/projects/:id` - Delete a project (Requires `x-api-key` header)

### Skills
*   `GET /api/skills` - Get all skills (Public)
*   `POST /api/skills` - Create a skill (Requires `x-api-key` header)
*   `PUT /api/skills/:id` - Update a skill (Requires `x-api-key` header)
*   `DELETE /api/skills/:id` - Delete a skill (Requires `x-api-key` header)

### Experience
*   `GET /api/experience` - Get all experience (Public)
*   `POST /api/experience` - Create experience (Requires `x-api-key` header)
*   `PUT /api/experience/:id` - Update experience (Requires `x-api-key` header)
*   `DELETE /api/experience/:id` - Delete experience (Requires `x-api-key` header)

### Misc
*   `POST /api/contact` - Send contact email (Public, Rate-limited)
*   `POST /api/upload` - Upload image to Cloudinary (Requires `x-api-key` header, 5MB limit)
*   `GET /health` - Health check (Public)
