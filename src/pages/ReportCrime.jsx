import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, MapPin, Calendar, Clock, User, AlertTriangle } from 'lucide-react';

const ReportCrime = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    crimeType: '',
    incidentDate: '',
    incidentTime: '',
    location: '',
    description: '',
    witnesses: '',
    suspect: '',
    evidence: '',
    anonymous: false,
    contactName: '',
    contactPhone: '',
    contactEmail: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const crimeTypes = [
    'Theft/Burglary',
    'Assault',
    'Vandalism',
    'Drug-related',
    'Fraud',
    'Domestic Violence',
    'Traffic Violation',
    'Cyber Crime',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.crimeType) newErrors.crimeType = 'Crime type is required';
    if (!formData.incidentDate) newErrors.incidentDate = 'Incident date is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.description) newErrors.description = 'Description is required';
    
    if (!formData.anonymous) {
      if (!formData.contactName) newErrors.contactName = 'Name is required for non-anonymous reports';
      if (!formData.contactPhone && !formData.contactEmail) {
        newErrors.contactPhone = 'Phone or email is required';
        newErrors.contactEmail = 'Phone or email is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate report ID
    const reportId = 'CR' + Date.now().toString().slice(-6);
    
    // Store report (in real app, this would be sent to backend)
    const report = {
      ...formData,
      id: reportId,
      status: 'submitted',
      submittedAt: new Date().toISOString()
    };
    
    const existingReports = JSON.parse(localStorage.getItem('crimeReports') || '[]');
    existingReports.push(report);
    localStorage.setItem('crimeReports', JSON.stringify(existingReports));
    
    setIsSubmitting(false);
    
    // Redirect to confirmation page with report ID
    navigate('/track', { state: { reportId, justSubmitted: true } });
  };

  return (
    <div className="report-crime">
      <div className="container">
        <div className="report-header">
          <h1>
            <FileText size={32} />
            Report a Crime
          </h1>
          <p>Provide as much detail as possible to help law enforcement investigate your report.</p>
        </div>

        <div className="emergency-notice">
          <AlertTriangle size={24} />
          <div>
            <strong>Emergency Notice:</strong> If you are in immediate danger or witnessing a crime in progress, call 911 immediately.
          </div>
        </div>

        <form onSubmit={handleSubmit} className="report-form">
          <div className="form-section">
            <h2>Incident Information</h2>
            
            <div className="form-group">
              <label className="form-label">
                Type of Crime <span className="required">*</span>
              </label>
              <select
                name="crimeType"
                value={formData.crimeType}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Select crime type...</option>
                {crimeTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.crimeType && <div className="form-error">{errors.crimeType}</div>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <Calendar size={16} />
                  Date of Incident <span className="required">*</span>
                </label>
                <input
                  type="date"
                  name="incidentDate"
                  value={formData.incidentDate}
                  onChange={handleChange}
                  className="form-input"
                  max={new Date().toISOString().split('T')[0]}
                />
                {errors.incidentDate && <div className="form-error">{errors.incidentDate}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Clock size={16} />
                  Time of Incident
                </label>
                <input
                  type="time"
                  name="incidentTime"
                  value={formData.incidentTime}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                <MapPin size={16} />
                Location <span className="required">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="form-input"
                placeholder="Street address, intersection, or landmark"
              />
              {errors.location && <div className="form-error">{errors.location}</div>}
            </div>
          </div>

          <div className="form-section">
            <h2>Incident Details</h2>
            
            <div className="form-group">
              <label className="form-label">
                Description of Incident <span className="required">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Provide a detailed description of what happened..."
                rows="6"
              />
              {errors.description && <div className="form-error">{errors.description}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Suspect Description</label>
              <textarea
                name="suspect"
                value={formData.suspect}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Physical description, clothing, vehicle information, etc."
                rows="3"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Witnesses</label>
              <textarea
                name="witnesses"
                value={formData.witnesses}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Names and contact information of any witnesses"
                rows="3"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Evidence</label>
              <textarea
                name="evidence"
                value={formData.evidence}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Description of any physical evidence, photos, videos, etc."
                rows="3"
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Contact Information</h2>
            
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="anonymous"
                  checked={formData.anonymous}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                Submit this report anonymously
              </label>
              <p className="form-help">
                Anonymous reports may limit follow-up capabilities but will still be investigated.
              </p>
            </div>

            {!formData.anonymous && (
              <>
                <div className="form-group">
                  <label className="form-label">
                    <User size={16} />
                    Full Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Your full name"
                  />
                  {errors.contactName && <div className="form-error">{errors.contactName}</div>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="(555) 123-4567"
                    />
                    {errors.contactPhone && <div className="form-error">{errors.contactPhone}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="your.email@example.com"
                    />
                    {errors.contactEmail && <div className="form-error">{errors.contactEmail}</div>}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting Report...' : 'Submit Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportCrime;