import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import useTrips from '../../hooks/useTrips';

export default function StopTripScreen() {
  const { activeTrip, stopTrip } = useTrips();
  const [endOdometer, setEndOdometer] = useState('');
  const [endPhoto, setEndPhoto] = useState('');
  const [income, setIncome] = useState('');

  if (!activeTrip) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No active trip to stop.</Text>
      </View>
    );
  }

  const handleStopTrip = async () => {
    if (!endOdometer || !income) {
      Alert.alert('Error', 'Please enter both end odometer and income.');
      return;
    }

    try {
      await stopTrip({
        endOdometer: parseInt(endOdometer, 10),
        endPhoto,
        income: parseFloat(income),
      });
      Alert.alert('Success', 'Trip stopped successfully!');
      setEndOdometer('');
      setEndPhoto('');
      setIncome('');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to stop trip.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>End Odometer</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter end odometer"
        keyboardType="numeric"
        value={endOdometer}
        onChangeText={setEndOdometer}
      />

      <Text style={styles.label}>Photo (optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Photo URI"
        value={endPhoto}
        onChangeText={setEndPhoto}
      />

      <Text style={styles.label}>Income</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter income"
        keyboardType="numeric"
        value={income}
        onChangeText={setIncome}
      />

      <Button title="Stop Trip" onPress={handleStopTrip} />
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
  text: { fontSize: 18, textAlign: 'center', color: 'gray' },
});
