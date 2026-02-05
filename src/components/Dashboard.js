import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dashboardAPI } from '../services/api';

function Dashboard() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeNav, setActiveNav] = useState('dashboard');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await dashboardAPI.getSummary();
      setDashboardData(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getAttendanceColor = (percentage) => {
    if (percentage >= 80) return { bg: '#e8f5e8', text: '#2d5a2d' };
    if (percentage >= 60) return { bg: '#fff8e1', text: '#b8860b' };
    return { bg: '#ffe6e6', text: '#cc0000' };
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
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '40px'
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
    refreshButton: {
      padding: '12px 24px',
      background: 'white',
      border: '2px solid #e1e8ed',
      borderRadius: '12px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600',
      color: '#667eea',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
    },
    dateCard: {
      background: 'white',
      padding: '24px 32px',
      borderRadius: '16px',
      marginBottom: '40px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
      border: '1px solid rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)'
    },
    dateText: {
      fontSize: '20px',
      fontWeight: '700',
      margin: 0,
      color: '#2d3748',
      letterSpacing: '-0.3px'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '24px',
      marginBottom: '40px'
    },
    statCard: {
      background: 'white',
      padding: '32px 28px',
      borderRadius: '20px',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.4s ease',
      border: '1px solid rgba(255, 255, 255, 0.8)',
      position: 'relative',
      overflow: 'hidden'
    },
    statCardBg: {
      position: 'absolute',
      top: '-20px',
      right: '-20px',
      width: '120px',
      height: '120px',
      opacity: 0.08,
      fontSize: '90px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transform: 'rotate(15deg)'
    },
    statNumber: {
      fontSize: '42px',
      fontWeight: '800',
      marginBottom: '12px',
      lineHeight: 1,
      position: 'relative',
      zIndex: 1,
      letterSpacing: '-1px'
    },
    statLabel: {
      fontSize: '15px',
      color: '#64748b',
      fontWeight: '600',
      position: 'relative',
      zIndex: 1,
      letterSpacing: '0.5px',
      textTransform: 'uppercase'
    },
    card: {
      background: 'white',
      borderRadius: '20px',
      padding: '32px',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
      marginBottom: '40px',
      border: '1px solid rgba(255, 255, 255, 0.8)'
    },
    cardHeader: {
      marginBottom: '32px',
      paddingBottom: '20px',
      borderBottom: '2px solid #f1f5f9'
    },
    cardTitle: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#1e293b',
      margin: 0,
      letterSpacing: '-0.5px'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse'
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
    },
    error: {
      background: 'linear-gradient(135deg, #fee2e2, #fecaca)',
      border: '2px solid #f87171',
      borderRadius: '12px',
      padding: '20px 24px',
      color: '#dc2626',
      marginBottom: '32px',
      fontWeight: '600'
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
        <div style={styles.loaderText}>Loading Dashboard...</div>
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
          
          .stat-card:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 20px 60px rgba(102, 126, 234, 0.2);
          }
          
          .refresh-button:hover {
            background: #667eea !important;
            color: white !important;
            border-color: #667eea !important;
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
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
              <div style={styles.logoIcon}>🚀</div>
              <span>TeamSync Pro</span>
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
        {error && (
          <div style={styles.error}>{error}</div>
        )}

        {!dashboardData ? (
          <div style={styles.error}>No dashboard data available</div>
        ) : (
          <>
            <div style={styles.header}>
              <h2 style={styles.title}>📈 Performance Dashboard</h2>
              <button style={styles.refreshButton} className="refresh-button" onClick={fetchDashboardData}>
                <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                </svg>
                Sync Data
              </button>
            </div>
            
            <div style={styles.dateCard}>
              <h3 style={styles.dateText}>
                📅 {new Date(dashboardData.today_date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </h3>
            </div>

            <div style={styles.statsGrid}>
              <div style={styles.statCard} className="stat-card">
                <div style={{...styles.statCardBg, color: '#667eea'}}>👥</div>
                <div style={{...styles.statNumber, color: '#667eea'}}>
                  {dashboardData.total_employees}
                </div>
                <div style={styles.statLabel}>Team Members</div>
              </div>
              
              <div style={styles.statCard} className="stat-card">
                <div style={{...styles.statCardBg, color: '#10b981'}}>✅</div>
                <div style={{...styles.statNumber, color: '#10b981'}}>
                  {dashboardData.today_present}
                </div>
                <div style={styles.statLabel}>Active Today</div>
              </div>
              
              <div style={styles.statCard} className="stat-card">
                <div style={{...styles.statCardBg, color: '#f59e0b'}}>⚠️</div>
                <div style={{...styles.statNumber, color: '#f59e0b'}}>
                  {dashboardData.today_absent}
                </div>
                <div style={styles.statLabel}>Away Today</div>
              </div>
              
              <div style={styles.statCard} className="stat-card">
                <div style={{...styles.statCardBg, color: '#8b5cf6'}}>📊</div>
                <div style={{...styles.statNumber, color: '#8b5cf6'}}>
                  {dashboardData.total_attendance_records}
                </div>
                <div style={styles.statLabel}>Total Logs</div>
              </div>
            </div>

            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>📈 Team Performance Insights</h3>
              </div>
              
              {dashboardData.employee_stats.length === 0 ? (
                <div style={styles.emptyState}>
                  <h3 style={styles.emptyStateTitle}>🎯 Ready to Track Performance</h3>
                  <p>Begin monitoring team attendance to unlock detailed analytics and insights</p>
                </div>
              ) : (
                <div className="table-container" style={{overflowX: 'auto'}}>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Team Member</th>
                        <th style={styles.th}>Division</th>
                        <th style={styles.th}>Active Days</th>
                        <th style={styles.th}>Total Days</th>
                        <th style={styles.th}>Performance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.employee_stats.map((employee) => {
                        const colors = getAttendanceColor(employee.attendance_percentage);
                        return (
                          <tr key={employee.employee_id}>
                            <td style={styles.td}>
                              <strong style={{color: '#667eea', fontSize: '16px'}}>{employee.employee_id}</strong>
                            </td>
                            <td style={styles.td}>
                              <div style={{fontWeight: '600', fontSize: '15px'}}>{employee.full_name}</div>
                            </td>
                            <td style={styles.td}>
                              <span style={{
                                ...styles.badge,
                                background: 'linear-gradient(135deg, #e0e7ff, #c7d2fe)',
                                color: '#3730a3'
                              }}>
                                {employee.department}
                              </span>
                            </td>
                            <td style={styles.td}>
                              <span style={{
                                ...styles.badge,
                                background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
                                color: '#065f46'
                              }}>
                                {employee.present_days}
                              </span>
                            </td>
                            <td style={styles.td}>
                              <span style={{
                                ...styles.badge,
                                background: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)',
                                color: '#334155'
                              }}>
                                {employee.total_days}
                              </span>
                            </td>
                            <td style={styles.td}>
                              <span style={{
                                ...styles.badge,
                                background: colors.bg,
                                color: colors.text,
                                fontWeight: '700'
                              }}>
                                {employee.attendance_percentage}%
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;