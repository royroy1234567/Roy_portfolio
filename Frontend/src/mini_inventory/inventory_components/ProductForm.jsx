import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function ProductForm({ product, categories, onSave, onCancel, darkMode }) {
  const [formData, setFormData] = useState({
    name: '',
    category: categories[0],
    price: '',
    quantity: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Price must be positive';
    if (!formData.quantity || formData.quantity < 0) newErrors.quantity = 'Quantity must be non-negative';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave({
        ...formData,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity)
      });
    }
  };

  const modalBg = darkMode ? '#1F2937' : '#ffffff';
  const textColor = darkMode ? '#ffffff' : '#1F2937';
  const inputBg = darkMode ? '#374151' : '#ffffff';
  const borderColor = darkMode ? '#4B5563' : '#D1D5DB';

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', zIndex: 1000 }}>
      <div style={{ background: modalBg, borderRadius: '8px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', maxWidth: '500px', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px', borderBottom: `1px solid ${borderColor}` }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: textColor, margin: 0 }}>
            {product ? 'Edit Product' : 'Add Product'}
          </h2>
          <button onClick={onCancel} style={{ background: 'none', border: 'none', cursor: 'pointer', color: darkMode ? '#9CA3AF' : '#6B7280' }}>
            <X style={{ width: '24px', height: '24px' }} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: textColor, marginBottom: '8px' }}>
              Product Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: `1px solid ${errors.name ? '#DC2626' : borderColor}`,
                borderRadius: '8px',
                background: inputBg,
                color: textColor,
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              placeholder="Enter product name"
            />
            {errors.name && <p style={{ color: '#DC2626', fontSize: '14px', marginTop: '4px' }}>{errors.name}</p>}
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: textColor, marginBottom: '8px' }}>
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: `1px solid ${borderColor}`,
                borderRadius: '8px',
                background: inputBg,
                color: textColor,
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: textColor, marginBottom: '8px' }}>
              Price ($) *
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: `1px solid ${errors.price ? '#DC2626' : borderColor}`,
                borderRadius: '8px',
                background: inputBg,
                color: textColor,
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              placeholder="0.00"
            />
            {errors.price && <p style={{ color: '#DC2626', fontSize: '14px', marginTop: '4px' }}>{errors.price}</p>}
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: textColor, marginBottom: '8px' }}>
              Quantity in Stock *
            </label>
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: `1px solid ${errors.quantity ? '#DC2626' : borderColor}`,
                borderRadius: '8px',
                background: inputBg,
                color: textColor,
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              placeholder="0"
            />
            {errors.quantity && <p style={{ color: '#DC2626', fontSize: '14px', marginTop: '4px' }}>{errors.quantity}</p>}
          </div>

          <div style={{ display: 'flex', gap: '12px', paddingTop: '16px' }}>
            <button
              type="submit"
              style={{
                flex: 1,
                background: '#4F46E5',
                color: 'white',
                padding: '10px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '14px'
              }}
            >
              {product ? 'Update' : 'Add'} Product
            </button>
            <button
              type="button"
              onClick={onCancel}
              style={{
                flex: 1,
                background: darkMode ? '#374151' : '#E5E7EB',
                color: textColor,
                padding: '10px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '14px'
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}