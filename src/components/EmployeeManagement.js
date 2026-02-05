import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { employeeAPI } from '../services/api';

function EmployeeManagement() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [activeNav, setActiveNav] = useState('employees');
  const [formData, setFormData] = useState({
    employee_id: '',
    full_name: '',
    email: '',
    department: ''
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await employeeAPI.getAll();
      setEmployees(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await employeeAPI.create(formData);
      setSuccess('Team member added successfully');
      setError('');
      setFormData({ employee_id: '', full_name: '', email: '', department: '' });
      setShowForm(false);
      fetchEmployees();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add team member');
      setSuccess('');
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from the team?`)) {
      try {
        await employeeAPI.delete(id);
        setSuccess('Team member removed successfully');
        setError('');
        fetchEmployees();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError('Failed to remove team member');
        setSuccess('');
      }
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNavigation = (page) => {
    setActiveNav(page);
    navigate(`/${page === 'employees' ? 'employees' : page}`);
  };

  const getDepartmentColor = (department) => {
    const colors = {
      'HR': { bg: 'linear-gradient(135deg, #dbeafe, #bfdbfe)', text: '#1e40af' },
      'IT': { bg: 'linear-gradient(135deg, #f3e8ff, #e9d5ff)', text: '#7c3aed' },
      'Finance': { bg: 'linear-gradient(135deg, #d1fae5, #a7f3d0)', text: '#059669' },
      'Marketing': { bg: 'linear-gradient(135deg, #fed7aa, #fdba74)', text: '#ea580c' },
      'Operations': { bg: 'linear-gradient(135deg, #fce7f3, #fbcfe8)', text: '#be185d' },
      'Sales': { bg: 'linear-gradient(135deg, #ccfbf1, #99f6e4)', text: '#0f766e' }
    };
    return colors[department] || { bg: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)', text: '#475569' };
  };

  const styles = {
    navbar: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: '0',
      boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    },
    navContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 32px'
    },
    navLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '40px'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      color: 'white',
      textDecoration: 'none',
      fontSize: '24px',
      fontWeight: '800',
      letterSpacing: '-0.5px'
    },
    logoIcon: {
      width: '44px',
      height: '44px',
      background: 'rgba(255, 255, 255, 0.25)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      fontWeight: '700'
    },
    navLinks: {
      display: 'flex',
      gap: '4px',
      listStyle: 'none',
      margin: 0,
      padding: 0
    },
    navLink: {
      color: 'rgba(255, 255, 255, 0.85)',
      textDecoration: 'none',
      padding: '16px 24px',
      display: 'block',
      fontSize: '15px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      borderRadius: '8px',
      position: 'relative'
    },
    navLinkActive: {
      color: 'white',
      background: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)'
    },
    navRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px'
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      color: 'white',
      background: 'rgba(255, 255, 255, 0.15)',
      padding: '8px 16px',
      borderRadius: '25px',
      backdropFilter: 'blur(10px)'
    },
    userAvatar: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #ff6b6b, #feca57)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '16px',
      fontWeight: '700',
      color: 'white',
      border: '2px solid rgba(255, 255, 255, 0.3)'
    },
    userName: {
      fontSize: '15px',
      fontWeight: '600'
    },
    container: {
      padding: '40px 32px',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      minHeight: 'calc(100vh - 80px)'
    },
    card: {
      background: 'white',
      borderRadius: '20px',
      padding: '32px',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.8)'
    },
    cardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '32px',
      paddingBottom: '24px',
      borderBottom: '2px solid #f1f5f9'
    },
    title: {
      fontSize: '32px',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      margin: 0,
      letterSpacing: '-1px'
    },
    button: {
      padding: '14px 28px',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      border: 'none',
      borderRadius: '12px',
      color: 'white',
      fontSize: '15px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
    },
    buttonSecondary: {
      background: 'white',
      border: '2px solid #e1e8ed',
      color: '#667eea',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
    },
    buttonDanger: {
      background: 'linear-gradient(135deg, #ef4444, #dc2626)',
      padding: '10px 20px',
      fontSize: '14px',
      boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)'
    },
    error: {
      background: 'linear-gradient(135deg, #fee2e2, #fecaca)',
      border: '2px solid #f87171',
      borderRadius: '12px',
      padding: '20px 24px',
      color: '#dc2626',
      fontSize: '15px',
      marginBottom: '24px',
      fontWeight: '600'
    },
    success: {
      background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
      border: '2px solid #34d399',
      borderRadius: '12px',
      padding: '20px 24px',
      color: '#059669',
      fontSize: '15px',
      marginBottom: '24px',
      fontWeight: '600'
    },
    formSection: {
      background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
      padding: '32px',
      borderRadius: '16px',
      marginBottom: '32px',
      border: '2px solid rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)'
    },
    formTitle: {
      fontSize: '22px',
      fontWeight: '700',
      color: '#1e293b',
      marginBottom: '24px',
      letterSpacing: '-0.3px'
    },
    formRow: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '20px',
      marginBottom: '20px'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    },
    label: {
      fontSize: '15px',
      fontWeight: '600',
      color: '#374151',
      letterSpacing: '0.3px'
    },
    input: {
      padding: '14px 16px',
      fontSize: '15px',
      border: '2px solid #e5e7eb',
      borderRadius: '10px',
      outline: 'none',
      transition: 'all 0.3s ease',
      background: 'white'
    },
    select: {
      padding: '14px 16px',
      fontSize: '15px',
      border: '2px solid #e5e7eb',
      borderRadius: '10px',
      outline: 'none',
      transition: 'all 0.3s ease',
      background: 'white'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '24px'
    },
    th: {
      textAlign: 'left',
      padding: '16px 20px',
      fontSize: '14px',
      fontWeight: '700',
      color: '#475569',
      background: '#f8fafc',
      borderBottom: '2px solid #e2e8f0',
      letterSpacing: '0.5px',
      textTransform: 'uppercase'
    },
    td: {
      padding: '20px',
      fontSize: '15px',
      color: '#334155',
      borderBottom: '1px solid #f1f5f9'
    },
    badge: {
      padding: '8px 16px',
      borderRadius: '20px',
      fontSize: '13px',
      fontWeight: '600',
      display: 'inline-block',
      letterSpacing: '0.3px'
    },
    emptyState: {
      textAlign: 'center',
      padding: '80px 20px',
      color: '#64748b'
    },
    emptyStateTitle: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#1e293b',
      marginBottom: '16px',
      letterSpacing: '-0.5px'
    },
    recordCount: {
      fontSize: '15px',
      color: '#64748b',
      marginTop: '24px',
      padding: '16px 20px',
      background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
      borderRadius: '12px',
      fontWeight: '600',
      border: '1px solid rgba(255, 255, 255, 0.8)'
    },
    loaderOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, rgba(245, 247, 250, 0.98), rgba(195, 207, 226, 0.98))',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      backdropFilter: 'blur(10px)'
    },
    loader: {
      width: '80px',
      height: '80px',
      border: '6px solid rgba(102, 126, 234, 0.1)',
      borderTop: '6px solid #667eea',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    loaderText: {
      marginTop: '24px',
      fontSize: '18px',
      color: '#475569',
      fontWeight: '600',
      letterSpacing: '0.5px'
    }
  };

  if (loading) {
    return (
      <div style={styles.loaderOverlay}>
        <style>
          {`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}
        </style>
        <div style={styles.loader}></div>
        <div style={styles.loaderText}>Loading Employees...</div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
      <style>
        {`
          * {
            box-sizing: border-box;
          }
          
          body {
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          }
          
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          
          input:focus, select:focus {
            border-color: #667eea !important;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
          }
          
          .btn-primary:hover {
            background: linear-gradient(135deg, #5a67d8, #6b46c1) !important;
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4) !important;
          }
          
          .btn-secondary:hover {
            background: #f8fafc !important;
            border-color: #667eea !important;
            transform: translateY(-1px);
          }
          
          .btn-danger:hover {
            background: linear-gradient(135deg, #dc2626, #b91c1c) !important;
            transform: translateY(-1px);
          }
          
          .nav-link:hover {
            background: rgba(255, 255, 255, 0.25) !important;
            transform: translateY(-1px);
          }
          
          tbody tr:hover {
            background: linear-gradient(135deg, #f8fafc, #e2e8f0) !important;
            transform: scale(1.01);
          }
          
          .table-container {
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
          }
        `}
      </style>

      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.navContainer}>
          <div style={styles.navLeft}>
            <a href="/" style={styles.logo}>
              <div style={styles.logoIcon}>🏢</div>
              <span>WorkFlow Pro</span>
            </a>
            <ul style={styles.navLinks}>
              <li>
                <button
                  style={{
                    ...styles.navLink,
                    ...(activeNav === 'dashboard' ? styles.navLinkActive : {}),
                    background: 'none',
                    border: 'none'
                  }}
                  className="nav-link"
                  onClick={() => handleNavigation('dashboard')}
                >
                  Overview
                </button>
              </li>
              <li>
                <button
                  style={{
                    ...styles.navLink,
                    ...(activeNav === 'employees' ? styles.navLinkActive : {}),
                    background: 'none',
                    border: 'none'
                  }}
                  className="nav-link"
                  onClick={() => handleNavigation('employees')}
                >
                  Team
                </button>
              </li>
              <li>
                <button
                  style={{
                    ...styles.navLink,
                    ...(activeNav === 'attendance' ? styles.navLinkActive : {}),
                    background: 'none',
                    border: 'none'
                  }}
                  className="nav-link"
                  onClick={() => handleNavigation('attendance')}
                >
                  Tracking
                </button>
              </li>
            </ul>
          </div>
          <div style={styles.navRight}>
            <div style={styles.userInfo}>
              <div style={styles.userAvatar}>A</div>
              <span style={styles.userName}>Administrator</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.title}>👥 Team Management</h2>
            <button 
              style={showForm ? {...styles.button, ...styles.buttonSecondary} : styles.button}
              className={showForm ? 'btn-secondary' : 'btn-primary'}
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? '✕ Cancel' : '➕ Add Member'}
            </button>
          </div>

          {error && <div style={styles.error}>⚠️ {error}</div>}
          {success && <div style={styles.success}>✅ {success}</div>}

          {showForm && (
            <div style={styles.formSection}>
              <h4 style={styles.formTitle}>🆕 Add New Team Member</h4>
              <form onSubmit={handleSubmit}>
                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>🆔 Employee ID</label>
                    <input
                      type="text"
                      name="employee_id"
                      value={formData.employee_id}
                      onChange={handleInputChange}
                      style={styles.input}
                      placeholder="e.g., WF001"
                      required
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>👤 Full Name</label>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      style={styles.input}
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                </div>
                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>📧 Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      style={styles.input}
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>🏢 Department</label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      style={styles.select}
                      required
                    >
                      <option value="">Select Department</option>
                      <option value="HR">Human Resources</option>
                      <option value="IT">Information Technology</option>
                      <option value="Finance">Finance & Accounting</option>
                      <option value="Marketing">Marketing & Sales</option>
                      <option value="Operations">Operations</option>
                      <option value="Sales">Sales</option>
                    </select>
                  </div>
                </div>
                <div style={{ marginTop: '24px' }}>
                  <button type="submit" style={styles.button} className="btn-primary">
                    ✨ Add Team Member
                  </button>
                </div>
              </form>
            </div>
          )}

          {employees.length === 0 ? (
            <div style={styles.emptyState}>
              <h3 style={styles.emptyStateTitle}>🎯 Ready to Build Your Team</h3>
              <p>Start building your amazing team by adding the first member</p>
              <button 
                style={styles.button}
                className="btn-primary"
                onClick={() => setShowForm(true)}
              >
                🚀 Add First Member
              </button>
            </div>
          ) : (
            <>
              <div style={styles.recordCount}>
                👥 Team Size: {employees.length} member{employees.length !== 1 ? 's' : ''}
              </div>
              <div className="table-container" style={{overflowX: 'auto'}}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>ID</th>
                      <th style={styles.th}>Team Member</th>
                      <th style={styles.th}>Contact</th>
                      <th style={styles.th}>Division</th>
                      <th style={styles.th}>Joined</th>
                      <th style={styles.th}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee) => {
                      const deptColor = getDepartmentColor(employee.department);
                      return (
                        <tr key={employee.id}>
                          <td style={styles.td}>
                            <strong style={{ color: '#667eea', fontSize: '16px' }}>
                              {employee.employee_id}
                            </strong>
                          </td>
                          <td style={styles.td}>
                            <div style={{fontWeight: '600', fontSize: '15px'}}>{employee.full_name}</div>
                          </td>
                          <td style={styles.td}>
                            <a 
                              href={`mailto:${employee.email}`}
                              style={{ 
                                color: '#667eea',
                                textDecoration: 'none',
                                fontWeight: '500'
                              }}
                            >
                              📧 {employee.email}
                            </a>
                          </td>
                          <td style={styles.td}>
                            <span style={{
                              ...styles.badge,
                              background: deptColor.bg,
                              color: deptColor.text
                            }}>
                              {employee.department}
                            </span>
                          </td>
                          <td style={styles.td}>
                            <span style={{
                              ...styles.badge,
                              background: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)',
                              color: '#475569'
                            }}>
                              {new Date(employee.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </td>
                          <td style={styles.td}>
                            <button
                              style={{...styles.button, ...styles.buttonDanger}}
                              className="btn-danger"
                              onClick={() => handleDelete(employee.id, employee.full_name)}
                            >
                              🗑️ Remove
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployeeManagement;