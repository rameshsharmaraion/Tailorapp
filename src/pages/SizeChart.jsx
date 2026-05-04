import React from 'react';
import { Table } from 'lucide-react';

const SizeChart = () => {
  const sizes = ["32\"", "34\"", "36\"", "38\"", "40\"", "42\"", "44\""];
  const rows = [
    { label: "BACK LENGTH", data: ["13\"", "13.5\"", "14\"", "14.5\"", "15\"", "15\"", "15.5\""] },
    { label: "FRONT LENGTH", data: ["11.5\"", "12\"", "12.5\"", "13\"", "13.5\"", "14\"", "14.5\""] },
    { label: "APEX POINT", data: ["9\"", "9.5\"", "10\"", "10.5\"", "11\"", "11.5\"", "12\""] },
    { label: "BELT LENGTH", data: ["2.5\"", "2.5\"", "2.5\"", "2.5\"", "2.5\"", "2.25\"", "2.25\""] },
    { label: "CHEST", data: ["32\"", "34\"", "36\"", "38\"", "40\"", "42\"", "44\""] },
    { label: "BUST", data: ["34\"", "36\"", "38\"", "40\"", "42\"", "44\"", "46\""] },
    { label: "WAIST", data: ["27\"", "29\"", "31\"", "33\"", "35\"", "37\"", "39\""] },
    { label: "SHOULDER", data: ["13\"", "13.5\"", "14\"", "14.5\"", "15\"", "16\"", "16.5\""] },
    { label: "FRONT NECK DEPTH", data: ["6\"", "6.5\"", "7\"", "7\"", "7.5\"", "7.5\"", "8\""] },
    { label: "BACK NECK DEPTH", data: ["8\"", "8\"", "8.5\"", "8.5\"", "9\"", "9\"", "9.5\""] },
    { label: "ARM HOLE CIRCUMFERENCE", data: ["14\"", "15\"", "16\"", "17\"", "18\"", "19\"", "20\""] },
    { label: "SLEEVE LENGTH", data: ["4\"", "5\"", "5.5\"", "6\"", "6.5\"", "7\"", "7.5\""] },
    { label: "SLEEVE ROUND", data: ["11.5\"", "12\"", "12.5\"", "13\"", "13.5\"", "14\"", "14.5\""] }
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <h1 className="mb-4 flex-between">
        Standard Blouse Size Chart <Table size={32} style={{ color: 'var(--accent-gold)' }} />
      </h1>
      <div className="glass-panel" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', minWidth: '800px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--accent-gold)' }}>
              <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--accent-gold)' }}>MEASUREMENT</th>
              {sizes.map(size => <th key={size} style={{ padding: '1rem', color: 'var(--text-primary)' }}>{size}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid var(--border-glass)' }}>
                <td style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '500', color: 'var(--text-secondary)' }}>{row.label}</td>
                {row.data.map((val, i) => <td key={i} style={{ padding: '0.75rem' }}>{val}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SizeChart;
