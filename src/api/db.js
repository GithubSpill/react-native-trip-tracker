import * as SQLite from 'expo-sqlite';

let db = null;

export const initDatabase = async () => {
  try {
    if (!db) {
      db = await SQLite.openDatabaseAsync('tripTracker.db');
      
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS trips (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          startOdometer INTEGER,
          startPhoto TEXT,
          endOdometer INTEGER,
          endPhoto TEXT,
          income REAL,
          createdAt TEXT DEFAULT CURRENT_TIMESTAMP
        );
      `);

      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS receipts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          amount REAL,
          photo TEXT,
          createdAt TEXT DEFAULT CURRENT_TIMESTAMP
        );
      `);
    }
    return db;
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
};

export const executeSql = async (sql, params = []) => {
  try {
    if (!db) {
      await initDatabase();
    }
    return await db.execAsync(sql, params);
  } catch (error) {
    console.error('SQL execution failed:', error);
    throw error;
  }
};