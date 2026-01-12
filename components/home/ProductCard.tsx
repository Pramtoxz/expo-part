import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  image: string;
  onAddToCart: (id: string) => void;
  onQuickAdd: (id: string, name: string, price: string, image: string) => void;
}

export default function ProductCard({ id, name, price, image, onAddToCart, onQuickAdd }: ProductCardProps) {
  const handlePress = () => {
    router.push({
      pathname: '/product/[id]',
      params: { id }
    });
  };

  return (
    <TouchableOpacity style={styles.productCard} onPress={handlePress}>
      <View style={styles.productImageContainer}>
        <Image 
          source={{ uri: image }}
          style={styles.productImage}
          contentFit="cover"
        />
      </View>
      <Text style={styles.productName} numberOfLines={2}>{name}</Text>
      <View style={styles.productFooter}>
        <Text style={styles.productPrice}>{price}</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={(e) => {
            e.stopPropagation();
            onQuickAdd(id, name, price, image);
          }}
        >
          <Image 
            source={require('../../assets/images/pmo/ic_add.png')}
            style={styles.addIcon}
            contentFit="contain"
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: Colors.background,
    borderRadius: 8,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
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
