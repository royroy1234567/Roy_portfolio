import { Search } from 'lucide-react';

export default function SearchBar({ searchTerm, setSearchTerm, darkMode }) {
  const textColor = darkMode ? '#ffffff' : '#1F2937';
  const inputBg = darkMode ? '#374151' : '#ffffff';
  const borderColor = darkMode ? '#4B5563' : '#D1D5DB';

  return (
    <div style={{ flex: '1', minWidth: '250px' }}>
      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: textColor, marginBottom: '8px' }}>
        Search Products
      </label>
      <div style={{ position: 'relative' }}>
        <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '20px', height: '20px', color: '#9CA3AF' }} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name..."
          style={{
            width: '100%',
            paddingLeft: '40px',
            paddingRight: '16px',
            paddingTop: '8px',
            paddingBottom: '8px',
            border: `1px solid ${borderColor}`,
            borderRadius: '8px',
            background: inputBg,
            color: textColor,
            fontSize: '14px',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />
      </div>
    </div>
  );
}