import CartItem from '@/components/cart/CartItem';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const DUMMY_CART_ITEMS = [
  { id: '1', name: 'Element Cleaner', price: 22900, qty: 10, image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400' },
  { id: '2', name: 'Coolant', price: 19500, qty: 5, image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=400' },
  { id: '3', name: 'Shoe Belt', price: 90000, qty: 2, image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400' },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(DUMMY_CART_ITEMS);

  const handleIncrement = (id: string) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    ));
  };

  const handleDecrement = (id: string) => {
    setCartItems(prev => prev.map(item => 
      item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
    ));
  };

  const handleRemove = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const formatPrice = (price: number) => {
    return `Rp ${price.toLocaleString('id-ID')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image 
            source={require('../assets/images/pmo/ic_arrow_back.png')}
            style={styles.backIcon}
            contentFit="contain"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cart</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            qty={item.qty}
            image={item.image}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onRemove={handleRemove}
          />
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>{formatPrice(totalAmount)}</Text>
        </View>
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>Create PO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: Colors.text,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Colors.text,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  footer: {
    backgroundColor: Colors.white,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.text,
  },
  totalAmount: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: Colors.text,
  },
  createButton: {
    backgroundColor: Colors.primary,
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButtonText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.white,
  },
});
