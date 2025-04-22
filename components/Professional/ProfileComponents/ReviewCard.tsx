import React from 'react';
import { View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface ReviewCardProps {
  review_id: number;
  reviewer_name: string;
  rating: number;
  comment: string;
  project_title: string;
}

const ReviewCard = ({
  review_id,
  reviewer_name,
  rating,
  comment,
  project_title,
}: ReviewCardProps) => {
    
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <AntDesign
          key={i}
          name="star"
          size={16}
          color={i <= rating ? 'gold' : '#ccc'}
          style={{ marginRight: 2 }}
        />
      );
    }
    return stars;
  };

  return (
    <View className="mb-4 rounded-xl p-3">
      <Text className="text-base font-semibold text-blue-500">{project_title}</Text>
      <Text className="text-sm text-gray-700">Contratado por {reviewer_name}</Text>
      <Text className="mt-1 text-xs italic text-gray-600">Comentarios: {comment}</Text>
      <View className="mt-2 flex-row">{renderStars()}</View>
    </View>
  );
};

export default ReviewCard;
