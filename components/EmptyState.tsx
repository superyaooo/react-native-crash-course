import { View, Text, Image } from 'react-native'
import images from '../constants/images';
import CustomButton from './CustomButton';
import { router } from 'expo-router';

interface EmptyStateProps {
    title: string;
    subtitle: string;
}

const EmptyState = ({ title, subtitle }: EmptyStateProps): JSX.Element => {
    return (
        <View className='justify-center items-center px-4'>
            <Image
            source={images.empty}
            className='w-[270px] h-[215px]'
            resizeMode='contain'
        />
        <Text className='font-pmedium text-sm text-gray-100'>
            {title}
        </Text>
        <Text className='text-2xl font-psemibold text-white'>
            {subtitle}
        </Text>
          
        <CustomButton
            title='Create video'
            handlePress={() => router.push('/create')}
            containerStyles='w-full my-5'
        />
    </View>
  );
}

export default EmptyState