import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuthStore } from "./services/authStore";
import { createNewUser } from "./services/user.document";


export default function OTP({ route }: any) {
  const insets = useSafeAreaInsets();

  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { phoneNumber, confirmation } = useAuthStore();
  const router = useRouter();

  
  

  const confirmCode = async () => {
    if (!code.trim()) {
      Alert.alert("Please enter the OTP code");
      return;
    }
     
   try {
      setIsLoading(true);
      const res = await confirmation.confirm(code);
      Alert.alert('Login successful!');
      await createNewUser({mobile:  phoneNumber, id: res?.user?.uid});
    } catch (error: any) {
        Alert.alert('Invalid OTP');
    } finally {
      router.push("/home");
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={[
            styles.container,
            { paddingBottom: insets.bottom + 20 },
          ]}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo */}
          <Image
            source={require("./../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Title */}
          <Text style={styles.title}>Confirm your phone number</Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            We sent you a message at{" "}
            <Text style={styles.highlight}>{phoneNumber}</Text>. {"\n"}
            Please enter your code Asapp.
          </Text>

          {/* Input */}
          <TextInput
            placeholder="Code Asapp"
            placeholderTextColor="#888"
            keyboardType="number-pad"
            value={code}
            onChangeText={setCode}
            style={styles.input}
          />

          {/* Send New Code */}
          <TouchableOpacity style={{ marginTop: 16 }}>
            <Text style={styles.link}>SEND NEW CODE</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Bottom Actions */}
        <View
          style={[
            styles.bottomRow,
            { paddingBottom: insets.bottom + 20 || 16 },
          ]}
        >
         
          <TouchableOpacity style={styles.confirmButton} onPress={confirmCode}>
            <Text style={styles.confirmText}>CONFIRM</Text>
          </TouchableOpacity>
        </View>

        {/* Loader */}
        {isLoading && (
          <View style={styles.loaderOverlay}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}
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
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  logo: {
    width: 40,
    height: 40,
    marginBottom: 80,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1C1C1E",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#444",
    marginBottom: 24,
    lineHeight: 22,
  },
  highlight: {
    color: "#E25D2E",
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D6D6D6",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  link: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1C1C1E",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    alignItems: "center",
  },
  createAccount: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1C1C1E",
  },
  confirmButton: {
    backgroundColor: "#1C1C1E",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  confirmText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  loaderOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
});
