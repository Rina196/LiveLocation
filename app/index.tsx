import auth from '@react-native-firebase/auth';
import { useRouter } from 'expo-router';
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
import CountryPicker, { Country } from "react-native-country-picker-modal";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuthStore } from './services/authStore';


export default function LoginScreen() {
  const [phone, setPhone] = useState("");
  const insets = useSafeAreaInsets();
  const { setConfirmation, setPhoneNumber } = useAuthStore();

  const [countryCode, setCountryCode] = useState<Country["cca2"]>("IN");
  const [callingCode, setCallingCode] = useState("91");
  const [visible, setVisible] = useState(false);
  const [confirm, setConfirm] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSelectCountry = (country: Country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
    setVisible(false);
  };

  const getFlagEmoji = (countryCode: string) => {
  if (!countryCode) return "";
  return countryCode
    .toUpperCase()
    .replace(/./g, char =>
      String.fromCodePoint(127397 + char.charCodeAt(0))
    );
};

const sendOtp = async () => {
  const codeWithMobile = `+${callingCode}${phone}`;
  console.log("countryCode + phone", codeWithMobile);

    try {
      setIsLoading(true);
      const confirmation = await auth().signInWithPhoneNumber(codeWithMobile);
      setConfirm(confirmation);
      setConfirmation(confirmation);
      Alert.alert('OTP sent!');
    } catch (error: any) {
      Alert.alert('Error sending OTP', error.message);
    } finally {
      setIsLoading(false);
      setPhoneNumber(phone);
      router.push('/otp');
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
          <Text style={styles.title}>Login to Your Account</Text>

          {/* Phone Input Row */}
          <View style={styles.inputRow}>


               <CountryPicker
                  countryCode={countryCode}
                  withFilter
                  withFlag
                  withCallingCode
                  withEmoji
                  withAlphaFilter
                  onSelect={onSelectCountry}
                  visible={visible}
                  onClose={() => setVisible(false)}
                  renderFlagButton={() => (
                      <TouchableOpacity
                        style={styles.codeBox}
                        onPress={() => setVisible(true)}
                      >
                        <Text style={styles.codeText}>
                          {getFlagEmoji(countryCode)} +{callingCode}
                        </Text>
                      </TouchableOpacity>
                  )}
                />
            
            <TextInput
              placeholder="Mobile number"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              style={styles.input}
              placeholderTextColor="#888"
            />
          </View>
        </ScrollView>

        {/* Country Picker */}
       
        {/* Bottom Actions */}
        <View
          style={[
            styles.bottomRow,
            { paddingBottom: insets.bottom + 20 || 16 },
          ]}
        >
          
          <TouchableOpacity style={styles.signInButton} onPress={sendOtp}>
            <Text style={styles.signInText}>SIGN IN</Text>
          </TouchableOpacity>
        </View>

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
    marginBottom: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1C1C1E",
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  codeBox: {
    borderWidth: 1,
    borderColor: "#D6D6D6",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 10,
    backgroundColor: "#fff",
  },
  codeText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1C1C1E",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D6D6D6",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent:'flex-end',
    paddingHorizontal: 20,
    alignItems: "center",
  },
  createAccount: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1C1C1E",
  },
  signInButton: {
    backgroundColor: "#1C1C1E",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  signInText: {
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
    backgroundColor: "rgba(0,0,0,0.8)", // semi-transparent background
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999, // ensures it's above everything
  },
});
