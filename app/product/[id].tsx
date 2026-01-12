import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const DUMMY_PRODUCTS = [
  { id: '1', name: 'Element Cleaner', price: 'Rp 22.900', priceNum: 22900, image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400', motor: 'Beat', description: 'Element cleaner berkualitas tinggi untuk membersihkan filter udara motor Anda. Cocok untuk semua jenis motor Honda.' },
  { id: '2', name: 'Coolant', price: 'Rp 19.500', priceNum: 19500, image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=400', motor: 'Vario', description: 'Cairan pendingin radiator original Honda. Melindungi mesin dari overheating dan korosi.' },
  { id: '3', name: 'Shoe Belt', price: 'Rp 90.000', priceNum: 90000, image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400', motor: 'PCX', description: 'V-belt berkualitas tinggi untuk transmisi CVT. Tahan lama dan performa optimal.' },
  { id: '4', name: 'Brake Pad', price: 'Rp 150.000', priceNum: 150000, image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400', motor: 'Beat', description: 'Kampas rem depan original Honda. Daya cengkram kuat dan aman untuk berkendara.' },
  { id: '5', name: 'Oil Filter', price: 'Rp 35.000', priceNum: 35000, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', motor: 'Vario', description: 'Filter oli original Honda untuk menjaga kebersihan oli mesin.' },
  { id: '6', name: 'Spark Plug', price: 'Rp 45.000', priceNum: 45000, image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400', motor: 'PCX', description: 'Busi iridium untuk performa mesin maksimal dan hemat bahan bakar.' },
];

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const [qty, setQty] = useState('1');

  const product = DUMMY_PRODUCTS.find(p => p.id === id);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Product not found</Text>
      </View>
    );
  }

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
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image 
            source={require('../../assets/images/pmo/ic_arrow_back.png')}
            style={styles.backIcon}
            contentFit="contain"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detail Produk</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: product.image }}
            style={styles.productImage}
            contentFit="cover"
          />
        </View>

        <View style={styles.detailContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productMotor}>Untuk: {product.motor}</Text>
          <Text style={styles.productPrice}>{product.price}</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Deskripsi</Text>
          <Text style={styles.description}>{product.description}</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Jumlah</Text>
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
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>
            Rp {(product.priceNum * Number(qty)).toLocaleString('id-ID')}
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddToCart}
        >
          <Text style={styles.addButtonText}>Tambah ke Keranjang</Text>
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
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: Colors.white,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  detailContainer: {
    padding: 16,
    backgroundColor: Colors.white,
    marginTop: 8,
  },
  productName: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: Colors.text,
    marginBottom: 4,
  },
  productMotor: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: Colors.primary,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.lightGray,
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.text,
    lineHeight: 20,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 8,
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
