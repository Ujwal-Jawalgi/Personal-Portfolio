import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = () => {
  const queryClient = useQueryClient();

  // Queries
  const { data: projects, isLoading: projLoading } = useQuery({ queryKey: ['projects'], queryFn: () => api.get('/projects').then(res => res.data) });
  const { data: skills, isLoading: skillsLoading } = useQuery({ queryKey: ['skills'], queryFn: () => api.get('/skills').then(res => res.data) });
  
  // Delete Mutations (require API key in headers, you would normally prompt for it or have it stored)
  const deleteProject = useMutation({
    mutationFn: (id) => api.delete(`/projects/${id}`, { headers: { 'x-api-key': prompt('Enter Admin API Key:') } }),
    onSuccess: () => {
      queryClient.invalidateQueries(['projects']);
      toast.success('Project deleted');
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Error deleting project')
  });

  const deleteSkill = useMutation({
    mutationFn: (id) => api.delete(`/skills/${id}`, { headers: { 'x-api-key': prompt('Enter Admin API Key:') } }),
    onSuccess: () => {
      queryClient.invalidateQueries(['skills']);
      toast.success('Skill deleted');
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Error deleting skill')
  });

  return (
    <div className="container page-container">
      <ToastContainer theme="dark" />
      <h1 className="section-title">Admin Dashboard</h1>
      <p style={{ textAlign: 'center', marginBottom: '2rem' }}>Manage your portfolio content here.</p>

      <section style={{ marginBottom: '4rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2>Projects</h2>
          <button className="btn btn-primary" onClick={() => alert('Add Project form goes here')}>Add Project</button>
        </div>
        {projLoading ? <p>Loading...</p> : projects?.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)' }}>No projects found. Add one to get started!</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '1rem' }}>Title</th>
                <th style={{ padding: '1rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects?.map(p => (
                <tr key={p._id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '1rem' }}>{p.title}</td>
                  <td style={{ padding: '1rem' }}>
                    <button className="btn btn-secondary" style={{ marginRight: '0.5rem', padding: '0.4rem 1rem' }}>Edit</button>
                    <button onClick={() => deleteProject.mutate(p._id)} className="btn btn-primary" style={{ backgroundColor: '#ef4444', borderColor: '#ef4444', padding: '0.4rem 1rem' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2>Skills</h2>
          <button className="btn btn-primary" onClick={() => alert('Add Skill form goes here')}>Add Skill</button>
        </div>
        {skillsLoading ? <p>Loading...</p> : skills?.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)' }}>No skills found. Add one to get started!</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '1rem' }}>Name</th>
                <th style={{ padding: '1rem' }}>Category</th>
                <th style={{ padding: '1rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {skills?.map(s => (
                <tr key={s._id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '1rem' }}>{s.name}</td>
                  <td style={{ padding: '1rem' }}>{s.category}</td>
                  <td style={{ padding: '1rem' }}>
                    <button onClick={() => deleteSkill.mutate(s._id)} className="btn btn-primary" style={{ backgroundColor: '#ef4444', borderColor: '#ef4444', padding: '0.4rem 1rem' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
