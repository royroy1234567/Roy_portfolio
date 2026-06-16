import { Edit2, Trash2, Package } from 'lucide-react';

export default function ProductList({ products, onEdit, onDelete, darkMode }) {
  const cardBg = darkMode ? '#1F2937' : '#ffffff';
  const textColor = darkMode ? '#ffffff' : '#1F2937';
  const textSecondary = darkMode ? '#9CA3AF' : '#6B7280';

  if (products.length === 0) {
    return (
      <div style={{ background: cardBg, borderRadius: '8px', boxShadow: '0 10px 10px rgba(0,0,0,0.1)', padding: '48px', textAlign: 'center' }}>
        <Package style={{ width: '64px', height: '64px', color: '#9CA3AF', margin: '0 auto 16px' }} />
        <p style={{ color: textSecondary, fontSize: '18px', margin: '0 0 8px 0' }}>No products found</p>
        <p style={{ color: textSecondary, fontSize: '14px', margin: 0 }}>Add your first product to get started</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
      {products.map(product => (
        <div
          key={product.product_id}
          style={{
            background: cardBg,
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            transition: 'box-shadow 0.3s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.2)'}
          onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)'}
        >
          <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: textColor, margin: '0 0 8px 0' }}>
                  {product.product_name}
                </h3>
                <span style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  background: darkMode ? '#312E81' : '#E0E7FF',
                  color: darkMode ? '#A5B4FC' : '#4F46E5',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  {product.category?.category_name ?? 'Uncategorized'}
                </span>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ color: textSecondary, fontSize: '14px' }}>Price</span>
                <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#059669' }}>
                  ${Number(product.price).toFixed(2)}
                </span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ color: textSecondary, fontSize: '14px' }}>Stock</span>
                <span style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: product.quantity === 0 ? '#DC2626' : product.quantity < 10 ? '#D97706' : '#2563EB'
                }}>
                  {product.quantity} {product.quantity === 1 ? 'unit' : 'units'}
                </span>
              </div>

              <div style={{ paddingTop: '12px', borderTop: `1px solid ${darkMode ? '#374151' : '#E5E7EB'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: textSecondary, fontSize: '14px' }}>Total Value</span>
                  <span style={{ fontSize: '18px', fontWeight: '600', color: textColor }}>
                    ${(Number(product.price) * product.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => onEdit(product)}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  background: '#2563EB',
                  color: 'white',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                <Edit2 style={{ width: '16px', height: '16px' }} />
                Edit
              </button>
              <button
                onClick={() => onDelete(product.product_id)}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  background: '#DC2626',
                  color: 'white',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                <Trash2 style={{ width: '16px', height: '16px' }} />
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}