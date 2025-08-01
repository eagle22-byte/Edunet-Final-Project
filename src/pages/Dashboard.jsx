import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, FileText, Clock, CheckCircle, User, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    submitted: 0,
    investigating: 0,
    resolved: 0
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Load user's reports (in real app, this would be an API call)
    const allReports = JSON.parse(localStorage.getItem('crimeReports') || '[]');
    const userReports = allReports.filter(report => !report.anonymous);
    
    setReports(userReports);
    
    // Calculate stats
    const stats = {
      total: userReports.length,
      submitted: userReports.filter(r => r.status === 'submitted').length,
      investigating: userReports.filter(r => r.status === 'investigating').length,
      resolved: userReports.filter(r => r.status === 'resolved').length
    };
    setStats(stats);
  }, [user, navigate]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted': return '#3b82f6';
      case 'under_review': return '#f59e0b';
      case 'investigating': return '#8b5cf6';
      case 'resolved': return '#10b981';
      case 'closed': return '#6b7280';
      default: return '#3b82f6';
    }
  };

  if (!user) return null;

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h1>
              <User size={32} />
              Welcome back, {user.name}
            </h1>
            <p>Manage your crime reports and track their progress</p>
          </div>
          <button
            onClick={() => navigate('/report')}
            className="btn btn-primary"
          >
            <Plus size={20} />
            New Report
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="stats-overview">
          <div className="stat-card">
            <div className="stat-icon">
              <FileText size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.total}</div>
              <div className="stat-label">Total Reports</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <Clock size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.submitted}</div>
              <div className="stat-label">Submitted</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <BarChart3 size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.investigating}</div>
              <div className="stat-label">Investigating</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <CheckCircle size={24} />
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.resolved}</div>
              <div className="stat-label">Resolved</div>
            </div>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="dashboard-section">
          <h2>Your Reports</h2>
          
          {reports.length > 0 ? (
            <div className="reports-list">
              {reports.map((report) => (
                <div key={report.id} className="report-item">
                  <div className="report-main">
                    <div className="report-info">
                      <h3>Report #{report.id}</h3>
                      <p className="report-type">{report.crimeType}</p>
                      <p className="report-location">{report.location}</p>
                      <p className="report-date">
                        Submitted: {new Date(report.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="report-status">
                      <div 
                        className="status-indicator"
                        style={{ backgroundColor: getStatusColor(report.status) }}
                      ></div>
                      <span className="status-text">
                        {report.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="report-actions">
                    <button
                      onClick={() => navigate('/track', { state: { reportId: report.id } })}
                      className="btn btn-secondary"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-reports">
              <FileText size={64} />
              <h3>No Reports Yet</h3>
              <p>You haven't submitted any reports. Start by filing your first report.</p>
              <button
                onClick={() => navigate('/report')}
                className="btn btn-primary"
              >
                <Plus size={20} />
                File Your First Report
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;