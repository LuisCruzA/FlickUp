import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { View, Text, TouchableOpacity, Modal, Image, FlatList } from 'react-native';

import ReviewCard from './ProfileComponents/ReviewCard';
import SkillCard from './ProfileComponents/SkillCard';

const PerfilModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  const mockReviews = [
    {
      review_id: 1,
      reviewer_name: 'Cliente 1',
      rating: 1,
      comment: 'Muy buen servicio!!',
      project_title: 'Trabajo 1',
    },
    {
      review_id: 2,
      reviewer_name: 'Cliente 2',
      rating: 5,
      comment: 'Excelente atención.',
      project_title: 'Cambio de frenos',
    },
  ];

  const mockSkills = [
    { name: 'Reparación de automóviles' },
    { name: 'Limpieza de autopartes' },
    { name: 'Limpieza de Hogares' },
    { name: 'Penesito rico'}
  ];

  return (
    <Modal transparent={false} visible={visible} animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 bg-white px-4 pt-12">
        {/* Header */}
        <View className="mb-2 flex-row items-center bg-white">
          <TouchableOpacity onPress={onClose} className="z-10">
            <AntDesign name="arrowleft" size={28} color="black" />
          </TouchableOpacity>
          <View className="flex-1 items-center">
            <Text className="text-xl font-bold">Profile</Text>
          </View>
        </View>
        {/* Imagen y datos */}
       
        
        <Text>aun no cuentas con sufuciente historial </Text>
       
      </View>
    </Modal>
  );
};

export default PerfilModal;
