import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { Image } from 'expo-image';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface FilterModalProps {
  visible: boolean;
  sortBy: 'default' | 'price-asc' | 'price-desc';
  filterMotor: string;
  onClose: () => void;
  onSortChange: (sort: 'default' | 'price-asc' | 'price-desc') => void;
  onMotorChange: (motor: string) => void;
}

export default function FilterModal({ 
  visible, 
  sortBy, 
  filterMotor, 
  onClose, 
  onSortChange, 
  onMotorChange 
}: FilterModalProps) {
  if (!visible) return null;

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Filter & Sort</Text>
          <TouchableOpacity onPress={onClose}>
            <Image 
              source={require('../../assets/images/pmo/ic_close_popup.png')}
              style={styles.closeIcon}
              contentFit="contain"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.filterLabel}>Urutkan Harga</Text>
        <TouchableOpacity 
          style={[styles.filterOption, sortBy === 'price-asc' && styles.filterOptionActive]}
          onPress={() => onSortChange('price-asc')}
        >
          <Text style={[styles.filterOptionText, sortBy === 'price-asc' && styles.filterOptionTextActive]}>
            Harga Terendah
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterOption, sortBy === 'price-desc' && styles.filterOptionActive]}
          onPress={() => onSortChange('price-desc')}
        >
          <Text style={[styles.filterOptionText, sortBy === 'price-desc' && styles.filterOptionTextActive]}>
            Harga Tertinggi
          </Text>
        </TouchableOpacity>

        <Text style={styles.filterLabel}>Filter Motor</Text>
        {['all', 'Beat', 'Vario', 'PCX'].map((motor) => (
          <TouchableOpacity 
            key={motor}
            style={[styles.filterOption, filterMotor === motor && styles.filterOptionActive]}
            onPress={() => onMotorChange(motor)}
          >
            <Text style={[styles.filterOptionText, filterMotor === motor && styles.filterOptionTextActive]}>
              {motor === 'all' ? 'Semua Motor' : motor}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity 
          style={styles.applyButton}
          onPress={onClose}
        >
          <Text style={styles.applyButtonText}>Terapkan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Colors.text,
  },
  closeIcon: {
    width: 24,
    height: 24,
    tintColor: Colors.text,
  },
  filterLabel: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    color: Colors.text,
    marginTop: 16,
    marginBottom: 12,
  },
  filterOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    marginBottom: 8,
  },
  filterOptionActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterOptionText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.text,
  },
  filterOptionTextActive: {
    color: Colors.white,
  },
  applyButton: {
    backgroundColor: Colors.primary,
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  applyButtonText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.white,
  },
});
