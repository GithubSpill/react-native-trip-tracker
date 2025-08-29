import { useContext, useEffect } from 'react';
import { TripContext } from '../context/TripContext';
import { addTrip as addTripService, stopTrip as stopTripService, getTrips as getTripsService } from '../services/tripService';

export default function useTrips() {
  const { trips, setTrips, activeTrip, setActiveTrip } = useContext(TripContext);

  // Load trips from DB on mount
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const allTrips = await getTripsService();
        setTrips(allTrips);
      } catch (error) {
        console.error('Failed to fetch trips:', error);
      }
    };
    fetchTrips();
  }, []);

  // Start a new trip
  const addTrip = async (tripData) => {
    try {
      const newTrip = await addTripService(tripData);
      setTrips(prev => [newTrip, ...prev]);
      setActiveTrip(newTrip);
      return newTrip;
    } catch (error) {
      console.error('Failed to add trip:', error);
      throw error;
    }
  };

  // Stop the active trip
  const stopTrip = async (tripData) => {
    if (!activeTrip) throw new Error('No active trip to stop');
    try {
      const updatedTrip = await stopTripService({ id: activeTrip.id, ...tripData });
      setTrips(prev => prev.map(t => (t.id === updatedTrip.id ? updatedTrip : t)));
      setActiveTrip(null);
      return updatedTrip;
    } catch (error) {
      console.error('Failed to stop trip:', error);
      throw error;
    }
  };

  return {
    trips,
    activeTrip,
    addTrip,
    stopTrip,
  };
}
