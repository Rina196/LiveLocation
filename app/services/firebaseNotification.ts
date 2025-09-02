import messaging from '@react-native-firebase/messaging';
import { Alert, AppState } from 'react-native';


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
export function notificationListener(router) {
  // subscribe
  const unsubscribe = messaging().onMessage(async remoteMessage => {
   if (AppState.currentState === "active") {
      Alert.alert(
        "A new FCM message arrived!",
        JSON.stringify(remoteMessage.notification),
        [{ text: "OK", onPress: () => {
          router.push({pathname: '/notification', params: {body: remoteMessage.notification?.body, title: remoteMessage.notification?.title}});
        } }]
      );
    } else {
      console.log("Message received in background:", remoteMessage);
      // 👉 store in AsyncStorage, show local notification, etc.
    }
  });

  // return unsubscribe function so caller can clean it up
  return unsubscribe;
}


export function backgroundHandler(router) {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    router.push({pathname: '/notification', params: {body: remoteMessage.notification?.body, title: remoteMessage.notification?.title}});
  })
}


