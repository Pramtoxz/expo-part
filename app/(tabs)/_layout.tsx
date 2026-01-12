import { Colors } from '@/constants/Colors';
import { Image } from 'expo-image';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray,
        headerShown: false,
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/pmo/ic_homepage.png')}
              style={{ width: 24, height: 24 }}
              tintColor={focused ? Colors.primary : Colors.gray}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: 'Order',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/pmo/ic_order.png')}
              style={{ width: 24, height: 24 }}
              tintColor={focused ? Colors.primary : Colors.gray}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="collection"
        options={{
          title: 'Collection',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/pmo/ic_money_withdrawal.png')}
              style={{ width: 24, height: 24 }}
              tintColor={focused ? Colors.primary : Colors.gray}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/pmo/ic_profile.png')}
              style={{ width: 24, height: 24 }}
              tintColor={focused ? Colors.primary : Colors.gray}
            />
          ),
        }}
      />
    </Tabs>
  );
}
