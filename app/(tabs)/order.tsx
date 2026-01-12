import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { StyleSheet, Text, View } from 'react-native';

export default function Order() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Order Screen</Text>
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
});
