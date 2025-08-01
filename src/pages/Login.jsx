import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-header">
              <LogIn size={48} />
              <h1>Sign In</h1>
              <p>Access your crime reporting dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              {error && (
                <div className="auth-error">
                  {error}
                </div>
              )}

              <div className="form-group">
                <label className="form-label">
                  <Mail size={16} />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Lock size={16} />
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary auth-submit"
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <div className="auth-footer">
              <p>
                Don't have an account? 
                <Link to="/register"> Create one here</Link>
              </p>
              <p>
                <Link to="/report">Report anonymously</Link> without an account
              </p>
            </div>
          </div>

          <div className="auth-info">
            <h2>Secure Access</h2>
            <ul>
              <li>Track your submitted reports</li>
              <li>Receive status updates</li>
              <li>Access your reporting history</li>
              <li>Manage contact preferences</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;