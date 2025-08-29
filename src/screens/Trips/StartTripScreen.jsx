import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import useTrips from '../../hooks/useTrips';

export default function StartTripScreen() {
  const { addTrip, activeTrip } = useTrips();
  const [startOdometer, setStartOdometer] = useState('');
  const [startPhoto, setStartPhoto] = useState(''); // Placeholder for photo URI

  const handleStartTrip = async () => {
    if (!startOdometer) {
      Alert.alert('Error', 'Please enter the start odometer reading.');
      return;
    }

    try {
      await addTrip({
        startOdometer: parseInt(startOdometer, 10),
        startPhoto,
      });
      Alert.alert('Success', 'Trip started successfully!');
      setStartOdometer('');
      setStartPhoto('');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to start trip.');
    }
  };

  return (
    <View style={styles.container}>
      {activeTrip ? (
        <Text style={styles.activeText}>You already have an active trip!</Text>
      ) : (
        <>
          <Text style={styles.label}>Start Odometer</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter start odometer"
            keyboardType="numeric"
            value={startOdometer}
            onChangeText={setStartOdometer}
          />

          {/* Placeholder for photo input */}
          <Text style={styles.label}>Photo (optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Photo URI"
            value={startPhoto}
            onChangeText={setStartPhoto}
          />

          <Button title="Start Trip" onPress={handleStartTrip} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  label: { fontSize: 16, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  activeText: { fontSize: 18, textAlign: 'center', color: 'green' },
});
