import React, { createContext, useContext, useState } from 'react';

const QueryContext = createContext();

export function QueryProvider({ children }) {
  const [queryResult, setQueryResult] = useState(null);
  const [userId, setUserId] = useState('demo-user');

  const updateUserId = (id) => {
    setUserId(id);
  };

  const resetQueryResult = () => {
    setQueryResult(null);
  };

  return (
    <QueryContext.Provider value={{ queryResult, setQueryResult, resetQueryResult, userId, setUserId: updateUserId }}>
      {children}
    </QueryContext.Provider>
  );
}

export function useQueryContext() {
  return useContext(QueryContext);
} 