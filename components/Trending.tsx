import { View, Text, FlatList } from 'react-native'

interface Post {
    id: number
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
            <Text className='text-3xl text-white'>{item.id}</Text>
        )}
        horizontal
    />
   );
}

export default Trending