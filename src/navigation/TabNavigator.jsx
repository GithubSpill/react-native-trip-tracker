import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import StartTripScreen from '../screens/Trips/StartTripScreen';
import AddReceiptScreen from '../screens/Receipts/AddReceiptScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Dashboard">
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Trips" component={StartTripScreen} />
      <Tab.Screen name="Receipts" component={AddReceiptScreen} />
    </Tab.Navigator>
  );
}
