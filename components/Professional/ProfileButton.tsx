import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import PerfilModal from './Professional/PerfilModal';

export default function ProfileButton() {
  const [profileVisible, setProfileVisible] = useState(false);

  const openProfile = () => {
    setProfileVisible(true);
  };

  return (
    <View>
      <TouchableOpacity
        className="mr-4 h-10 w-10 overflow-hidden rounded-full"
        onPress={() => {
          openProfile();
        }}>
        <Image
          className="h-full w-full"
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135768.png',
          }}
        />
      </TouchableOpacity>
      <PerfilModal visible={profileVisible} onClose={() => setProfileVisible(false)} />
    </View>
  );
}
