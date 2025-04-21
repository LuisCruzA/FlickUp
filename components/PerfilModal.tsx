import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const PerfilModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  return (
    <Modal transparent={false} visible={visible} animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 bg-white px-4 pt-12">
        <TouchableOpacity onPress={onClose} className="mb-6">
          <AntDesign name="arrowleft" size={28} color="black" />
        </TouchableOpacity>
        <View className="flex-1 items-center justify-center">
          <Text className="text-4xl font-bold text-black">Lo que sea</Text>
        </View>
      </View>
    </Modal>
  );
};

export default PerfilModal;
