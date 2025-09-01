import * as TaskManager from "expo-task-manager";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { Platform } from "react-native";

// Firebase config
const firebaseConfig = {
  apiKey: "xxx",
  projectId: "livelocationdemo-d3cb8",
  messagingSenderId: "xxx",
  appId: "xxx"
};

// Init
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const LOCATION_TASK_NAME = "background-location-task";

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error("Task error:", error);
    return;
  }

  if (data) {
    const { locations } = data;
    const { latitude, longitude } = locations[0].coords;

    console.log("Location updated:", { latitude, longitude });

  fetch('https://ca3cfdb02536dae20854.free.beeceptor.com/api/users/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'Chirag',
    email: 'chirag@example.com',
    location: {lat: latitude, long: longitude},
    timestamp: new Date().toISOString(),
    platform: Platform.OS,
  }),
})
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch(error => {
    console.error('Error:', error);
     fetch('https://ca3cfdb02536dae20854.free.beeceptor.com/api/users/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'Chirag',
    email: 'chirag@example.com',
    error: JSON.stringify(error),
    timestamp: new Date().toISOString(),
  }),
})
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  });

    // try {
    //   const q = query(collection(db, "users"), where("token", "==", "dDsusWvKSxyVE2MJ2NaKFM:APA91bHCI646bpUj3CzA9Ss0wggMbC7njwsWNqgaiS3xk5yTEA50HuOpMwuBsc5dT1IHYnoZwjIY5LgejC7Rclb9WqZq_4R31Q9WACtT82pMIYvE9NAAs1I"));
    //   const querySnapshot = await getDocs(q);

    //   console.log("querySnapshot", querySnapshot);
      

    //   if (!querySnapshot.empty) {
    //     const docRef = querySnapshot.docs[0].ref;
    //     await updateDoc(docRef, {
    //       token: "dDsusWvKSxyVE2MJ2NaKFM:APA91bHCI646bpUj3CzA9Ss0wggMbC7njwsWNqgaiS3xk5yTEA50HuOpMwuBsc5dT1IHYnoZwjIY5LgejC7Rclb9WqZq_4R31Q9WACtT82pMIYvE9NAAs1I",
    //       location: new GeoPoint(latitude, longitude),
    //       createdAt: serverTimestamp(),
    //     });
    //     console.log("User updated! ID:", docRef.id);
    //   } else {
    //     console.log("No user found with that token.");
    //   }
    // } catch (err) {
    //   console.error("Error updating user:", err);
    // }
  }
});

export { LOCATION_TASK_NAME };
