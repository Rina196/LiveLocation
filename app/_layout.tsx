import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { useColorScheme } from '@/hooks/useColorScheme';
import { useEffect } from 'react';
import { backgroundHandler, notificationListener, requestUserPermission } from './services/firebaseNotification';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
      requestUserPermission();
      notificationListener(router);
      backgroundHandler(router);
    }, [router]);
  

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
     <Stack>
      {/* each file is auto-mapped */}
      <Stack.Screen name="index" options={{ title: "Login" }} />
      <Stack.Screen name="home" options={{ title: "Home" }} />
      <Stack.Screen name="notification" options={{ title: "Notification" }} />
    </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
