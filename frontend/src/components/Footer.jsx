import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import './Footer.css';

const Footer = () => {
  return (
    <footer id="contact" className="footer">
      <div className="container footer-container">
        <div className="footer-content">
          <h3 className="footer-title">Let's Connect</h3>
          <p className="footer-text">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          <a href="mailto:jawalgiujwal@gmail.com" className="btn btn-primary footer-btn">Say Hello</a>
        </div>
        <div className="footer-bottom">
          <div className="social-links">
            <a href="https://github.com/Ujwal-Jawalgi" target="_blank" rel="noopener noreferrer" className="social-link"><FaGithub size={24} /></a>
            <a href="https://www.linkedin.com/in/ujwal-u-jawalgi-132944320" target="_blank" rel="noopener noreferrer" className="social-link"><FaLinkedin size={24} /></a>
            <a href="https://x.com/Ujwal_Jawalgi" target="_blank" rel="noopener noreferrer" className="social-link"><FaXTwitter size={24} /></a>
            <a href="mailto:jawalgiujwal@gmail.com" className="social-link"><FaEnvelope size={24} /></a>
          </div>
          <p className="copyright">&copy; {new Date().getFullYear()} Ujwal U Jawalgi. Built with React & Node.js.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
