import { useLocalSearchParams } from 'expo-router'
import {
	View,
	Text,
	FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchInput from '../../components/SearchInput';
import EmptyState from '../../components/EmptyState';
import { useEffect } from 'react';
import { searchPosts } from '../../lib/appwrite';
import useAppwrite from '../../lib/UseAppwrite';
import VideoCard from '../../components/VideoCard';

const Search = (): JSX.Element => {
  const { query } = useLocalSearchParams();
  const currentQuery = query as string;
	const { data: posts, refetch } = useAppwrite(() => searchPosts(query as string));

  useEffect(() => {
    refetch()
  }, [query])

  return (
			<SafeAreaView className='bg-primary h-full'>
				<FlatList
					data={posts}
					keyExtractor={(item) => item.$id}
					renderItem={({ item }) => (
						<VideoCard
							title={item.title}
							thumbnail={item.thumbnail}
							videoUrl={item.videoUrl}
							creator={item.creator}
						/>
					)}
					ListHeaderComponent={() => (
						<View className='my-6 px-4'>
							<Text className='font-pmedium text-sm text-gray-100'>
								Search Results
							</Text>
							<Text className='text-2xl font-psemibold text-white'>{query}</Text>

							<View className='mt-6 mb-8'>
								<SearchInput initialQuery={currentQuery} />
							</View>
						</View>
					)}
					ListEmptyComponent={() => (
						<EmptyState
							title='No videos found'
							subtitle='No videos found for this search'
						/>
					)}
				/>
			</SafeAreaView>
		);
};

export default Search