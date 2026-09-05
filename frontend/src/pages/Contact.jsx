import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import api from '../api/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Contact.css';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const Contact = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: '0fe02551-84d8-4572-a538-b7fff16d841b',
          ...data
        })
      });

      const result = await response.json();
      if (result.success) {
        toast.success('Message sent successfully!');
        reset();
      } else {
        toast.error(result.message || 'Failed to send message');
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again later.');
    }
  };

  return (
    <div className="container page-container contact-container">
      <ToastContainer theme="dark" />
      <h1 className="section-title">Get In Touch</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
        Have a question or want to work together? Leave a message below!
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
        <div className="form-group">
          <label>Name</label>
          <input type="text" {...register('name')} className={errors.name ? 'input-error' : ''} />
          {errors.name && <span className="error-text">{errors.name.message}</span>}
        </div>
        
        <div className="form-group">
          <label>Email</label>
          <input type="email" {...register('email')} className={errors.email ? 'input-error' : ''} />
          {errors.email && <span className="error-text">{errors.email.message}</span>}
        </div>

        <div className="form-group">
          <label>Subject</label>
          <input type="text" {...register('subject')} />
        </div>

        <div className="form-group">
          <label>Message</label>
          <textarea rows="6" {...register('message')} className={errors.message ? 'input-error' : ''}></textarea>
          {errors.message && <span className="error-text">{errors.message.message}</span>}
        </div>

        <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ width: '100%' }}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default Contact;
