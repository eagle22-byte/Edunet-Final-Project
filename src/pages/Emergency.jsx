import React from 'react';
import { Phone, AlertTriangle, MapPin, Clock, Heart, Shield } from 'lucide-react';

const Emergency = () => {
  const emergencyContacts = [
    {
      service: 'Police Emergency',
      number: '100',
      description: 'Immediate police response for crimes in progress',
      available: '24/7'
    },
    {
      service: 'Fire Department',
      number: '101',
      description: 'Fire emergencies and hazardous situations',
      available: '24/7'
    },
    {
      service: 'Medical Emergency',
      number: '108',
      description: 'Ambulance and emergency medical services',
      available: '24/7'
    },
    {
      service: 'Police Non-Emergency',
      number: '112',
      description: 'Non-urgent police matters and general inquiries',
      available: 'Daily 8AM-8PM'
    }
  ];

  const crisisResources = [
    {
      name: 'National Suicide Prevention Lifeline',
      number: '1800‑599‑0019',
      description: 'Toll‑free 24×7 mental health and crisis support across India',
      available: '24/7'
    },
    {
      name: 'Domestic Violence Hotline ',
      number: '181',
      description: 'National Women’s Helpline (women in distress, including domestic violence)',
      available: '24/7'
    },
    {
      name: 'Crisis Text Line',
      contact: 'Text to 1800‑599‑0019',
      description: 'Crisis counseling via text message',
      available: '24/7'
    },
    {
      name: 'Poison Control',
      number: '102/108',
      description: 'Poison and overdose emergencies',
      available: '24/7'
    }
  ];

  return (
    <div className="emergency">
      <div className="container">
        <div className="emergency-header">
          <AlertTriangle size={48} className="emergency-icon" />
          <h1>Emergency Information</h1>
          <p>Important contacts and resources for emergency situations</p>
        </div>

        <div className="emergency-alert">
          <div className="alert-content">
            <Phone size={32} />
            <div>
              <h2>In Immediate Danger?</h2>
              <p>If you are in immediate danger or witnessing a crime in progress, call 100 now.</p>
            </div>
            <a href="tel:100" className="btn btn-danger emergency-btn">
              Call 100
            </a>
          </div>
        </div>

        <div className="emergency-sections">
          <div className="emergency-section">
            <h2>
              <Shield size={24} />
              Emergency Services
            </h2>
            <div className="contacts-grid">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="contact-card">
                  <div className="contact-header">
                    <h3>{contact.service}</h3>
                    <a href={`tel:${contact.number}`} className="contact-number">
                      {contact.number}
                    </a>
                  </div>
                  <p className="contact-description">{contact.description}</p>
                  <div className="contact-availability">
                    <Clock size={16} />
                    <span>{contact.available}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="emergency-section">
            <h2>
              <Heart size={24} />
              Crisis Support Resources
            </h2>
            <div className="contacts-grid">
              {crisisResources.map((resource, index) => (
                <div key={index} className="contact-card">
                  <div className="contact-header">
                    <h3>{resource.name}</h3>
                    {resource.number ? (
                      <a href={`tel:${resource.number}`} className="contact-number">
                        {resource.number}
                      </a>
                    ) : (
                      <span className="contact-number">{resource.contact}</span>
                    )}
                  </div>
                  <p className="contact-description">{resource.description}</p>
                  <div className="contact-availability">
                    <Clock size={16} />
                    <span>{resource.available}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="safety-tips">
          <h2>
            <MapPin size={24} />
            Safety Tips
          </h2>
          <div className="tips-grid">
            <div className="tip-card">
              <h3>Personal Safety</h3>
              <ul>
                <li>Trust your instincts if something feels wrong</li>
                <li>Stay aware of your surroundings</li>
                <li>Keep emergency contacts easily accessible</li>
                <li>Let someone know your whereabouts</li>
              </ul>
            </div>
            <div className="tip-card">
              <h3>Home Security</h3>
              <ul>
                <li>Lock doors and windows when leaving</li>
                <li>Install adequate lighting around entrances</li>
                <li>Don't advertise valuables or vacations</li>
                <li>Consider a security system</li>
              </ul>
            </div>
            <div className="tip-card">
              <h3>Online Safety</h3>
              <ul>
                <li>Protect personal information online</li>
                <li>Use strong, unique passwords</li>
                <li>Be cautious with social media sharing</li>
                <li>Report suspicious online activity</li>
              </ul>
            </div>
            <div className="tip-card">
              <h3>If You're a Victim</h3>
              <ul>
                <li>Prioritize your safety above all else</li>
                <li>Preserve evidence when possible</li>
                <li>Report the crime as soon as it's safe</li>
                <li>Seek support from friends, family, or counselors</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="additional-info">
          <div className="info-card">
            <h3>When to Call 100</h3>
            <ul>
              <li>Someone is seriously injured or in danger</li>
              <li>A crime is happening right now</li>
              <li>You see a fire or hazardous situation</li>
              <li>Someone is threatening you or others</li>
            </ul>
          </div>
          <div className="info-card">
            <h3>When to Use Non-Emergency</h3>
            <ul>
              <li>Report a crime that already happened</li>
              <li>File a report for insurance purposes</li>
              <li>Ask questions about police services</li>
              <li>Report suspicious but non-threatening activity</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emergency;