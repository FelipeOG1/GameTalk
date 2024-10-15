import React, { createContext, useState, useEffect } from 'react';


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);  
  const [loading, setLoading] = useState(true);  


  const loadUser = async () => {
    try {
      const response = await fetch('http://localhost:3000/user', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();

      if (response.ok) {
        setUser(data); 
      } else {
        setUser(null);  
      }
    } catch (error) {
      console.log(error);
      setUser(null);  
    } finally {
      setLoading(false);  
    }
  };

  
  useEffect(() => {
    loadUser();
  }, []);

 
  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
