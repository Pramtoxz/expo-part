import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { Image } from 'expo-image';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onFilterPress: () => void;
}

export default function SearchBar({ value, onChangeText, onFilterPress }: SearchBarProps) {
  return (
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
          value={value}
          onChangeText={onChangeText}
        />
      </View>
      <TouchableOpacity 
        style={styles.filterButton}
        onPress={onFilterPress}
      >
        <Image 
          source={require('../../assets/images/pmo/ic_filter.png')}
          style={styles.filterIcon}
          contentFit="contain"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
  filterButton: {
    width: 44,
    height: 44,
    backgroundColor: Colors.white,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  filterIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.text,
  },
});
