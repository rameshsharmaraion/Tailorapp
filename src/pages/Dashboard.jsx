import React from 'react';
import { Link } from 'react-router-dom';
import { useClient } from '../context/ClientContext';
import { Search, ChevronRight } from 'lucide-react';

const Dashboard = () => {
  const { clients } = useClient();
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.phone && c.phone.includes(searchTerm)) ||
    (c.address && c.address.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      <div className="flex-between mb-4">
        <h1>Client Ledger</h1>
        <Link to="/new-client" className="btn btn-primary">Add New Client</Link>
      </div>
      
      <div className="glass-panel mb-4">
        <div className="input-group" style={{ marginBottom: 0 }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', top: '14px', left: '14px', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search clients by name, phone, or address..." 
              style={{ paddingLeft: '2.5rem' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid-3">
        {filteredClients.map(client => (
          <div key={client.id} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <h3>{client.name}</h3>
              <p style={{ fontSize: '0.875rem' }}>{client.phone}</p>
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {client.posturalNotes.slice(0, 2).map((note, i) => (
                <span key={i} className="badge badge-warning">{note}</span>
              ))}
            </div>

            <Link to={`/client/${client.id}`} className="btn btn-outline" style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between' }}>
              View Profile <ChevronRight size={18} />
            </Link>
          </div>
        ))}
        {filteredClients.length === 0 && (
          <p>No clients found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
