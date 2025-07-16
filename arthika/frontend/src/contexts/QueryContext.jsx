import React, { createContext, useContext, useState } from 'react';

const QueryContext = createContext();

export function QueryProvider({ children, userEmail: initialEmail }) {
  const [queryResult, setQueryResult] = useState(null);
  const [userId, setUserId] = useState('demo-user');
  const [userEmail, setUserEmail] = useState(initialEmail || '');

  const updateUserId = (id) => {
    setUserId(id);
  };

  const updateUserEmail = (email) => {
    setUserEmail(email);
  };

  const resetQueryResult = () => {
    setQueryResult(null);
  };

  return (
    <QueryContext.Provider value={{ queryResult, setQueryResult, resetQueryResult, userId, setUserId: updateUserId, userEmail, setUserEmail: updateUserEmail }}>
      {children}
    </QueryContext.Provider>
  );
}

export function useQueryContext() {
  return useContext(QueryContext);
} 