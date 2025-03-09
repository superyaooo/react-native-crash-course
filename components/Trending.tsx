import { Image, Text, FlatList, TouchableOpacity, ImageBackground } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { Creator, VideoCardProps } from './VideoCard';
import { useState } from 'react';
import { icons } from '../constants';

const zoomIn = {
    0: {
       scale: 0.9
    },
    1: {
        scale: 1
    }
}

const zoomOut = {
    0: {
        scale: 1
    },
    1: {
        scale: 0.9
    }
}

interface TrendingItemProps {
	activeItem: Post;
	item: Post; 
}

const TrendingItem = ({activeItem, item}: TrendingItemProps) => {
    const [play, setPlay] = useState(false);
    
    return (
        <Animatable.View
            className='mr-5'
            animation={activeItem.id === item.id ? 'zoomIn' : 'zoomOut'}
            duration={500}
            easing='ease-in-out'
        >
            {play ? (
                <Text className='text-white'>Playing</Text>
                ): (
                    <TouchableOpacity className='relative justify-center items-center'
                        activeOpacity={0.7}
                        onPress={() => setPlay(true)}
                    >
                        <ImageBackground
                            source={{
                                uri: item.thumbnail
                            }}
                            className='w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40'
                            resizeMode='cover'
                        />

                        <Image
                            source={icons.play}
                            className='w-12 h-12 absolute'
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                )
            }
        </Animatable.View>
    )
}

export interface Post extends VideoCardProps {
    id: string;
}
export interface TrendingProps {
    posts: Post[]
}

const Trending = ({ posts } : TrendingProps):JSX.Element => {
    const [activeItem, setActiveItem] = useState<Post>(posts[0]);
  
    return (
    <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <TrendingItem
                activeItem={activeItem}
                item={item}
            />
        )}
        horizontal
    />
   );
}

export default Trending