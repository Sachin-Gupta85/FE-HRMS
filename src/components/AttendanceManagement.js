import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { employeeAPI, attendanceAPI } from '../services/api';

function AttendanceManagement() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [activeNav, setActiveNav] = useState('attendance');
  const [filters, setFilters] = useState({
    employeeId: '',
    startDate: '',
    endDate: ''
  });
  const [formData, setFormData] = useState({
    employee: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Present'
  });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [employeesRes, attendanceRes] = await Promise.all([
        employeeAPI.getAll(),
        attendanceAPI.getAll(filters)
      ]);
      setEmployees(employeesRes.data);
      setAttendance(attendanceRes.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await attendanceAPI.create(formData);
      setSuccess('Attendance tracked successfully');
      setError('');
      setFormData({
        employee: '',
        date: new Date().toISOString().split('T')[0],
        status: 'Present'
      });
      setShowForm(false);
      fetchData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to track attendance');
      setSuccess('');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const applyFilters = async () => {
    try {
      setLoading(true);
      const response = await attendanceAPI.getAll(filters);
      setAttendance(response.data);
      setError('');
    } catch (err) {
      setError('Failed to filter attendance');
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({
      employeeId: '',
      startDate: '',
      endDate: ''
    });
    fetchData();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getSelectedEmployee = () => {
    return employees.find(emp => emp.id === parseInt(formData.employee));
  };

  const handleNavigation = (page) => {
    setActiveNav(page);
    navigate(`/${page === 'dashboard' ? '' : page}`);
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
    radioGroup: {
      display: 'flex',
      gap: '16px',
      marginTop: '12px'
    },
    radioLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      cursor: 'pointer',
      padding: '12px 20px',
      border: '2px solid #e5e7eb',
      borderRadius: '10px',
      fontSize: '15px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      background: 'white'
    },
    radioLabelActive: {
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      borderColor: '#667eea',
      color: 'white'
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
    statusBadgePresent: {
      background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
      color: '#065f46'
    },
    statusBadgeAbsent: {
      background: 'linear-gradient(135deg, #fee2e2, #fecaca)',
      color: '#991b1b'
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
    filterSection: {
      background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
      padding: '28px',
      borderRadius: '16px',
      marginBottom: '32px',
      border: '2px solid rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)'
    },
    filterTitle: {
      fontSize: '20px',
      fontWeight: '700',
      color: '#1e293b',
      marginBottom: '20px',
      letterSpacing: '-0.3px'
    },
    buttonGroup: {
      display: 'flex',
      gap: '16px',
      marginTop: '20px'
    },
    selectedEmployeeInfo: {
      background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
      padding: '16px 20px',
      borderRadius: '12px',
      marginBottom: '20px',
      border: '2px solid #34d399',
      fontSize: '15px',
      color: '#065f46',
      fontWeight: '600'
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
        <div style={styles.loaderText}>Loading Attendance...</div>
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
            <h2 style={styles.title}>📊 Attendance Tracking</h2>
            <button 
              style={showForm ? {...styles.button, ...styles.buttonSecondary} : styles.button}
              className={showForm ? 'btn-secondary' : 'btn-primary'}
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? '✕ Cancel' : '📝 Track Attendance'}
            </button>
          </div>

          {error && <div style={styles.error}>⚠️ {error}</div>}
          {success && <div style={styles.success}>✅ {success}</div>}

          {showForm && (
            <div style={styles.formSection}>
              <h4 style={styles.formTitle}>📋 Record Team Member Attendance</h4>
              <form onSubmit={handleSubmit}>
                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>👤 Select Team Member</label>
                    <select
                      name="employee"
                      value={formData.employee}
                      onChange={handleInputChange}
                      style={styles.select}
                      required
                    >
                      <option value="">Choose a team member...</option>
                      {employees.map((employee) => (
                        <option key={employee.id} value={employee.id}>
                          {employee.employee_id} - {employee.full_name} ({employee.department})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>📅 Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      style={styles.input}
                      required
                    />
                  </div>
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.label}>📊 Attendance Status</label>
                  <div style={styles.radioGroup}>
                    <label style={{
                      ...styles.radioLabel,
                      ...(formData.status === 'Present' ? styles.radioLabelActive : {})
                    }}>
                      <input
                        type="radio"
                        name="status"
                        value="Present"
                        checked={formData.status === 'Present'}
                        onChange={handleInputChange}
                        style={{ margin: 0 }}
                      />
                      ✅ Present
                    </label>
                    <label style={{
                      ...styles.radioLabel,
                      ...(formData.status === 'Absent' ? styles.radioLabelActive : {})
                    }}>
                      <input
                        type="radio"
                        name="status"
                        value="Absent"
                        checked={formData.status === 'Absent'}
                        onChange={handleInputChange}
                        style={{ margin: 0 }}
                      />
                      ❌ Absent
                    </label>
                  </div>
                </div>
                
                {getSelectedEmployee() && (
                  <div style={styles.selectedEmployeeInfo}>
                    <strong>🎯 Selected:</strong> {getSelectedEmployee().full_name} 
                    <span style={{ marginLeft: '8px' }}>
                      ({getSelectedEmployee().department})
                    </span>
                  </div>
                )}
                
                <div style={{ marginTop: '24px' }}>
                  <button type="submit" style={styles.button} className="btn-primary">
                    💾 Save Attendance
                  </button>
                </div>
              </form>
            </div>
          )}

          <div style={styles.filterSection}>
            <h4 style={styles.filterTitle}>🔍 Filter Attendance Records</h4>
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label}>👤 Team Member</label>
                <select
                  name="employeeId"
                  value={filters.employeeId}
                  onChange={handleFilterChange}
                  style={styles.select}
                >
                  <option value="">All Team Members</option>
                  {employees.map((employee) => (
                    <option key={employee.id} value={employee.employee_id}>
                      {employee.employee_id} - {employee.full_name}
                    </option>
                  ))}
                </select>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>📅 Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={filters.startDate}
                  onChange={handleFilterChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>📅 End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={filters.endDate}
                  onChange={handleFilterChange}
                  style={styles.input}
                />
              </div>
            </div>
            <div style={styles.buttonGroup}>
              <button 
                style={styles.button}
                className="btn-primary"
                onClick={applyFilters}
              >
                🔍 Apply Filters
              </button>
              <button 
                style={{...styles.button, ...styles.buttonSecondary}}
                className="btn-secondary"
                onClick={clearFilters}
              >
                🔄 Clear Filters
              </button>
            </div>
          </div>

          {attendance.length === 0 ? (
            <div style={styles.emptyState}>
              <h3 style={styles.emptyStateTitle}>📊 Ready to Track Attendance</h3>
              <p>Start monitoring team attendance by recording the first entry or adjust your filters</p>
              <button 
                style={styles.button}
                className="btn-primary"
                onClick={() => setShowForm(true)}
              >
                🚀 Record First Entry
              </button>
            </div>
          ) : (
            <>
              <div style={styles.recordCount}>
                📈 Showing {attendance.length} attendance record{attendance.length !== 1 ? 's' : ''}
                {(filters.employeeId || filters.startDate || filters.endDate) && (
                  <span style={{ marginLeft: '8px', fontStyle: 'italic' }}>
                    (filtered results)
                  </span>
                )}
              </div>
              <div className="table-container" style={{overflowX: 'auto'}}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>ID</th>
                      <th style={styles.th}>Team Member</th>
                      <th style={styles.th}>Date</th>
                      <th style={styles.th}>Status</th>
                      <th style={styles.th}>Recorded</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendance.map((record) => (
                      <tr key={record.id}>
                        <td style={styles.td}>
                          <strong style={{ color: '#667eea', fontSize: '16px' }}>
                            {record.employee_id}
                          </strong>
                        </td>
                        <td style={styles.td}>
                          <div style={{fontWeight: '600', fontSize: '15px'}}>{record.employee_name}</div>
                        </td>
                        <td style={styles.td}>
                          <span style={{
                            ...styles.badge,
                            background: 'linear-gradient(135deg, #e0e7ff, #c7d2fe)',
                            color: '#3730a3'
                          }}>
                            📅 {formatDate(record.date)}
                          </span>
                        </td>
                        <td style={styles.td}>
                          <span style={{
                            ...styles.badge,
                            ...(record.status === 'Present' ? styles.statusBadgePresent : styles.statusBadgeAbsent)
                          }}>
                            {record.status === 'Present' ? '✅' : '❌'} {record.status}
                          </span>
                        </td>
                        <td style={styles.td}>
                          <span style={{ 
                            fontSize: '14px',
                            ...styles.badge,
                            background: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)',
                            color: '#475569'
                          }}>
                            🕒 {formatDate(record.created_at)}
                          </span>
                        </td>
                      </tr>
                    ))}
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

export default AttendanceManagement;