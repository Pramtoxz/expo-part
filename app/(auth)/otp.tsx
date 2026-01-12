import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const DUMMY_OTP = '123456';

export default function OTP() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<TextInput[]>([]);

  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) {
      value = value[0];
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp === DUMMY_OTP) {
      router.replace('/(tabs)');
    }
  };

  const handleResend = () => {
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  const isOtpComplete = otp.every(digit => digit !== '');

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
              Masukkan kode OTP yang telah dikirim ke WhatsApp Anda
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
                <Text style={styles.label}>Kode OTP</Text>
                <View style={styles.otpContainer}>
                  {otp.map((digit, index) => (
                    <TextInput
                      key={index}
                      ref={ref => {
                        if (ref) inputRefs.current[index] = ref;
                      }}
                      style={styles.otpInput}
                      value={digit}
                      onChangeText={(value) => handleOtpChange(value, index)}
                      onKeyPress={(e) => handleKeyPress(e, index)}
                      keyboardType="number-pad"
                      maxLength={1}
                      selectTextOnFocus
                    />
                  ))}
                </View>

                <TouchableOpacity 
                  style={styles.resendButton}
                  onPress={handleResend}
                >
                  <Text style={styles.resendText}>Kirim Ulang OTP</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.button, !isOtpComplete && styles.buttonDisabled]}
                  onPress={handleVerify}
                  disabled={!isOtpComplete}
                >
                  <Text style={styles.buttonText}>Verifikasi</Text>
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
    marginBottom: 16,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  otpInput: {
    width: 48,
    height: 56,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 8,
    fontSize: 24,
    fontFamily: Fonts.bold,
    textAlign: 'center',
    color: Colors.text,
  },
  resendButton: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  resendText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
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
