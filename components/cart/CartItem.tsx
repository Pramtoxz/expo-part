import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { Image } from 'expo-image';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  qty: number;
  image: string;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function CartItem({ 
  id, 
  name, 
  price, 
  qty, 
  image, 
  onIncrement, 
  onDecrement, 
  onRemove 
}: CartItemProps) {
  const formatPrice = (price: number) => {
    return `Rp ${price.toLocaleString('id-ID')}`;
  };

  return (
    <View style={styles.cartItem}>
      <Image 
        source={{ uri: image }}
        style={styles.itemImage}
        contentFit="cover"
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName} numberOfLines={2}>{name}</Text>
        <Text style={styles.itemPrice}>{formatPrice(price)}</Text>
        <View style={styles.qtyContainer}>
          <TouchableOpacity 
            style={styles.qtyButton}
            onPress={() => onDecrement(id)}
          >
            <Image 
              source={require('../../assets/images/pmo/ic_min_en.png')}
              style={styles.qtyIcon}
              contentFit="contain"
            />
          </TouchableOpacity>
          <Text style={styles.qtyText}>{qty}</Text>
          <TouchableOpacity 
            style={styles.qtyButton}
            onPress={() => onIncrement(id)}
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
        style={styles.removeButton}
        onPress={() => onRemove(id)}
      >
        <Image 
          source={require('../../assets/images/pmo/ic_close_rounded.png')}
          style={styles.removeIcon}
          contentFit="contain"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: Colors.background,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.text,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    color: Colors.text,
    marginBottom: 8,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  qtyButton: {
    width: 28,
    height: 28,
    backgroundColor: Colors.secondary,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyIcon: {
    width: 16,
    height: 16,
    tintColor: Colors.white,
  },
  qtyText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.text,
    minWidth: 30,
    textAlign: 'center',
  },
  removeButton: {
    padding: 4,
  },
  removeIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.error,
  },
});
