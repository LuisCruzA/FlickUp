import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity, Image } from 'react-native';

import Contratos from '../Screens/Contratos';
import Mensajes from '../Screens/Mensajes';
import Trabajos from '../Screens/Trabajos';

import Notificaciones from 'Screens/Notificaciones';

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
          headerRight: () => (
            <TouchableOpacity style={{
                width: 40,
                height: 40,
                borderRadius: 9999,
                overflow: 'hidden',
                marginRight: 16,
              }}>
              <Image
              className='w-full h-full'
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135768.png',
                }}
              />
            </TouchableOpacity>
          ),
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
          tabBarIcon: ({ color, focused }) => {
            return <FontAwesome5 name="comments" solid={focused} size={24} color={color} />;
          },
          //headerShown: false,
        }}
      />
      <Tab.Screen
        name="Notificaciones"
        component={Notificaciones}
        options={{
          headerTitle: 'Notificaciones',
          tabBarIcon: ({ focused, color }) => {
            return <FontAwesome5 name="bell" solid={focused} size={24} color={color} />;
          },
          //headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
