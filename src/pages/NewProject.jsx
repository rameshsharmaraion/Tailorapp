import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useClient } from '../context/ClientContext';
import { tailorEngine } from '../logic/tailorEngine';
import { Calculator } from 'lucide-react';

const NewProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getClient, addProject } = useClient();
  const client = getClient(id);

  const [formData, setFormData] = useState({
    name: 'Bespoke Dress Draft',
    garmentType: 'Dress',
    fitType: 'Standard Fit',
    fabric: ''
  });

  const [drafted, setDrafted] = useState(null);

  if (!client) return <p>Client not found.</p>;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const calculateDraft = (e) => {
    e.preventDefault();
    const result = tailorEngine.calculateDraftingDimensions(client.metrics, formData.garmentType, formData.fitType);
    setDrafted(result);
  };

  const handleSave = () => {
    addProject({
      clientId: id,
      name: formData.name,
      garmentType: formData.garmentType,
      fitType: formData.fitType,
      fabric: formData.fabric,
      adjustments: ['Calculated via engine'] // Mock starting adjustments
    });
    navigate(`/client/${id}`);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 className="mb-4">Draft New Project for {client.name}</h1>

      <div className="grid-2">
        <form className="glass-panel" onSubmit={calculateDraft}>
          <h2 className="mb-3">Project Details</h2>
          
          <div className="input-group">
            <label>Project Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Garment Type</label>
            <select name="garmentType" value={formData.garmentType} onChange={handleChange}>
              <option>Dress</option><option>Blouse</option><option>Skirt</option><option>Women's Suit</option><option>Gown</option>
            </select>
          </div>

          <div className="input-group">
            <label>Fit Type</label>
            <select name="fitType" value={formData.fitType} onChange={handleChange}>
              <option>Bodycon Fit</option><option>Standard Fit</option><option>Loose Flowy</option>
            </select>
          </div>

          <div className="input-group">
            <label>Fabric / Material</label>
            <input type="text" name="fabric" value={formData.fabric} onChange={handleChange} placeholder="e.g. 10oz Navy Worsted" required />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            <Calculator size={18} /> Calculate Drafting Dimensions
          </button>
        </form>

        {drafted && (
          <div className="glass-panel animate-fade-in" style={{ border: '1px solid var(--accent-gold)' }}>
            <h2 className="mb-3" style={{ color: 'var(--accent-gold)' }}>Generated Blueprint</h2>
            
            <div className="mb-3">
              <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>Ease Allowances Applied</h3>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <span className="badge badge-info">Bust: +{drafted.easeApplied.bust}"</span>
                <span className="badge badge-info">Waist: +{drafted.easeApplied.waist}"</span>
                <span className="badge badge-info">Hip: +{drafted.easeApplied.hip}"</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div className="flex-between" style={{ paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-glass)' }}>
                <span>Drafted Bust</span> <strong>{drafted.draftedBust}"</strong>
              </div>
              <div className="flex-between" style={{ paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-glass)' }}>
                <span>Drafted Waist</span> <strong>{drafted.draftedWaist}"</strong>
              </div>
              <div className="flex-between" style={{ paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-glass)' }}>
                <span>Drafted Hip</span> <strong>{drafted.draftedHip}"</strong>
              </div>
              <div className="flex-between" style={{ paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-glass)' }}>
                <span>Armhole Depth</span> <strong style={{ color: 'var(--accent-blue)' }}>{drafted.armholeDepth}"</strong>
              </div>
              <div className="flex-between" style={{ paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-glass)' }}>
                <span>Half Back Width</span> <strong style={{ color: 'var(--accent-blue)' }}>{drafted.halfBack}"</strong>
              </div>
            </div>

            <button className="btn btn-outline mt-4" style={{ width: '100%' }} onClick={handleSave}>
              Save to Ledger
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewProject;
