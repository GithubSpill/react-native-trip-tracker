import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import StartTripScreen from '../screens/Trips/StartTripScreen';
import AddReceiptScreen from '../screens/Receipts/AddReceiptScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        

        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = 'home-outline';
          } else if (route.name === 'Trips') {
            iconName = 'car-outline';
          } else if (route.name === 'Receipts') {
            iconName = 'receipt-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',  // iOS blue style
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Trips" component={StartTripScreen} />
      <Tab.Screen name="Receipts" component={AddReceiptScreen} />
    </Tab.Navigator>
  );
}
