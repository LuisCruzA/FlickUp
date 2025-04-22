import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity, Image } from 'react-native';

import ContratosC from '../../Screens/Cliente/ContratosC';
import Profesionales from '../../Screens/Cliente/Profesionales';
import Mensajes from '../../Screens/Mensajes';


import ProfileButton from '../Professional/ProfileButton';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Profesionales"
      screenOptions={{
        tabBarActiveTintColor: '#000',
        headerShadowVisible: false,
        headerTitleAlign: 'left',
      }}>
      <Tab.Screen
        name="Profesionales"
        component={Profesionales}
        options={{
          headerTitle: 'Profesionales',
         headerRight: () => <ProfileButton/>,
          tabBarIcon: ({ color, focused }) => {
            return <FontAwesome name="search" solid={focused} size={24} color={color} />;
          },
          //   headerShown: false,
        }}
      />
      <Tab.Screen
        name="Contratos"
        component={ContratosC}
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
