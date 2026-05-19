import React, { createContext, useState, useEffect } from 'react';
import { getChecklists } from '../services/api';

export const ChecklistContext = createContext();

export const ChecklistProvider = ({ children }) => {
  const [checklists, setChecklists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getChecklists();
      setChecklists(data);
    };
    fetchData();
  }, []);

  return (
    <ChecklistContext.Provider value={{ checklists, setChecklists }}>
      {children}
    </ChecklistContext.Provider>
  );
};
