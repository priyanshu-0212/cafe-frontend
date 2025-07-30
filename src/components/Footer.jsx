import React from 'react';

export default function Footer() {
  return (
    <footer className="Footer">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="footer-logo">MERN Café</span>
          <span className="footer-tagline"> Sip. Savor. Repeat.</span>
        </div>
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/menu">Menu</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy Policy</a>
        </div>
        <div className="footer-social">
          <a href="#" aria-label="Instagram"><i className="fa fa-instagram"></i></a>
          <a href="#" aria-label="Facebook"><i className="fa fa-facebook"></i></a>
          <a href="#" aria-label="Twitter"><i className="fa fa-twitter"></i></a>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} MERN Café. All rights reserved.
      </div>
    </footer>
  );
}