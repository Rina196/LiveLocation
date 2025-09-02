import auth from '@react-native-firebase/auth';
import { useRouter } from 'expo-router';
import { useState } from "react";
import { ActivityIndicator, Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { createNewUser } from './services/user.document';

export default function Login() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirm, setConfirm] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendOtp = async () => {
    try {
      setIsLoading(true);
      const confirmation = await auth().signInWithPhoneNumber(phone);
      setConfirm(confirmation);
      Alert.alert('OTP sent!');
    } catch (error: any) {
      Alert.alert('Error sending OTP', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmOtp = async () => {
    try {
      setIsLoading(true);
      const res = await confirm.confirm(otp);
      Alert.alert('Login successful!');
      await createNewUser({mobile: phone, id: res?.user?.uid});
      router.push("/home");
    } catch (error: any) {
      Alert.alert('Invalid OTP');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Login with Mobile</Text>

      <TextInput
        placeholder="Enter mobile number (+911234567890)"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={{ borderWidth: 1, marginBottom: 20, padding: 10 }}
      />

      <Button title="Send OTP" onPress={sendOtp} />

      {confirm && (
        <>
          <TextInput
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            style={{ borderWidth: 1, marginVertical: 20, padding: 10 }}
          />
          <Button title="Verify OTP" onPress={confirmOtp} disabled={!otp} />
        </>
      )}

      {/* Fullscreen Loader Overlay */}
      {isLoading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loaderOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)", // semi-transparent background
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999, // ensures it's above everything
  },
});
