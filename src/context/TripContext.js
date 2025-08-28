import React, { createContext, useState } from 'react';

export const TripContext = createContext();

export function TripProvider({ children }) {
  const [trips, setTrips] = useState([]);
  const [activeTrip, setActiveTrip] = useState(null);

  return (
    <TripContext.Provider value={{ trips, setTrips, activeTrip, setActiveTrip }}>
      {children}
    </TripContext.Provider>
  );
}
