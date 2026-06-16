import { useState } from 'react';
import { Tag, Filter, Plus, X, Settings } from 'lucide-react';

export default function CategoryFilter({ 
  categories, 
  activeCategory, 
  onSelectCategory, 
  addCategory, 
  deleteCategory, 
  darkMode 
}) {
  const [newCategory, setNewCategory] = useState('');
  const [showManagement, setShowManagement] = useState(false);

  const handleAdd = () => {
    if (newCategory.trim()) {
      addCategory(newCategory.trim());
      setNewCategory('');
    }
  };

  const cardBg = darkMode ? '#242424' : '#ffffff';
  const textColor = darkMode ? '#ffffff' : '#1F2937';
  const inputBg = darkMode ? '#374151' : '#ffffff';
  const borderColor = darkMode ? '#4B5563' : '#D1D5DB';

  return (
    <div style={{ background: cardBg, borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px', marginBottom: '32px' }}>
      {/* Header with toggle */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter style={{ width: '20px', height: '20px', color: '#4F46E5' }} />
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: textColor, margin: 0 }}>
            {showManagement ? 'Manage Categories' : 'Filter by Category'}
          </h3>
        </div>

        {/* Toggle Management Mode */}
        <button
          onClick={() => setShowManagement(!showManagement)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            background: showManagement ? '#4F46E5' : (darkMode ? '#374151' : '#F3F4F6'),
            color: showManagement ? '#ffffff' : textColor,
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '500',
            transition: 'all 0.2s',
          }}
        >
          <Settings style={{ width: '16px', height: '16px' }} />
          {showManagement ? 'Done' : 'Manage'}
        </button>
      </div>

      {/* Add New Category (only in management mode) */}
      {showManagement && (
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="New category name"
            style={{
              flex: '1',
              minWidth: '200px',
              padding: '8px 12px',
              border: `1px solid ${borderColor}`,
              borderRadius: '8px',
              background: inputBg,
              color: textColor,
              fontSize: '14px',
              outline: 'none',
            }}
            autoFocus
          />
          <button
            onClick={handleAdd}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              background: '#059669',
              color: 'white',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            <Plus style={{ width: '16px', height: '16px' }} />
            Add
          </button>
        </div>
      )}

      {/* Filter/Management Buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {/* All categories button (only show in filter mode) */}
        {!showManagement && (
          <button
            onClick={() => onSelectCategory('All')}
            style={{
              padding: '8px 16px',
              background: activeCategory === 'All' 
                ? '#4F46E5' 
                : darkMode ? '#374151' : '#F3F4F6',
              color: activeCategory === 'All' 
                ? '#ffffff' 
                : textColor,
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: activeCategory === 'All' ? '600' : '500',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (activeCategory !== 'All') {
                e.currentTarget.style.background = darkMode ? '#4B5563' : '#E5E7EB';
              }
            }}
            onMouseLeave={(e) => {
              if (activeCategory !== 'All') {
                e.currentTarget.style.background = darkMode ? '#374151' : '#F3F4F6';
              }
            }}
          >
            All
          </button>
        )}

        {/* Category buttons */}
{categories.map(cat => (
  <div key={cat.category_id}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: showManagement ? '4px' : '6px',
      padding: '8px 12px',
      background: !showManagement && activeCategory === cat.category_id  // ✅ was inconsistent
        ? '#4F46E5' 
        : darkMode ? '#374151' : '#F3F4F6',
      color: !showManagement && activeCategory === cat.category_id       // ✅ was comparing to `cat` (object)
        ? '#ffffff' 
        : textColor,
      borderRadius: '8px',
      cursor: showManagement ? 'default' : 'pointer',
      fontSize: '14px',
      fontWeight: !showManagement && activeCategory === cat.category_id  // ✅ same fix
        ? '600' : '500',
      transition: 'all 0.2s',
    }}
    onClick={() => !showManagement && onSelectCategory(cat.category_id)}
    onMouseEnter={(e) => {
      if (!showManagement && activeCategory !== cat.category_id) {       // ✅ was comparing to `cat`
        e.currentTarget.style.background = darkMode ? '#4B5563' : '#E5E7EB';
      }
    }}
    onMouseLeave={(e) => {
      if (!showManagement && activeCategory !== cat.category_id) {       // ✅ same fix
        e.currentTarget.style.background = darkMode ? '#374151' : '#F3F4F6';
      }
    }}
  >
 {!showManagement && <Tag style={{ width: '14px', height: '14px' }} />}
    <span>{cat.category_name}</span>
    
    {showManagement && !cat.is_default && (
      <button onClick={() => deleteCategory(cat.category_id)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '2px',
          display: 'flex',
          alignItems: 'center',
          color: darkMode ? '#EF4444' : '#DC2626',
          marginLeft: '4px',
        }}
      >
        <X style={{ width: '16px', height: '16px' }} />
      </button>
    )}
  </div>
))}
      </div>

      {/* Active filter indicator (only in filter mode) */}
      {!showManagement && activeCategory !== 'All' && (
        <div style={{ 
          marginTop: '12px', 
          padding: '8px 12px', 
          background: darkMode ? 'rgba(79, 70, 229, 0.1)' : 'rgba(79, 70, 229, 0.05)',
          borderRadius: '6px',
          borderLeft: '3px solid #4F46E5'
        }}>
          <p style={{ 
            color: darkMode ? '#A5B4FC' : '#4F46E5', 
            fontSize: '13px', 
            margin: 0,
            fontWeight: '500'
          }}>
            Showing: {categories.find(c => c.category_id === activeCategory)?.category_name} products only
          </p>
        </div>
      )}

      {/* Management mode hint */}
      {showManagement && (
        <div style={{ 
          marginTop: '12px', 
          padding: '8px 12px', 
          background: darkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)',
          borderRadius: '6px',
          borderLeft: '3px solid #3B82F6'
        }}>
          <p style={{ 
            color: darkMode ? '#93C5FD' : '#2563EB', 
            fontSize: '12px', 
            margin: 0
          }}>
            💡 Default categories cannot be deleted. Click Done when finished.
          </p>
        </div>
      )}
    </div>
  );
}