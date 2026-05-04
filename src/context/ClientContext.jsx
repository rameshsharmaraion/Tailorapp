import React, { createContext, useContext, useState, useEffect } from 'react';

const ClientContext = createContext();

export const useClient = () => useContext(ClientContext);

export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState(() => {
    const saved = localStorage.getItem('tailor_clients');
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        name: 'Priyanka Chopra',
        age: 35,
        phone: '+91 98765 43210',
        address: 'Bandra West, Mumbai',
        metrics: {
          backLength: 13.5,
          frontLength: 12,
          apexPoint: 9.5,
          beltLength: 2.5,
          chest: 34,
          bust: 36,
          waist: 29,
          shoulder: 13.5,
          frontNeckDepth: 6.5,
          backNeckDepth: 8,
          armholeCircumference: 15,
          sleeveLength: 5,
          sleeveRound: 12
        },
        posturalNotes: ['Slightly sloping shoulders'],
        stylePreferences: {
          neckline: 'Sweetheart',
          hemline: 'N/A',
          silhouette: 'Princess Cut'
        }
      }
    ];
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('tailor_projects');
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        clientId: '1',
        name: 'Bridal Maggam Blouse',
        garmentType: 'Blouse',
        fitType: 'Bodycon Fit',
        date: new Date().toISOString(),
        fabric: 'Raw Silk',
        adjustments: ['Added padded cups', 'Deep back neck with doris']
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('tailor_clients', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem('tailor_projects', JSON.stringify(projects));
  }, [projects]);

  const addClient = (client) => {
    setClients(prev => [...prev, { ...client, id: Date.now().toString() }]);
  };

  const getClient = (id) => clients.find(c => c.id === id);

  const addProject = (project) => {
    setProjects(prev => [...prev, { ...project, id: Date.now().toString(), date: new Date().toISOString() }]);
  };

  const getClientProjects = (clientId) => projects.filter(p => p.clientId === clientId);

  return (
    <ClientContext.Provider value={{ clients, addClient, getClient, projects, addProject, getClientProjects }}>
      {children}
    </ClientContext.Provider>
  );
};
