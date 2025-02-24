import { View, Text, Image, ImageSourcePropType } from 'react-native'
import { Tabs, Redirect } from 'expo-router'
import { icons } from '../../constants';

interface TabIconProps {
  icon: ImageSourcePropType;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon = ({icon,color,name,focused}: TabIconProps) => {
  return (
    <View className='items-center justify-center gap-2'>
      <Image
        source={icon}
        resizeMode='contain'
        tintColor={color}
        className='w-6 h-6'
      />
      {/* 'w-full' in <Text> is very important here to ensure the tab text remain on one line (no wrap) */}
      <Text
        className={`${focused ? 'font-psemibold' : 'font-pregular'} text-s w-full`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
			<>
				<Tabs
					screenOptions={{
						tabBarShowLabel: false,
						tabBarStyle: {
							paddingTop: 20,
              backgroundColor: '#161622',
              borderTopWidth: 1,
              borderTopColor: '#232533',
						},
						tabBarActiveTintColor: '#FFA001',
						tabBarInactiveTintColor: '#CDCDE0',
					}}>
					<Tabs.Screen
						name='home'
						options={{
							title: 'Home',
							headerShown: false,
							tabBarIcon: ({ color, focused }) => (
								<TabIcon
									icon={icons.home}
									color={color}
									name='Home'
									focused={focused}
								/>
							),
						}}
					/>
					<Tabs.Screen
						name='bookmark'
						options={{
							title: 'Bookmark',
							headerShown: false,
							tabBarIcon: ({ color, focused }) => (
								<TabIcon
									icon={icons.bookmark}
									color={color}
									name='Bookmark'
									focused={focused}
								/>
							),
						}}
					/>
					<Tabs.Screen
						name='create'
						options={{
							title: 'Create',
							headerShown: false,
							tabBarIcon: ({ color, focused }) => (
								<TabIcon
									icon={icons.plus}
									color={color}
									name='Create'
									focused={focused}
								/>
							),
						}}
					/>
					<Tabs.Screen
						name='profile'
						options={{
							title: 'Profile',
							headerShown: false,
							tabBarIcon: ({ color, focused }) => (
								<TabIcon
									icon={icons.profile}
									color={color}
									name='Profile'
									focused={focused}
								/>
							),
						}}
					/>
				</Tabs>
			</>
		);
}

export default TabsLayout