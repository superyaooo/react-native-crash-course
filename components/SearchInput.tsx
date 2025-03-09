import { View, TextInput, TouchableOpacity, Image } from 'react-native';
import { icons } from '../constants';

interface SearchInputProps {
	placeholder: string;
}

const SearchInput = ({
	placeholder
}: SearchInputProps): JSX.Element => {

	return (
        <View className='w-full border-2 border-black-200 h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4'>
            <TextInput
                className='flex-1 text-white text-base mt-0.5 font-pregular'
                placeholder={placeholder}
                placeholderTextColor='#7b7b8b'
            />

            <TouchableOpacity>
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
