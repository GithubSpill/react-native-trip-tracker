import React, { createContext, useState } from 'react';

export const TripContext = createContext();

export function TripProvider({ children }) {
  const [trips, setTrips] = useState([]);
  const [activeTrip, setActiveTrip] = useState(null);

  const value = {
    trips,
    setTrips,
    activeTrip,
    setActiveTrip
  };

  return (
    <TripContext.Provider value={value}>
      {children}
    </TripContext.Provider>
  );
}