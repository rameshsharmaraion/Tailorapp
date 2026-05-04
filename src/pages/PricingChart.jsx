import React from 'react';
import { DollarSign } from 'lucide-react';

const PricingChart = () => {
  const pricingData = [
    { category: 'Saree Blouses', items: [
      { name: 'Basic Cotton Blouse', price: '₹500 - ₹800', notes: 'Simple U/V neck, no lining' },
      { name: 'Designer Silk Blouse', price: '₹1,500 - ₹3,000', notes: 'Princess cut, with lining, piping' },
      { name: 'Bridal Maggam Work Blouse', price: '₹5,000+', notes: 'Heavy hand embroidery, zardosi' },
      { name: 'Padded Blouse', price: '₹1,200 - ₹2,000', notes: 'Includes premium cups and lining' }
    ]},
    { category: 'Kurtis & Suits', items: [
      { name: 'Simple Kurti', price: '₹600 - ₹1,000', notes: 'Cotton/Rayon, straight cut' },
      { name: 'Salwar Kameez / Patiala', price: '₹1,200 - ₹2,000', notes: 'Includes bottom and top stitching' },
      { name: 'Anarkali Suit', price: '₹2,500 - ₹4,500', notes: 'Multiple kalis, heavy flare, with lining' }
    ]},
    { category: 'Lehengas & Indo-Western', items: [
      { name: 'Simple Lehenga Choli', price: '₹3,000 - ₹6,000', notes: 'Basic flare, standard blouse' },
      { name: 'Bridal Lehenga', price: '₹15,000+', notes: 'Custom can-can, intricate detailing, latkans' },
      { name: 'Indo-Western Gown', price: '₹4,000 - ₹8,000', notes: 'Draped styles, pre-pleated' }
    ]}
  ];

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <h1 className="mb-4 flex-between">
        Pricing Chart <DollarSign size={32} style={{ color: 'var(--accent-gold)' }} />
      </h1>
      
      <p className="mb-4" style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
        Estimated baseline pricing for Indian bespoke garments in INR (₹). Final prices vary based on fabric choice and embroidery work.
      </p>

      {pricingData.map((section, idx) => (
        <div key={idx} className="glass-panel mb-4 animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
          <h2 style={{ color: 'var(--accent-gold)', borderBottom: '1px solid var(--border-glass)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
            {section.category}
          </h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.5rem' }}>Garment</th>
                <th style={{ padding: '0.5rem' }}>Starting Price</th>
                <th style={{ padding: '0.5rem' }}>Notes</th>
              </tr>
            </thead>
            <tbody>
              {section.items.map((item, i) => (
                <tr key={i} style={{ borderBottom: i !== section.items.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  <td style={{ padding: '0.75rem 0.5rem', fontWeight: '500' }}>{item.name}</td>
                  <td style={{ padding: '0.75rem 0.5rem', color: 'var(--accent-blue)', fontWeight: '600' }}>{item.price}</td>
                  <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-secondary)' }}>{item.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default PricingChart;
