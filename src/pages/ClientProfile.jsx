import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useClient } from '../context/ClientContext';
import { Ruler, Scissors } from 'lucide-react';

const ClientProfile = () => {
  const { id } = useParams();
  const { getClient, getClientProjects } = useClient();
  const client = getClient(id);
  const projects = getClientProjects(id);

  if (!client) return <p>Client not found.</p>;

  return (
    <div>
      <div className="flex-between mb-4">
        <div>
          <h1>{client.name}</h1>
          <p>Age: {client.age} | {client.phone} | {client.address}</p>
        </div>
        <Link to={`/client/${id}/new-project`} className="btn btn-primary">
          <Scissors size={18} /> Draft New Project
        </Link>
      </div>

      <div className="grid-2 mb-4">
        {/* Metrics Box */}
        <div className="glass-panel">
          <h2 className="flex-between">
            Core Metrics <Ruler size={24} style={{ color: 'var(--accent-gold)' }}/>
          </h2>
          <div className="grid-2 mt-3">
            {Object.entries(client.metrics).map(([key, val]) => (
              <div key={key}>
                <label style={{ textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                <div style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--accent-blue)' }}>{val}"</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Postural Notes */}
          <div className="glass-panel">
            <h2>Postural Notes</h2>
            <ul className="mt-2" style={{ listStylePosition: 'inside', color: 'var(--text-secondary)' }}>
              {client.posturalNotes.map((note, i) => <li key={i} className="mb-1">{note}</li>)}
            </ul>
          </div>
          {/* Style Preferences */}
          <div className="glass-panel">
            <h2>Style Preferences</h2>
            <div className="mt-2">
              <p><strong>Neckline Style:</strong> {client.stylePreferences.neckline}</p>
              <p><strong>Hemline:</strong> {client.stylePreferences.hemline}</p>
              <p><strong>Silhouette:</strong> {client.stylePreferences.silhouette}</p>
            </div>
          </div>
        </div>
      </div>

      <h2>Project History</h2>
      <div className="mt-2" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {projects.length === 0 ? (
          <p>No projects yet.</p>
        ) : (
          projects.map(p => (
            <div key={p.id} className="glass-panel">
              <div className="flex-between">
                <h3>{p.name}</h3>
                <span className="badge badge-info">{p.garmentType} - {p.fitType}</span>
              </div>
              <p className="mt-1"><strong>Fabric:</strong> {p.fabric}</p>
              <p className="mt-1"><strong>Date:</strong> {new Date(p.date).toLocaleDateString()}</p>
              
              <h4 className="mt-2" style={{ fontSize: '1rem' }}>Adjustments Made:</h4>
              <ul style={{ listStylePosition: 'inside', color: 'var(--text-muted)' }}>
                {p.adjustments.map((adj, i) => <li key={i}>{adj}</li>)}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ClientProfile;
