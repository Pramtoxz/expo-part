import AddToCartModal from '@/components/home/AddToCartModal';
import FilterModal from '@/components/home/FilterModal';
import ProductCard from '@/components/home/ProductCard';
import SearchBar from '@/components/home/SearchBar';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const DUMMY_PRODUCTS = [
  { id: '1', name: 'Element Cleaner', price: 'Rp 22.900', priceNum: 22900, image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400', motor: 'Beat' },
  { id: '2', name: 'Coolant', price: 'Rp 19.500', priceNum: 19500, image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=400', motor: 'Vario' },
  { id: '3', name: 'Shoe Belt', price: 'Rp 90.000', priceNum: 90000, image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400', motor: 'PCX' },
  { id: '4', name: 'Brake Pad', price: 'Rp 150.000', priceNum: 150000, image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400', motor: 'Beat' },
  { id: '5', name: 'Oil Filter', price: 'Rp 35.000', priceNum: 35000, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', motor: 'Vario' },
  { id: '6', name: 'Spark Plug', price: 'Rp 45.000', priceNum: 45000, image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400', motor: 'PCX' },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');
  const [filterMotor, setFilterMotor] = useState<string>('all');
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    id: string;
    name: string;
    price: string;
    image: string;
  } | null>(null);

  const handleAddToCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const handleQuickAdd = (id: string, name: string, price: string, image: string) => {
    setSelectedProduct({ id, name, price, image });
    setShowAddToCartModal(true);
  };

  const handleAddToCartWithQty = (id: string, qty: number) => {
    setCart(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + qty
    }));
  };

  const handleGoToCart = () => {
    router.push('/cart');
  };

  const cartItemCount = Object.values(cart).reduce((sum, count) => sum + count, 0);

  const filteredProducts = DUMMY_PRODUCTS
    .filter(p => filterMotor === 'all' || p.motor === filterMotor)
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceNum - b.priceNum;
      if (sortBy === 'price-desc') return b.priceNum - a.priceNum;
      return 0;
    });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.dealerCode}>12345 - Parts Shop ABC</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton} onPress={handleGoToCart}>
            <Image 
              source={require('../../assets/images/pmo/ic_shopping_cart.png')}
              style={styles.headerIcon}
              contentFit="contain"
            />
            {cartItemCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartItemCount}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Image 
              source={require('../../assets/images/pmo/ic_notification.png')}
              style={styles.headerIcon}
              contentFit="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <SearchBar 
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFilterPress={() => setShowFilterModal(true)}
        />

        <View style={styles.campaignSection}>
          <View style={styles.campaignHeader}>
            <Text style={styles.campaignTitle}>Campaign</Text>
            <TouchableOpacity>
              <Text style={styles.seeMore}>See More {'>'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.campaignBanner}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800' }}
              style={styles.bannerImage}
              contentFit="cover"
            />
          </View>
        </View>

        <View style={styles.productsSection}>
          <View style={styles.productGrid}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                onAddToCart={handleAddToCart}
                onQuickAdd={handleQuickAdd}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <FilterModal
        visible={showFilterModal}
        sortBy={sortBy}
        filterMotor={filterMotor}
        onClose={() => setShowFilterModal(false)}
        onSortChange={setSortBy}
        onMotorChange={setFilterMotor}
      />

      {selectedProduct && (
        <AddToCartModal
          visible={showAddToCartModal}
          productId={selectedProduct.id}
          productName={selectedProduct.name}
          productPrice={selectedProduct.price}
          productImage={selectedProduct.image}
          onClose={() => {
            setShowAddToCartModal(false);
            setSelectedProduct(null);
          }}
          onAddToCart={handleAddToCartWithQty}
        />
      )}
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
  headerLeft: {
    flex: 1,
  },
  dealerCode: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    color: Colors.text,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    position: 'relative',
  },
  headerIcon: {
    width: 24,
    height: 24,
    tintColor: Colors.text,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    fontSize: 10,
    fontFamily: Fonts.bold,
    color: Colors.white,
  },
  content: {
    flex: 1,
  },
  campaignSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  campaignHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  campaignTitle: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.text,
  },
  seeMore: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.primary,
  },
  campaignBanner: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: Colors.lightGray,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  productsSection: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
});
