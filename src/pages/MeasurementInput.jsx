import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useClient } from '../context/ClientContext';
import { Info } from 'lucide-react';

const MeasurementInput = () => {
  const { id } = useParams();
  const { addClient, getClient, updateClient } = useClient();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '', age: '', phone: '', address: '',
    backLength: '', frontLength: '', apexPoint: '', beltLength: '', chest: '', bust: '', waist: '',
    shoulder: '', frontNeckDepth: '', backNeckDepth: '', armholeCircumference: '', sleeveLength: '', sleeveRound: '',
    posturalNotes: '', neckline: 'V-Neck', hemline: 'Knee-length', silhouette: 'A-Line'
  });

  useEffect(() => {
    if (id) {
      const client = getClient(id);
      if (client) {
        setFormData({
          name: client.name, age: client.age, phone: client.phone, address: client.address,
          ...client.metrics,
          posturalNotes: client.posturalNotes.join(', '),
          ...client.stylePreferences
        });
      }
    }
  }, [id, getClient]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const clientData = {
      name: formData.name, age: formData.age, phone: formData.phone, address: formData.address,
      metrics: {
        backLength: parseFloat(formData.backLength), frontLength: parseFloat(formData.frontLength), apexPoint: parseFloat(formData.apexPoint),
        beltLength: parseFloat(formData.beltLength), chest: parseFloat(formData.chest), bust: parseFloat(formData.bust), waist: parseFloat(formData.waist),
        shoulder: parseFloat(formData.shoulder), frontNeckDepth: parseFloat(formData.frontNeckDepth), backNeckDepth: parseFloat(formData.backNeckDepth),
        armholeCircumference: parseFloat(formData.armholeCircumference), sleeveLength: parseFloat(formData.sleeveLength), sleeveRound: parseFloat(formData.sleeveRound)
      },
      posturalNotes: formData.posturalNotes.split(',').map(n => n.trim()).filter(n => n),
      stylePreferences: {
        neckline: formData.neckline, hemline: formData.hemline, silhouette: formData.silhouette
      }
    };
    if (id) {
      updateClient(id, clientData);
      navigate(`/client/${id}`);
    } else {
      addClient(clientData);
      navigate('/');
    }
  };

  const measureGuides = {
    apexPoint: "Measure from the shoulder down to the apex (highest point) of the bust.",
    beltLength: "Typically the length of the cross patti / belt below the bust.",
    chest: "Measure tightly above the bust (upper chest).",
    bust: "Measure around the fullest part of the bust.",
    armholeCircumference: "Measure around the arm joint, over the shoulder."
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 className="mb-4">{id ? 'Edit Client Profile' : 'New Client Intake'}</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="glass-panel mb-4">
          <h2>Basic Information</h2>
          <div className="grid-2 mt-2">
            <div className="input-group">
              <label>Full Name</label>
              <input type="text" name="name" required onChange={handleChange} value={formData.name} />
            </div>
            <div className="input-group">
              <label>Age</label>
              <input type="number" name="age" required onChange={handleChange} value={formData.age} />
            </div>
            <div className="input-group">
              <label>Phone Number</label>
              <input type="tel" name="phone" required onChange={handleChange} value={formData.phone} />
            </div>
            <div className="input-group">
              <label>Address</label>
              <input type="text" name="address" required onChange={handleChange} value={formData.address} />
            </div>
          </div>
        </div>

        <div className="glass-panel mb-4">
          <h2>Core Metrics (inches)</h2>
          <p className="mb-3">Ensure measuring tape is parallel to the floor for girth measurements.</p>
          <div className="grid-2">
            {['backLength', 'frontLength', 'apexPoint', 'beltLength', 'chest', 'bust', 'waist', 'shoulder', 'frontNeckDepth', 'backNeckDepth', 'armholeCircumference', 'sleeveLength', 'sleeveRound'].map(metric => (
              <div className="input-group" key={metric}>
                <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ textTransform: 'capitalize' }}>{metric.replace(/([A-Z])/g, ' $1').trim()}</span>
                  {measureGuides[metric] && (
                    <span title={measureGuides[metric]} style={{ color: 'var(--accent-gold)', cursor: 'help' }}><Info size={16} /></span>
                  )}
                </label>
                <input type="number" step="0.1" name={metric} required onChange={handleChange} value={formData[metric]} />
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel mb-4">
          <h2>Postural Notes & Style</h2>
          <div className="input-group">
            <label>Postural Notes (comma separated)</label>
            <input type="text" name="posturalNotes" placeholder="e.g. Sloping shoulders, forward head" onChange={handleChange} value={formData.posturalNotes} />
          </div>
          <div className="grid-3 mt-2">
            <div className="input-group">
              <label>Neckline Style</label>
              <select name="neckline" onChange={handleChange} value={formData.neckline}>
                <option>V-Neck</option><option>Scoop</option><option>Boat Neck</option><option>High Neck</option>
              </select>
            </div>
            <div className="input-group">
              <label>Hemline</label>
              <select name="hemline" onChange={handleChange} value={formData.hemline}>
                <option>Mini</option><option>Knee-length</option><option>Midi</option><option>Maxi</option>
              </select>
            </div>
            <div className="input-group">
              <label>Silhouette</label>
              <select name="silhouette" onChange={handleChange} value={formData.silhouette}>
                <option>A-Line</option><option>Bodycon</option><option>Shift</option><option>Flowy</option>
              </select>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <button type="submit" className="btn btn-primary">{id ? 'Update Client' : 'Save Client Profile'}</button>
        </div>
      </form>
    </div>
  );
};

export default MeasurementInput;
