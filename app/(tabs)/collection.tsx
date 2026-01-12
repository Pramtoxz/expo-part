import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const DUMMY_PIN = '1234';

export default function Collection() {
  const [showPinModal, setShowPinModal] = useState(true);
  const [pin, setPin] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handlePinSubmit = () => {
    if (pin === DUMMY_PIN) {
      setIsUnlocked(true);
      setShowPinModal(false);
    } else {
      setPin('');
    }
  };

  useEffect(() => {
    setShowPinModal(true);
    setIsUnlocked(false);
    setPin('');
  }, []);

  return (
    <View style={styles.container}>
      {isUnlocked ? (
        <Text style={styles.text}>Collection Screen</Text>
      ) : null}

      <Modal
        visible={showPinModal}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Masukkan PIN</Text>
            <Text style={styles.modalSubtitle}>PIN khusus untuk Owner Toko</Text>

            <TextInput
              style={styles.pinInput}
              value={pin}
              onChangeText={setPin}
              keyboardType="number-pad"
              maxLength={4}
              secureTextEntry
              placeholder="****"
              placeholderTextColor={Colors.gray}
            />

            <TouchableOpacity 
              style={[styles.button, pin.length !== 4 && styles.buttonDisabled]}
              onPress={handlePinSubmit}
              disabled={pin.length !== 4}
            >
              <Text style={styles.buttonText}>Verifikasi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  text: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: Colors.text,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 24,
    width: '80%',
    maxWidth: 320,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  pinInput: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    height: 56,
    fontSize: 24,
    fontFamily: Fonts.bold,
    textAlign: 'center',
    marginBottom: 24,
    letterSpacing: 8,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
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
