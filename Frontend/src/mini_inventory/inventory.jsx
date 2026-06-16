import { useState, useEffect } from 'react';
import api from '../api/axios';
import ProductList from './inventory_components/Productlist';
import ProductForm from './inventory_components/ProductForm';
import SearchBar from './inventory_components/SearchBar';
import StockChart from './inventory_components/Stockchart';
import CategoryFilter from './inventory_components/CategoryFilter'; // Combined component
import ProjectNavbar from '../components/Projectnavbar';
import { Package, Moon, Sun, Download, Upload } from 'lucide-react';



function InventoryApp({ darkMode: darkModeProp, onToggleTheme }) {
  const [products, setProducts] = useState([]);
   const [categories, setCategories] = useState([]); // Keep setCategories for management
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [showForm, setShowForm] = useState(false);
  const [localDarkMode, setLocalDarkMode] = useState(true);
  const darkMode = typeof darkModeProp === 'boolean' ? darkModeProp : localDarkMode;
  const toggleTheme = onToggleTheme || (() => setLocalDarkMode((prev) => !prev));

  // Load from localStorage
// Fetch categories from Laravel
useEffect(() => {
  api.get('/categories')
    .then(res => setCategories(res.data))
    .catch(err => console.error(err));
}, []);

// Fetch products from Laravel
useEffect(() => {
  api.get('/products')
    .then(res => setProducts(res.data))
    .catch(err => console.error(err));
}, []);


  // CRUD Operations
// ADD product
const addProduct = async (product) => {
  const res = await api.post('/products', product);
  setProducts([...products, res.data]);
  setShowForm(false);
};
// UPDATE product
const updateProduct = async (updated) => {
  const res = await api.put(`/products/${updated.product_id}`, updated);
  setProducts(products.map(p => p.product_id === updated.product_id ? res.data : p));
  setEditingProduct(null);
  setShowForm(false);
};

// DELETE product
const deleteProduct = async (id) => {
  if (window.confirm('Are you sure?')) {
    await api.delete(`/products/${id}`);  
    setProducts(products.filter(p => p.product_id !== id));
  }
};
  // Category Management
// ADD category
const addCategory = async (name) => {
  const res = await api.post('/categories', { category_name: name });
  setCategories([...categories, res.data]);
};

// DELETE category
const deleteCategory = async (category_id) => {
  if (window.confirm('Delete this category?')) {
    await api.delete(`/categories/${category_id}`);
    setCategories(categories.filter(c => c.category_id !== category_id));
  }
};

  // Filter & Sort
  const filteredProducts = products
    .filter(p => {
      const matchesSearch = p.product_name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'All' || p.category?.category_id === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.product_name.localeCompare(b.product_name);
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'quantity') return a.quantity - b.quantity;
      return 0;
    });

  // CSV Export
  const exportCSV = () => {
    const headers = ['Name', 'Category', 'Price', 'Quantity'];
    const rows = products.map(p => [p.product_name, p.category?.category_name ?? 'Uncategorized', p.price, p.quantity]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inventory.csv';
    a.click();
  };

  // CSV Import
  const importCSV = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const lines = text.split('\n').slice(1);
      const imported = lines
        .filter(line => line.trim())
        .map(line => {
          const [name, category, price, quantity] = line.split(',');
          return {
            id: Date.now() + Math.random(),
            name: name.trim(),
            category: category.trim(),
            price: parseFloat(price),
            quantity: parseInt(quantity)
          };
        });
      setProducts([...products, ...imported]);
    };
    reader.readAsText(file);
  };

  const bgColor = darkMode ? '#000000' : '#EFF6FF';
  const cardBg = darkMode ? '#242424' : '#f7f6f6';
  const textColor = darkMode ? '#ffffff' : '#1F2937';
  const textSecondary = darkMode ? '#9CA3AF' : '#6B7280';

  return (
    <div style={{ minHeight: '100vh', background: `linear-gradient(to bottom right, ${darkMode ? '#000000' : '#DBEAFE'}, ${darkMode ? '#000000' : '#C7D2FE'})`, transition: 'all 0.3s' }}>
      <ProjectNavbar title="Mini Inventory System" darkMode={darkMode} onToggleTheme={toggleTheme} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 16px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Package style={{ width: '40px', height: '40px', color: '#4F46E5' }} />
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: textColor, margin: 0 }}>Dashboard</h2>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={exportCSV}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: '#059669', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}
            >
              <Download style={{ width: '16px', height: '16px' }} />
              Export
            </button>
            
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: '#2563EB', color: 'white', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>
              <Upload style={{ width: '16px', height: '16px' }} />
              Import
              <input type="file" accept=".csv" onChange={importCSV} style={{ display: 'none' }} />
            </label>

            <button
              onClick={toggleTheme}
              style={{ padding: '8px', borderRadius: '8px', background: darkMode ? '#374151' : '#E5E7EB', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {darkMode ? <Sun style={{ width: '20px', height: '20px', color: '#FBBF24' }} /> : <Moon style={{ width: '20px', height: '20px', color: '#1F2937' }} />}
            </button>
          </div>
        </div>

        {/* Combined Category Filter + Management - Moved above stats */}
<CategoryFilter
  categories={categories}              // objects na [{category_id, category_name}]
  activeCategory={filterCategory}
  onSelectCategory={setFilterCategory}
  addCategory={addCategory}
  deleteCategory={deleteCategory}
  darkMode={darkMode}
/>

        {/* Stats - Now based on filtered products */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          <div style={{ background: cardBg, borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px' }}>
            <p style={{ color: textSecondary, fontSize: '14px', margin: '0 0 8px 0' }}>
              {filterCategory === 'All' ? 'Total Products' : `${activeCategoryName} Products`}
            </p>
            <p style={{ fontSize: '30px', fontWeight: 'bold', color: '#4F46E5', margin: 0 }}>{filteredProducts.length}</p>
          </div>
          <div style={{ background: cardBg, borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px' }}>
            <p style={{ color: textSecondary, fontSize: '14px', margin: '0 0 8px 0' }}>
             {filterCategory === 'All' ? 'Total Stock'    : `${activeCategoryName} Stock`}
            </p>
            <p style={{ fontSize: '30px', fontWeight: 'bold', color: '#059669', margin: 0 }}>
              {filteredProducts.reduce((sum, p) => sum + p.quantity, 0)}
            </p>
          </div>
          <div style={{ background: cardBg, borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px' }}>
            <p style={{ color: textSecondary, fontSize: '14px', margin: '0 0 8px 0' }}>
              {filterCategory === 'All' ? 'Total Value'    : `${activeCategoryName} Value`}
            </p>
            <p style={{ fontSize: '30px', fontWeight: 'bold', color: '#2563EB', margin: 0 }}>
              ${filteredProducts.reduce((sum, p) => sum + (p.price * p.quantity), 0).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Chart - Now based on filtered products */}
        <StockChart products={filteredProducts} darkMode={darkMode} categoryFilter={filterCategory} />

        {/* Controls */}
        <div style={{ background: cardBg, borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'flex-end' }}>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} darkMode={darkMode} />

            <div style={{ flex: '1', minWidth: '200px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: textColor, marginBottom: '8px' }}>
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', border: `1px solid ${darkMode ? '#4B5563' : '#D1D5DB'}`, borderRadius: '8px', background: darkMode ? '#374151' : 'white', color: textColor, fontSize: '14px' }}
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="quantity">Quantity</option>
              </select>
            </div>

            <button
              onClick={() => { setShowForm(true); setEditingProduct(null); }}
              style={{ padding: '8px 24px', background: '#4F46E5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '500', fontSize: '14px' }}
            >
              Add Product
            </button>
          </div>
                  {/* Product List */}
                  <div style={{ marginTop: '32px' }}>
        <ProductList
          products={filteredProducts}
          onEdit={(p) => { setEditingProduct(p); setShowForm(true); }}
          onDelete={deleteProduct}
          darkMode={darkMode}
        />
        </div>
        </div>



        {/* Form Modal */}
        {showForm && (
          <ProductForm
            product={editingProduct}
            categories={categories}
            onSave={editingProduct ? updateProduct : addProduct}
            onCancel={() => { setShowForm(false); setEditingProduct(null); }}
            darkMode={darkMode}
          />
        )}
      </div>
    </div>
  );
}

export default InventoryApp;