// JobInfoScreen.tsx
import React, { useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import SkillCard from 'components/Professional/ProfileComponents/SkillCard';
import { useNavigation } from '@react-navigation/native';
import type { Trabajo } from '~/types';
interface JobInfoProps {
  trabajo: Trabajo;
  onClose: () => void;
}

const mockSkills = [
  { name: 'Photoshop' },
  { name: 'Node.js' },
  { name: 'SEO' },
  { name: 'Carpintería' },
  { name: 'React' },
];

const JobInfoClient: React.FC<JobInfoProps> = ({ trabajo, onClose }) => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  const Closing = () => {
    navigation.setOptions({ headerShown: true });
    onClose();
  }
  const habilidades = trabajo.habilidadesRequeridas;
  return (
    <View className="absolute bottom-0 left-0 right-0 top-0 z-50 bg-white">
      <SafeAreaView className="flex-1">
        <View className="flex-row items-center border-b border-gray-200 px-4 py-2">
          <TouchableOpacity onPress={Closing}>
            <AntDesign name="arrowleft" size={28} color="black" />
          </TouchableOpacity>
          <View className="-ml-7 flex-1 items-center">
            <Text className="text-xl font-bold">Detalles del trabajo</Text>
          </View>
        </View>

        <ScrollView className="flex-1 space-y-6 px-6 py-4" showsVerticalScrollIndicator={false}>
          {/* Título del trabajo */}
          <View className="mb-3">
            <Text className="text-2xl font-bold text-gray-800">{trabajo.titulo}</Text>
            <Text className="text-sm text-gray-500">Publicado {trabajo.publicadoHace}</Text>
          </View>

          {/* Categoría y nivel */}
          <View className="space-y-1">
            <Text className="text-base font-semibold text-blue-600">
              Categoría: {trabajo.categoria}
            </Text>
            <Text className="text-base text-gray-700">Nivel: {trabajo.nivelComplejidad}</Text>
          </View>

          {/* Precio */}
          <View className="flex-row items-center space-x-2">
            <Text className="mr-2 text-xl font-bold text-blue-600">{trabajo.precio}</Text>
            <Text className="text-sm text-gray-500">Pago fijo</Text>
          </View>

          {/* Estado del trabajo */}
          <Text
            className={`text-sm font-medium ${trabajo.estado.trim() === 'Activo' ? 'text-green-600' : 'text-red-500'}`}>
            {trabajo.estado}
          </Text>

          {/* Descripción */}
          <View className="my-4">
            <Text className="mb-1 text-lg font-semibold text-black">Descripción</Text>
            <Text className="leading-relaxed text-gray-700">{trabajo.descripcion}</Text>
          </View>

          {/* Habilidades requeridas */}
          <View>
            <Text className="mb-2 text-lg font-semibold  text-black">Habilidades requeridas</Text>
            <View className="flex-row flex-wrap gap-2">
              {mockSkills.map((skill, index) => (
                <SkillCard key={index} name={skill.name} />
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default JobInfoClient;
