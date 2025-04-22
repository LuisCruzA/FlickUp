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
        <View className="items-top flex-row items-center p-1">
          <View className="h-24 w-24 items-start overflow-hidden rounded-full border-2 border-gray-300">
            <Image
              className="h-full w-full object-cover"
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135768.png',
              }}
            />
          </View>
          <View className="items-start p-5">
            <Text className="text-2xl font-bold">Juan Pérez</Text>
            <Text className="text-base font-normal">CDMX, México</Text>
          </View>
        </View>
        {/* Descripcion y datos */}
        <View className="mb-6">
          <Text className="text-back text-xl font-semibold">Mecánico Automotriz</Text>
          <Text className="mt-1 font-semibold text-black">$100.00 MXN/hr</Text>
          <Text className="mt-2 text-sm text-gray-700">
            Descripción del perfil. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </View>
        {/* Historial de trabajos */}
        <View className="mb-6">
          <Text className="mb-2 text-lg font-semibold">Historial de trabajos</Text>
          <FlatList
            data={mockReviews}
            keyExtractor={(item: any) => item.review_id}
            renderItem={({ item }) => (
              <ReviewCard
                review_id={item.review_id}
                reviewer_name={item.reviewer_name}
                rating={item.rating}
                comment={item.comment}
                project_title={item.project_title}
              />
            )}
          />
        </View>
        {/* Habilidades */}
        <View className="mb-6">
          <Text className="mb-2 text-lg font-semibold">Habilidades</Text>
          <View className="flex-row flex-wrap gap-2">
            {mockSkills.map((skill, index) => (
              <SkillCard key={index} name={skill.name} />
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PerfilModal;
