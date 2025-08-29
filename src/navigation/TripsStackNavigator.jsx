// src/navigation/TripsStackNavigator.jsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartTripScreen from '../screens/Trips/StartTripScreen';
import StopTripScreen from '../screens/Trips/StopTripScreen';

const Stack = createNativeStackNavigator();

export default function TripsStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="StartTrip">
      <Stack.Screen
        name="StartTrip"
        component={StartTripScreen}
        options={{ title: 'Start Trip' }}
      />
      <Stack.Screen
        name="StopTrip"
        component={StopTripScreen}
        options={{ title: 'Stop Trip' }}
      />
    </Stack.Navigator>
  );
}
