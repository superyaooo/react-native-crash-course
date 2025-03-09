import { View, Text, FlatList } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { Creator, VideoCardProps } from './VideoCard';

const TrendingItem = () => {
    return (
        <Animatable.View>

        </Animatable.View>
    )
}

export interface Post extends VideoCardProps {
    id: number;
}
interface TrendingProps {
    posts: Post[]
}

const Trending = ({posts} : TrendingProps):JSX.Element => {
  return (
    <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <Text className='text-3xl text-white'>{item.title}</Text>
        )}
        horizontal
    />
   );
}

export default Trending