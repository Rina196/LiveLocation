import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { startBackgroundLocation, stopBackgroundLocation } from './services/locationService';


export default function HomeScreen() {
const [tracking, setTracking] = useState(false);

  
  const handleStart = async () => {
    await startBackgroundLocation()
    setTracking(true);
  };

  const handleStop = async () => {
    await stopBackgroundLocation();
    setTracking(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📍 Live Location Demo</Text>
      {tracking ? (
        <Button title="Stop Tracking" onPress={handleStop} />
      ) : (
        <Button title="Start Tracking" onPress={handleStart} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});
