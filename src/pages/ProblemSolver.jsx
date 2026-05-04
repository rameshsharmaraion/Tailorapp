import React, { useState } from 'react';
import { useClient } from '../context/ClientContext';
import { tailorEngine } from '../logic/tailorEngine';
import { Stethoscope, AlertTriangle, Lightbulb } from 'lucide-react';

const ProblemSolver = () => {
  const { clients } = useClient();
  const [clientId, setClientId] = useState('');
  const [issue, setIssue] = useState('');
  const [diagnosis, setDiagnosis] = useState(null);

  const handleSolve = () => {
    if (!issue) return;
    const client = clients.find(c => c.id === clientId);
    const notes = client ? client.posturalNotes : [];
    
    const results = tailorEngine.solveFitIssue(issue, notes);
    setDiagnosis(results);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 className="mb-4 flex-between">
        Diagnostic Problem-Solver <Stethoscope size={32} style={{ color: 'var(--accent-gold)' }}/>
      </h1>
      
      <div className="glass-panel mb-4">
        <p className="mb-3">Enter a fit issue to receive pattern adjustment advice tailored to the client's postural notes.</p>
        
        <div className="input-group">
          <label>Select Client (Optional - to pull postural context)</label>
          <select value={clientId} onChange={(e) => setClientId(e.target.value)}>
            <option value="">General Diagnosis (No specific client)</option>
            {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        <div className="input-group">
          <label>Describe the Fit Issue</label>
          <textarea 
            rows={4} 
            placeholder="e.g. horizontal wrinkles at the back neck..."
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
          ></textarea>
        </div>

        <button className="btn btn-primary" onClick={handleSolve}>Run Diagnosis</button>
      </div>

      {diagnosis && (
        <div className="glass-panel animate-fade-in" style={{ borderLeft: '4px solid var(--accent-gold)' }}>
          <h2 className="mb-3">Diagnosis Report</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {diagnosis.map((text, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                {text.startsWith('Issue:') ? <AlertTriangle size={20} style={{ color: 'var(--accent-danger)', flexShrink: 0 }} /> : 
                 <Lightbulb size={20} style={{ color: 'var(--accent-blue)', flexShrink: 0 }} />}
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProblemSolver;
