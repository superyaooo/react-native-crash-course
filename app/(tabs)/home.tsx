import {
	View,
	Text,
	FlatList,
	Image,
	RefreshControl,
	Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import SearchInput from '../../components/SearchInput';
import Trending, { Post, TrendingProps } from '../../components/Trending';
import EmptyState from '../../components/EmptyState';
import { useEffect, useState } from 'react';
import { getAllPosts, getLatestPosts } from '../../lib/appwrite';
import { Models } from 'react-native-appwrite';
import useAppwrite from '../../lib/UseAppwrite';
import VideoCard from '../../components/VideoCard';

const Home = (): JSX.Element => {
	const { data: posts, isLoading, refetch } = useAppwrite(getAllPosts);
	const { data: latestPosts } = useAppwrite(getLatestPosts);

	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = async () => {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
	};

	const transformedPosts: TrendingProps = latestPosts.map((post) => ({
		id: post.$id,
		title: post.title,
		thumbnail: post.thumbnail,
		videoUrl: post.videoUrl,
		creator: post.creator
	}));

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
					<View className='my-6 px-4 space-y-6'>
						<View className='justify-between items-start flex-row mb-6'>
							<View>
								<Text className='font-pmedium text-sm text-gray-100'>Welcome Back</Text>
								<Text className='text-2xl font-psemibold text-white'>member</Text>
							</View>

							<View className='mt-1.5'>
								<Image
									source={images.logoSmall}
									className='w-9 h-10'
									resizeMode='contain'
								/>
							</View>
						</View>

						<SearchInput placeholder='Search for a video topic' />

						<View className='w-full flex-1 pt-5 pb-8'>
							<Text className='text-gray-100 text-lg font-pregular mb-3'>
								Latest videos
							</Text>

							<Trending posts={transformedPosts} />
						</View>
					</View>
				)}
				ListEmptyComponent={() => (
					<EmptyState
						title='No videos found'
						subtitle='Be the first one to upload a video'
					/>
				)}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			/>
		</SafeAreaView>
	);
};

export default Home;
