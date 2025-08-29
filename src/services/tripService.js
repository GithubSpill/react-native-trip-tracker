import { getDBConnection } from '../api/db'; // We'll adapt this for async DB usage
import * as SQLite from 'expo-sqlite';

let db = null;

// Ensure DB is initialized
const getDb = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('tripTracker.db');
  }
  return db;
};

// Add a new trip (Start Trip)
export const addTrip = async ({ startOdometer, startPhoto }) => {
  try {
    const database = await getDb();
    await database.runAsync(
      `INSERT INTO trips (startOdometer, startPhoto) VALUES (?, ?);`,
      [startOdometer, startPhoto]
    );

    // Fetch the trip we just inserted
    const trips = await getTrips();
    return trips[trips.length - 1]; // return the latest trip
  } catch (error) {
    console.error('Error adding trip:', error);
    throw error;
  }
};

// Update a trip when stopping
export const stopTrip = async ({ id, endOdometer, endPhoto, income }) => {
  try {
    const database = await getDb();
    await database.runAsync(
      `UPDATE trips SET endOdometer = ?, endPhoto = ?, income = ? WHERE id = ?;`,
      [endOdometer, endPhoto, income, id]
    );

    // Return the updated trip
    const trips = await getTrips();
    return trips.find(trip => trip.id === id);
  } catch (error) {
    console.error('Error stopping trip:', error);
    throw error;
  }
};

// Fetch all trips
export const getTrips = async () => {
  try {
    const database = await getDb();
    const rows = await database.getAllAsync(`SELECT * FROM trips ORDER BY createdAt DESC;`);
    return rows;
  } catch (error) {
    console.error('Error fetching trips:', error);
    throw error;
  }
};
