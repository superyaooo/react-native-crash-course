import { View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { icons } from '../constants';
import { router, usePathname } from 'expo-router';
import { useState } from 'react';

interface SearchInputProps {
	initialQuery: string;
}

const SearchInput = ({initialQuery}: SearchInputProps): JSX.Element => {
    const pathname = usePathname();
    const [query, setQuery] = useState<string>(initialQuery || '');

	return (
        <View className='w-full border-2 border-black-200 h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4'>
            <TextInput
                className='flex-1 text-white text-base mt-0.5 font-pregular'
                value={query}
                placeholder='search for a video topic'
                placeholderTextColor='#CDCDE0'
                onChangeText={(e) => setQuery(e)}
            />

            <TouchableOpacity
                onPress={() => {
                    if (!query) {
                        return Alert.alert('Missing query', 'Please input something to search results')
                    }

                    if (pathname.startsWith('/search')) {
                        router.setParams({query})
                    } else {
                        router.push(`/search/${query}`)
                    }
                }}
            >
                <Image
                    source={icons.search}
                    className='w-5 h-5'
                    resizeMode='contain'
                />
            </TouchableOpacity>
        </View>
	);
};

export default SearchInput;
