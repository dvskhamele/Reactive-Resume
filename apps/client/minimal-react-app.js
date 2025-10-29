// Minimal React app entry point
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// Create a simple app component
function App() {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);
  const [resumes, setResumes] = React.useState([]);

  React.useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
      
      // Load user and resumes from localStorage
      const data = localStorage.getItem('signimus-resume-data');
      if (data) {
        const parsed = JSON.parse(data);
        setUser(parsed.user);
        setResumes(parsed.resumes);
      }
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        flexDirection: 'column'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '4px solid rgba(0, 0, 0, 0.1)',
          borderTopColor: '#22c55e',
          animation: 'spin 1s linear infinite',
          marginBottom: '20px'
        }}></div>
        <h1>Signimus Resume Creator</h1>
        <p>Loading application...</p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <h1>Signimus Resume Creator</h1>
        <div>
          {user ? (
            <span>Welcome, {user.name}</span>
          ) : (
            <button style={{
              padding: '10px 20px',
              backgroundColor: '#22c55e',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              Sign In
            </button>
          )}
        </div>
      </header>

      <main>
        <h2>Your Resumes</h2>
        {resumes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>You don't have any resumes yet.</p>
            <button style={{
              padding: '12px 24px',
              backgroundColor: '#22c55e',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}>
              Create Your First Resume
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {resumes.map(resume => (
              <div key={resume.id} style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '20px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <h3>{resume.name}</h3>
                <p>Created: {new Date(resume.createdAt).toLocaleDateString()}</p>
                <div style={{ marginTop: '15px' }}>
                  <button style={{
                    marginRight: '10px',
                    padding: '8px 16px',
                    backgroundColor: '#22c55e',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}>
                    Edit
                  </button>
                  <button style={{
                    padding: '8px 16px',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);