import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { icons } from '../constants';

interface FormFieldProps {
    title: string;
    value: string;
    placeholder?: string;
    handleChangeText: (e: string) => void;
    otherStyles: string;
    keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
}

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, keyboardType = 'default' }: FormFieldProps): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false)
    
  return (
    <View className={`space-y-2 ${otherStyles}`}>
          <Text className='text-base text-gray-100 font-pmedium'>{title}</Text>
          <View className='w-full border-2 border-black-200 h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row'>
              <TextInput
                  className='flex-1 text-white font-psemibold text-base'
                  placeholder={placeholder}
                  placeholderTextColor='#7b7b8'
                  onChangeText={handleChangeText}
                  secureTextEntry={title === 'Password' && !showPassword}
                  keyboardType={keyboardType}
              />
              {title === 'Password' && (
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      <Image source={!showPassword ? icons.eye : icons.eyeHide} className='w-6 h-6' resizeMode='contain'/>
                  </TouchableOpacity>
              )}
          </View>
    </View>
  )
}

export default FormField