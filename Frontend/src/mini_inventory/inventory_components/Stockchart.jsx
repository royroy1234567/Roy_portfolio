import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function StockChart({ products, darkMode, categoryFilter = 'All' }) {
  if (products.length === 0) {
    const cardBg = darkMode ? '#242424' : '#ffffff';
    const textColor = darkMode ? '#9CA3AF' : '#6B7280';
    
    return (
      <div style={{ background: cardBg, borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px', marginBottom: '32px', textAlign: 'center' }}>
        <p style={{ color: textColor, fontSize: '14px', margin: 0 }}>
          {categoryFilter === 'All' 
            ? 'No products to display' 
            : `No ${categoryFilter} products found`}
        </p>
      </div>
    );
  }

  const cardBg = darkMode ? '#1F2937' : '#ffffff';

  const data = {
    labels: products.map(p => p.product_name.length > 15 ? p.product_name.substring(0, 15) + '...' : p.product_name),
    datasets: [
      {
        label: 'Stock Quantity',
        data: products.map(p => p.quantity),
        backgroundColor: darkMode ? 'rgba(99, 102, 241, 0.8)' : 'rgba(79, 70, 229, 0.8)',
        borderColor: darkMode ? 'rgba(99, 102, 241, 1)' : 'rgba(79, 70, 229, 1)',
        borderWidth: 2,
      }
    ]
  };

  // Dynamic title based on filter
  const chartTitle = categoryFilter === 'All' 
    ? 'Stock Overview - All Products' 
    : `Stock Overview - ${categoryFilter}`;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: darkMode ? '#fff' : '#374151',
          font: { size: 14 }
        }
      },
      title: {
        display: true,
        text: chartTitle,
        color: darkMode ? '#fff' : '#374151',
        font: { size: 18, weight: 'bold' }
      },
      tooltip: {
        callbacks: {
          label: (context) => `Stock: ${context.parsed.y} units`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: darkMode ? '#9ca3af' : '#6b7280',
          stepSize: 1
        },
        grid: {
          color: darkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(209, 213, 219, 0.3)'
        }
      },
      x: {
        ticks: {
          color: darkMode ? '#9ca3af' : '#6b7280',
          maxRotation: 45,
          minRotation: 45
        },
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div style={{ background: cardBg, borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px', marginBottom: '32px' }}>
      <div style={{ height: '300px' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}