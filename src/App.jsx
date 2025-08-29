import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, SafeAreaView } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import { initDatabase } from './api/db';
import colors from './styles/colors';
import { TripProvider } from './context/TripContext';

export default function App() {
  const [isDbReady, setIsDbReady] = useState(false);

  useEffect(() => {
    const setupDatabase = async () => {
      try {
        await initDatabase();
        setIsDbReady(true);
      } catch (error) {
        console.error('Database initialization failed:', error);
      }
    };

    setupDatabase();
  }, []);

  if (!isDbReady) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TripProvider>
        <AppNavigator />
      </TripProvider>
    </SafeAreaView>
  );
}