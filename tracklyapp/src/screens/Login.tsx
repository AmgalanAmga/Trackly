import {
  View,
  Text,
  Image,
  Alert,
  TextInput,
  Pressable,
  SafeAreaView,
} from 'react-native';
import {database} from '../firebase';
import React, {useState} from 'react';
import {useAuthContext} from '../context/AuthContext';
import {ref, onValue, update} from 'firebase/database';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const navigate = useNavigation();
  const {signin, setCredential, setUserId} = useAuthContext();
  const [userData, setUserData] = useState<LoginArgs>({
    email: '',
    password: '',
  });
  const handleChanges = (val: string, name: string) => {
    setUserData({...userData, [name]: val});
  };
  const pushToHome = async () => {
    if (!userData.email || !userData.password) {
      return Alert.alert('Имэйл болон нууц үгээ оруулна уу!');
    }
    const res = await signin(userData.email, userData.password);
    setUserId(res.user.uid);
    const driverRef = ref(database, 'drivers/' + res.user.uid);
    onValue(driverRef, snapshot => {
      const driversDetail = snapshot.val();
      setCredential(driversDetail);
      update(ref(database, 'drivers/' + res.user.uid), {loggedIn: true});
    });
    navigate.navigate('Home' as never);
  };

  return (
    <SafeAreaView className="flex-1 items-center bg-white">
      <View className="pt-[192px] px-10 w-full">
        <Image
          alt="logo"
          style={{width: 180, height: 54}}
          source={require('../../assets/logo.png')}
        />
        <TextInput
          placeholder="И-мэйл"
          onChangeText={val => handleChanges(val, 'email')}
          className="mt-12 mb-6 border border-[#cecccc] py-3 pl-5 rounded-md"
        />
        <TextInput
          secureTextEntry
          placeholder="Нууц үг"
          onChangeText={val => handleChanges(val, 'password')}
          className="mb-16 border border-[#cecccc] py-3 pl-5 rounded-md"
        />
        <Pressable
          onPress={pushToHome}
          className="bg-[#0c1219] active:bg-black/60 py-3 rounded-md">
          <Text className="text-white text-center font-semibold">НЭВТРЭХ</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Login;
