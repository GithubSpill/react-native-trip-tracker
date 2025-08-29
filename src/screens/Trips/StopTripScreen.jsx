import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { TripContext } from '../../context/TripContext';

export default function StopTripScreen() {
  const { activeTrip, setActiveTrip } = useContext(TripContext);
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

  const handleStopTrip = () => {
    if (!endOdometer || !income) {
      Alert.alert('Error', 'Please enter end odometer and income');
      return;
    }

    const finishedTrip = {
      ...activeTrip,
      endOdometer,
      endPhoto,
      income,
    };

    console.log('Trip finished:', finishedTrip);
    setActiveTrip(null);
    Alert.alert('Trip stopped successfully!');
    setEndOdometer('');
    setEndPhoto('');
    setIncome('');
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
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 15, padding: 10, borderRadius: 5 },
  text: { fontSize: 18, textAlign: 'center', color: 'gray' },
});
