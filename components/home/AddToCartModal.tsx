import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { Image } from 'expo-image';
import { useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface AddToCartModalProps {
  visible: boolean;
  productId: string;
  productName: string;
  productPrice: string;
  productImage: string;
  onClose: () => void;
  onAddToCart: (id: string, qty: number) => void;
}

export default function AddToCartModal({
  visible,
  productId,
  productName,
  productPrice,
  productImage,
  onClose,
  onAddToCart,
}: AddToCartModalProps) {
  const [qty, setQty] = useState('1');

  const handleIncrement = () => {
    setQty(prev => String(Number(prev) + 1));
  };

  const handleDecrement = () => {
    setQty(prev => {
      const num = Number(prev);
      return num > 1 ? String(num - 1) : '1';
    });
  };

  const handleAddToCart = () => {
    onAddToCart(productId, Number(qty));
    setQty('1');
    onClose();
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity 
          style={styles.modalContent}
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.handle} />

          <View style={styles.productInfo}>
            <Image 
              source={{ uri: productImage }}
              style={styles.productImage}
              contentFit="cover"
            />
            <View style={styles.productDetails}>
              <Text style={styles.productName} numberOfLines={2}>{productName}</Text>
              <Text style={styles.productPrice}>{productPrice}</Text>
            </View>
          </View>

          <View style={styles.qtySection}>
            <Text style={styles.qtyLabel}>Jumlah</Text>
            <View style={styles.qtyContainer}>
              <TouchableOpacity 
                style={styles.qtyButton}
                onPress={handleDecrement}
              >
                <Image 
                  source={require('../../assets/images/pmo/ic_min_en.png')}
                  style={styles.qtyIcon}
                  contentFit="contain"
                />
              </TouchableOpacity>
              <TextInput
                style={styles.qtyInput}
                value={qty}
                onChangeText={(text) => {
                  const num = text.replace(/[^0-9]/g, '');
                  setQty(num || '1');
                }}
                keyboardType="number-pad"
              />
              <TouchableOpacity 
                style={styles.qtyButton}
                onPress={handleIncrement}
              >
                <Image 
                  source={require('../../assets/images/pmo/ic_add.png')}
                  style={styles.qtyIcon}
                  contentFit="contain"
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddToCart}
          >
            <Text style={styles.addButtonText}>Tambah ke Keranjang</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 32,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: Colors.lightGray,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  productInfo: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: Colors.background,
  },
  productDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.text,
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Colors.primary,
  },
  qtySection: {
    marginBottom: 24,
  },
  qtyLabel: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    color: Colors.text,
    marginBottom: 12,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  qtyButton: {
    width: 40,
    height: 40,
    backgroundColor: Colors.secondary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.white,
  },
  qtyInput: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 8,
    fontSize: 18,
    fontFamily: Fonts.bold,
    textAlign: 'center',
    color: Colors.text,
  },
  addButton: {
    backgroundColor: Colors.primary,
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.white,
  },
});
