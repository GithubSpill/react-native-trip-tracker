import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { TripContext } from '../../context/TripContext';
import useTrips from '../../hooks/useTrips';

export default function StartTripScreen({ navigation }) {
  const { activeTrip } = useContext(TripContext);
  const { addTrip } = useTrips();
  const [startOdometer, setStartOdometer] = useState('');
  const [startPhoto, setStartPhoto] = useState('');

  const handleStartTrip = async () => {
    if (!startOdometer) {
      Alert.alert('Error', 'Please enter start odometer');
      return;
    }

    try {
      await addTrip({
        startOdometer: parseInt(startOdometer),
        startPhoto
      });
      
      setStartOdometer('');
      setStartPhoto('');
      navigation.navigate('StopTrip');
    } catch (error) {
      Alert.alert('Error', 'Failed to start trip');
    }
  };

  return (
    <View style={styles.container}>
      {activeTrip ? (
        <View>
          <Text style={styles.activeText}>You have an active trip!</Text>
          <Button 
            title="Go to Stop Trip" 
            onPress={() => navigation.navigate('StopTrip')} 
          />
        </View>
      ) : (
        <View>
          <Text style={styles.label}>Start Odometer</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter start odometer"
            keyboardType="numeric"
            value={startOdometer}
            onChangeText={setStartOdometer}
          />

          <Text style={styles.label}>Photo (optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Photo URI"
            value={startPhoto}
            onChangeText={setStartPhoto}
          />

          <Button title="Start Trip" onPress={handleStartTrip} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  activeText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#007bff'
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16
  }
});