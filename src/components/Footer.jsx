import React from 'react';
import { Shield, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <Shield size={32} />
              <span>CrimeReport</span>
            </div>
            <p>
              Secure and confidential crime reporting platform for safer communities.
              Your reports help law enforcement keep our neighborhoods safe.
            </p>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/report">Report a Crime</a></li>
              <li><a href="/track">Track Report</a></li>
              <li><a href="/emergency">Emergency Contacts</a></li>
              <li><a href="/dashboard">Dashboard</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact Info</h3>
            <div className="contact-info">
              <div className="contact-item">
                <Phone size={16} />
                <span>Emergency: 911</span>
              </div>
              <div className="contact-item">
                <Phone size={16} />
                <span>Non-Emergency: (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <Mail size={16} />
                <span>info@crimereport.gov</span>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span>123 Justice Ave, City, State 12345</span>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h3>Resources</h3>
            <ul>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#help">Help & Support</a></li>
              <li><a href="#safety">Safety Tips</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 CrimeReport System. All rights reserved.</p>
          <p>Confidential and secure reporting platform</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;