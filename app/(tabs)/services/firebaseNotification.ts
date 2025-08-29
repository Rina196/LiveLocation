import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

// Request user permission for notifications
export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Notification permission enabled:', authStatus);
    getFcmToken();
  } else {
    console.log('Notification permission denied');
  }
}

// Get FCM token
export async function getFcmToken() {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
    console.log('FCM Token:', fcmToken);
    // You can send this token to your server for push notifications
  }
}

// Listen for foreground messages
export function notificationListener() {
  messaging().onMessage(async remoteMessage => {
    Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage.notification));
  });
}