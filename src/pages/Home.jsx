import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, FileText, Search, Phone, Users, Lock, Clock, AlertTriangle } from 'lucide-react';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Secure Crime Reporting System</h1>
              <p>
                Report crimes safely and anonymously. Help law enforcement keep our 
                community safe with fast, secure, and confidential incident reporting.
              </p>
              <div className="hero-buttons">
                <Link to="/report" className="btn btn-primary">
                  <FileText size={20} />
                  Report a Crime
                </Link>
                <Link to="/emergency" className="btn btn-danger">
                  <Phone size={20} />
                  Emergency
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <div className="hero-graphic">
                <Shield size={120} className="hero-icon" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="text-center mb-8">Why Use Our Platform?</h2>
          <div className="grid grid-3">
            <div className="feature-card">
              <Lock size={48} className="feature-icon" />
              <h3>Secure & Confidential</h3>
              <p>Your reports are encrypted and handled with the highest level of security and confidentiality.</p>
            </div>
            <div className="feature-card">
              <Clock size={48} className="feature-icon" />
              <h3>24/7 Availability</h3>
              <p>Report crimes anytime, anywhere. Our system is available around the clock for your safety.</p>
            </div>
            <div className="feature-card">
              <Users size={48} className="feature-icon" />
              <h3>Anonymous Options</h3>
              <p>Choose to report anonymously or provide contact information - the choice is yours.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions">
        <div className="container">
          <h2 className="text-center mb-8">Quick Actions</h2>
          <div className="grid grid-2">
            <Link to="/report" className="action-card">
              <FileText size={32} />
              <h3>File a Report</h3>
              <p>Submit a detailed crime report with all relevant information</p>
            </Link>
            <Link to="/track" className="action-card">
              <Search size={32} />
              <h3>Track Your Report</h3>
              <p>Check the status and updates on your submitted reports</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Emergency Alert */}
      <section className="emergency-alert">
        <div className="container">
          <div className="alert-content">
            <AlertTriangle size={32} />
            <div>
              <h3>In Case of Emergency</h3>
              <p>If you are in immediate danger, call 100 immediately. This system is for non-emergency reporting.</p>
            </div>
            <Link to="/emergency" className="btn btn-danger">
              Emergency Info
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="statistics">
        <div className="container">
          <h2 className="text-center mb-8">Community Impact</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">2,543</div>
              <div className="stat-label">Reports Submitted</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">1,847</div>
              <div className="stat-label">Cases Resolved</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">98%</div>
              <div className="stat-label">User Satisfaction</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">System Availability</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;