import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'
import { Link } from 'expo-router'

export default function App(): JSX.Element {
    return (
        <View className='flex-1 items-center justify-center bg-white'>
            <Text className='text-3xl font-pblack'>My first mobile app!</Text>
            <StatusBar style='auto' />
            <Link href='/home' style={{color: 'blue'}}>Go to Home</Link>
        </View>
    );
}

