import { Image, Text, FlatList, TouchableOpacity, ImageBackground, ViewStyle, TextStyle, ImageStyle } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { Creator, VideoCardProps } from './VideoCard';
import { useState } from 'react';
import { icons } from '../constants';
import { ResizeMode, Video } from 'expo-av'

const zoomIn: Animatable.CustomAnimation<ViewStyle & TextStyle & ImageStyle> = {
    0: { transform: [{ scale: 0.9 }] },
    1: { transform: [{ scale: 1 }] }
}

const zoomOut: Animatable.CustomAnimation<ViewStyle & TextStyle & ImageStyle> = {
	0: { transform: [{ scale: 1 }] },
    1: { transform: [{ scale: 0.9 }] }
};

interface TrendingItemProps {
	activeItem: Post;
	item: Post; 
}

const TrendingItem = ({activeItem, item}: TrendingItemProps) => {
    const [play, setPlay] = useState(false);
    
    return (
        <Animatable.View
            className='mr-5'
            animation={activeItem.id === item.id ? zoomIn : zoomOut}
            duration={500}
            easing='ease-in-out'
        >
            {play ? (
                <Video
                    source={{ uri: item.videoUrl }}
                    className='w-52 h-72 rounded-[35px] mt-3 bg-white/10'
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls
                    shouldPlay
                />
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

const Trending = ({ posts }: TrendingProps): JSX.Element => {
    const [activeItem, setActiveItem] = useState<Post>(posts[0]);
  
    const viewableItemsChanged = ({ viewableItems }: { viewableItems: Array<{ item: Post }> }): void => {
        if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0].item)
        }
    }

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
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{
            itemVisiblePercentThreshold: 70
        }}
        contentOffset={{x: 170, y:0}}
        horizontal
    />
   );
}

export default Trending