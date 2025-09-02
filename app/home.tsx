import { router } from 'expo-router';
import React, { useState } from 'react';
import { Button, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuthStore } from './services/authStore';
import { startBackgroundLocation, stopBackgroundLocation } from './services/locationService';

export default function Home() {
  const [tracking, setTracking] = useState(false);
  const { reSetUserStore } = useAuthStore();
    const insets = useSafeAreaInsets();
  

  
  const handleStart = async () => {
    await startBackgroundLocation()
    fetch('http://192.168.1.168:3000/log', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'Chirag',
    email: 'chirag@example.com',
    start: 'started',
    timestamp: new Date().toISOString(),
  }),
})
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
    setTracking(true);
  };

  const handleStop = async () => {
    await stopBackgroundLocation();
    setTracking(false);
  };

  const logout = async () => {
   reSetUserStore()
   router.dismissAll()
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
<View style={styles.container}>
      <Text style={styles.title}>📍 Live Location</Text>
      {tracking ? (
        <Button title="Stop Tracking" onPress={handleStop} />
      ) : (
        <Button title="Start Tracking" onPress={handleStart} />
      )}
      
    </View>

    <View style={{flex:1, justifyContent:'flex-end', paddingBottom: insets.bottom + 20 || 16,     alignItems: 'center',
}}>
        <Button title="Logout" onPress={logout}  />
      </View>
    </KeyboardAvoidingView>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FBF5EF",
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});