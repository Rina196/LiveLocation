import * as Location from 'expo-location';
import { LOCATION_TASK_NAME } from './locationTask';

export async function startBackgroundLocation() {
  // Foreground permission
  const { status: fgStatus } = await Location.requestForegroundPermissionsAsync();
  if (fgStatus !== 'granted') {
    console.log("❌ Foreground location permission not granted");
    return;
  }

  // Background permission
  const { status: bgStatus } = await Location.requestBackgroundPermissionsAsync();
  if (bgStatus !== 'granted') {
    console.log("❌ Background location permission not granted");
    return;
  }

  // Already running?
  const isRegistered = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
  console.log("isRegistered", isRegistered);
  
  if (!isRegistered) {
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.Highest,
      timeInterval: 10000,       // every 10 sec
      distanceInterval: 5,      // or every 5 meters
      showsBackgroundLocationIndicator: true, // iOS blue bar
      foregroundService: {
        notificationTitle: "📍 Live Location Tracking",
        notificationBody: "Tracking your location in the background",
      },
    });
  }

  console.log("✅ Background location tracking started, ", isRegistered);
}

export async function stopBackgroundLocation() {
  const isRegistered = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
  if (isRegistered) {
    await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
    console.log("🛑 Background location tracking stopped");
  }
}
