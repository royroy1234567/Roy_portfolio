import { ArrowLeft, Home, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createTheme } from '../theme';

export default function ProjectNavbar({ title, darkMode = false, onToggleTheme }) {
  const navigate = useNavigate();
  const theme = createTheme(darkMode);

  return (
    <nav
      style={{
        background: theme.pageAlt,
        borderBottom: `1px solid ${theme.border}`,
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Left - Back Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>

        {/* Project Title */}
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: theme.text, margin: 0 }}>
          {title}
        </h1>
      </div>

      {/* Right - Home Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          onClick={onToggleTheme}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: `1px solid ${theme.border}`,
            background: theme.surfaceAlt,
            color: theme.text,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          {darkMode ? <Sun style={{ width: '18px', height: '18px', color: theme.accent }} /> : <Moon style={{ width: '18px', height: '18px', color: theme.accent }} />}
        </button>

        <button
          onClick={() => navigate('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            background: theme.accent,
            color: theme.accentText,
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = theme.accentHover;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = theme.accent;
          }}
        >
          <Home style={{ width: '18px', height: '18px' }} />
          Home
        </button>
      </div>
    </nav>
  );
}