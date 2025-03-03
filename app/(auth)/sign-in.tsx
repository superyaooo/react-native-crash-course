import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import { useState } from 'react'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { EmailPasswordProps, signIn } from '../../lib/appwrite'

interface FormState {
  email: string;
  password: string;
}

const SignIn = ():JSX.Element => {
  const [form, setForm] = useState<FormState>({
    email: '',
    password: ''
  })

  const [isSubmitting, setisSubmitting] = useState<boolean>(false)

  const validateForm = (): boolean => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return false;
    }

    return true;
  }

  const submit = async(): Promise<void> => {
    if (!validateForm) {
      return;
    }

    setisSubmitting(true);

    try {
      let userCreds: EmailPasswordProps = {
        email: form.email,
        password: form.password
      }
      await signIn(userCreds);

      router.replace('/home');
    } catch (error: any) {
      Alert.alert('Error', error.message)
    } finally {
      setisSubmitting(false);
    }
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[83vh] px-4 my-6'>
          <Image source={images.logo} resizeMode='contain' className='w-[115px] h-[35px]'/>
        
          <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>Log in</Text>

          <FormField
            title='Email'
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles='mt-7'
            keyboardType='email-address'
          />
          <FormField
            title='Password'
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles='mt-7'
          />

          <CustomButton
            title='Sign In'
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />

          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Don't have an account?
            </Text>
            <Link href='/sign-up' className='text-lg text-secondary font-psmibold'>Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn