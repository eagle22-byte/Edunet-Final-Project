import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, FileText, Clock, CheckCircle, AlertCircle, Eye } from 'lucide-react';

const TrackReport = () => {
  const location = useLocation();
  const [reportId, setReportId] = useState(location.state?.reportId || '');
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (location.state?.justSubmitted && location.state?.reportId) {
      handleSearch(location.state.reportId);
    }
  }, [location.state]);

  const handleSearch = async (id = reportId) => {
    if (!id.trim()) {
      setError('Please enter a report ID');
      return;
    }

    setLoading(true);
    setError('');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Search in localStorage (in real app, this would be an API call)
    const reports = JSON.parse(localStorage.getItem('crimeReports') || '[]');
    const foundReport = reports.find(r => r.id === id.trim());
    
    if (foundReport) {
      setReport(foundReport);
    } else {
      setReport(null);
      setError('Report not found. Please check your report ID and try again.');
    }
    
    setLoading(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted': return 'status-submitted';
      case 'under_review': return 'status-review';
      case 'investigating': return 'status-investigating';
      case 'resolved': return 'status-resolved';
      case 'closed': return 'status-closed';
      default: return 'status-submitted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'submitted': return <FileText size={20} />;
      case 'under_review': return <Eye size={20} />;
      case 'investigating': return <Search size={20} />;
      case 'resolved': return <CheckCircle size={20} />;
      case 'closed': return <AlertCircle size={20} />;
      default: return <FileText size={20} />;
    }
  };

  const mockUpdates = [
    {
      date: '2025-01-15',
      time: '14:30',
      status: 'submitted',
      message: 'Report submitted successfully'
    },
    {
      date: '2025-01-15',
      time: '15:45',
      status: 'under_review',
      message: 'Report assigned to investigating officer'
    },
    {
      date: '2025-01-16',
      time: '09:15',
      status: 'investigating',
      message: 'Investigation in progress'
    }
  ];

  return (
    <div className="track-report">
      <div className="container">
        <div className="track-header">
          <h1>
            <Search size={32} />
            Track Your Report
          </h1>
          <p>Enter your report ID to check the status and updates on your submitted report.</p>
        </div>

        {location.state?.justSubmitted && (
          <div className="success-notice">
            <CheckCircle size={24} />
            <div>
              <strong>Report Submitted Successfully!</strong>
              <p>Your report ID is: <strong>{location.state.reportId}</strong></p>
              <p>Save this ID to track your report status.</p>
            </div>
          </div>
        )}

        <div className="search-section">
          <div className="search-form">
            <div className="form-group">
              <label className="form-label">Report ID</label>
              <div className="search-input-group">
                <input
                  type="text"
                  value={reportId}
                  onChange={(e) => setReportId(e.target.value)}
                  placeholder="Enter your report ID (e.g., CR123456)"
                  className="form-input"
                />
                <button
                  onClick={() => handleSearch()}
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Searching...' : 'Search'}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="error-message">
              <AlertCircle size={20} />
              {error}
            </div>
          )}
        </div>

        {report && (
          <div className="report-details">
            <div className="report-card">
              <div className="report-header-info">
                <div>
                  <h2>Report #{report.id}</h2>
                  <p className="report-type">{report.crimeType}</p>
                </div>
                <div className={`status-badge ${getStatusColor(report.status)}`}>
                  {getStatusIcon(report.status)}
                  <span>{report.status.replace('_', ' ').toUpperCase()}</span>
                </div>
              </div>

              <div className="report-info-grid">
                <div className="info-item">
                  <strong>Submitted:</strong>
                  <span>{new Date(report.submittedAt).toLocaleDateString()}</span>
                </div>
                <div className="info-item">
                  <strong>Location:</strong>
                  <span>{report.location}</span>
                </div>
                <div className="info-item">
                  <strong>Incident Date:</strong>
                  <span>{report.incidentDate}</span>
                </div>
                <div className="info-item">
                  <strong>Type:</strong>
                  <span>{report.anonymous ? 'Anonymous' : 'Named'} Report</span>
                </div>
              </div>

              <div className="report-description">
                <h3>Description</h3>
                <p>{report.description}</p>
              </div>
            </div>

            <div className="status-timeline">
              <h3>Status Updates</h3>
              <div className="timeline">
                {mockUpdates.map((update, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <div className="timeline-date">
                        {update.date} at {update.time}
                      </div>
                      <div className="timeline-message">{update.message}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {!report && !error && !loading && (
          <div className="no-results">
            <FileText size={64} />
            <h3>Enter Report ID to Track</h3>
            <p>Use the search form above to find and track your crime report.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackReport;