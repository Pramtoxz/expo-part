import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { Image } from 'expo-image';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const DUMMY_PRODUCTS = [
  { id: '1', name: 'Element Cleaner', price: 'Rp 22.900', image: require('../../assets/images/pmo/ic_catalogue.png') },
  { id: '2', name: 'Coolant', price: 'Rp 19.500', image: require('../../assets/images/pmo/ic_catalogue.png') },
  { id: '3', name: 'Shoe Belt', price: 'Rp 90.000', image: require('../../assets/images/pmo/ic_catalogue.png') },
  { id: '4', name: 'Brake Pad', price: 'Rp 150.000', image: require('../../assets/images/pmo/ic_catalogue.png') },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<{ [key: string]: number }>({});

  const handleAddToCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const cartItemCount = Object.values(cart).reduce((sum, count) => sum + count, 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.dealerCode}>12345 - Parts Shop ABC</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
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
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Image 
              source={require('../../assets/images/pmo/ic_search.png')}
              style={styles.searchIcon}
              contentFit="contain"
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Parts Number / Parts Description"
              placeholderTextColor={Colors.gray}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={styles.downloadButton}>
            <Image 
              source={require('../../assets/images/pmo/ic_download.png')}
              style={styles.downloadIcon}
              contentFit="contain"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.campaignSection}>
          <View style={styles.campaignHeader}>
            <Text style={styles.campaignTitle}>Campaign</Text>
            <TouchableOpacity>
              <Text style={styles.seeMore}>See More {'>'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.campaignBanner}>
            <Image 
              source={require('../../assets/images/pmo/bg_ss.webp')}
              style={styles.bannerImage}
              contentFit="cover"
            />
          </View>
        </View>

        <View style={styles.productsSection}>
          <View style={styles.productGrid}>
            {DUMMY_PRODUCTS.map((product) => (
              <View key={product.id} style={styles.productCard}>
                <View style={styles.productImageContainer}>
                  <Image 
                    source={product.image}
                    style={styles.productImage}
                    contentFit="contain"
                  />
                </View>
                <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
                <View style={styles.productFooter}>
                  <Text style={styles.productPrice}>{product.price}</Text>
                  <TouchableOpacity 
                    style={styles.addButton}
                    onPress={() => handleAddToCart(product.id)}
                  >
                    <Image 
                      source={require('../../assets/images/pmo/ic_add.png')}
                      style={styles.addIcon}
                      contentFit="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
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
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.gray,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.text,
  },
  downloadButton: {
    width: 44,
    height: 44,
    backgroundColor: Colors.white,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  downloadIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.text,
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
  productCard: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  productImageContainer: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  productImage: {
    width: 80,
    height: 80,
  },
  productName: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.text,
    marginBottom: 8,
    minHeight: 36,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    color: Colors.text,
  },
  addButton: {
    width: 28,
    height: 28,
    backgroundColor: Colors.secondary,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIcon: {
    width: 16,
    height: 16,
    tintColor: Colors.white,
  },
});
