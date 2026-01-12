import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleLogin = () => {
    if (phoneNumber.length >= 10) {
      router.push('/(auth)/otp');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.background}>
        <Image 
          source={require('../../assets/images/pmo/bg_honda.webp')} 
          style={StyleSheet.absoluteFillObject}
          contentFit="cover"
        />
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>MENARA AGUNG</Text>
            <Text style={styles.subtitle}>Mobile Parts Ordering</Text>
            <Text style={styles.description}>
              Salam SATU HATI. Silakan masukkan akun untuk mengakses Aplikasi
            </Text>
          </View>

          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.formWrapper}
          >
            <View style={styles.formContainer}>
              <ScrollView 
                contentContainerStyle={styles.formContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                bounces={false}
              >
                <Text style={styles.label}>Nomor HP</Text>
                <View style={styles.inputContainer}>
                  <Image 
                    source={require('../../assets/images/pmo/ic_username.png')}
                    style={styles.inputIcon}
                    contentFit="contain"
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="08123456789"
                    placeholderTextColor={Colors.gray}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                    maxLength={13}
                  />
                </View>

                <TouchableOpacity 
                  style={[styles.button, phoneNumber.length < 10 && styles.buttonDisabled]}
                  onPress={handleLogin}
                  disabled={phoneNumber.length < 10}
                >
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 32,
  },
  title: {
    fontSize: 32,
    fontFamily: Fonts.bold,
    color: Colors.white,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: Colors.white,
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.white,
    lineHeight: 20,
  },
  formWrapper: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  formContent: {
    flexGrow: 1,
    padding: 24,
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 24,
    paddingHorizontal: 16,
    marginBottom: 24,
    height: 48,
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
    tintColor: Colors.gray,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.text,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: Colors.gray,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.white,
  },
});
