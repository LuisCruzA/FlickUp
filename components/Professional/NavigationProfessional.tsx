import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity, Image } from 'react-native';

import Contratos from '../../Screens/Professional/Contratos';
import Mensajes from '../../Screens/Mensajes';
import Trabajos from '../../Screens/Professional/Trabajos';

import Finanzas from 'Screens/Professional/Finanzas';
import ProfileButton from './ProfileButton';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Trabajos"
      screenOptions={{
        tabBarActiveTintColor: '#000',
        headerShadowVisible: false,
        headerTitleAlign: 'left',
      }}>
      <Tab.Screen
        name="Trabajos"
        component={Trabajos}
        options={{
          headerTitle: 'Trabajos',
          headerRight: () => <ProfileButton/>,
          tabBarIcon: ({ color, focused }) => {
            return <FontAwesome name="search" solid={focused} size={24} color={color} />;
          },
          //   headerShown: false,
        }}
      />
      <Tab.Screen
        name="Contratos"
        component={Contratos}
        options={{
          headerTitle: 'Contratos',
          headerRight: () => <ProfileButton/>,
          tabBarIcon: ({ color, focused }) => {
            return <FontAwesome5 name="file-alt" solid={focused} size={24} color={color} />;
          },
          //headerShown: false,
        }}
      />
      <Tab.Screen
        name="Mensajes"
        component={Mensajes}
        options={{
          headerTitle: 'Mensajes',
          headerRight: () => <ProfileButton/>,
          tabBarIcon: ({ color, focused }) => {
            return <FontAwesome5 name="comments" solid={focused} size={24} color={color} />;
          },
          //headerShown: false,
        }}
      />
      <Tab.Screen
        name="Finanzas"
        component={Finanzas}
        options={{
          headerTitle: 'Finanzas',
          headerRight: () => <ProfileButton/>,
          tabBarIcon: ({ focused, color }) => {
            return <FontAwesome5 name="bell" solid={focused} size={24} color={color} />;
          },
          //headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default function NavigationProfessional() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
