import {useAuthContext} from '../context/AuthContext';
import React, {Dispatch, SetStateAction} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, Image, Modal, Pressable} from 'react-native';

type UserModalProps = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

export const UserModal = ({openModal, setOpenModal}: UserModalProps) => {
  const {credential, logout} = useAuthContext();
  const navigate = useNavigation();
  const handleLogout = () => {
    logout();
    setOpenModal(false);
    navigate.navigate('Login' as never);
  };
  return (
    <View>
      <Modal visible={openModal} transparent={true} animationType="slide">
        <View className="flex-1 justify-end bg-black/50">
          <View className="relative flex flex-col items-center bg-white pt-9 h-72 rounded-t-2xl">
            <Image
              source={{
                uri: credential?.avatar,
              }}
              className="w-14 h-14 rounded-full mb-3"
            />
            <Pressable
              className="absolute top-2 right-5"
              onPress={() => setOpenModal(false)}
              hitSlop={{left: 5, right: 5, top: 5, bottom: 5}}>
              <Text className="text-3xl">-</Text>
            </Pressable>
            <View className="flex flex-col items-center">
              <Text className="text-[#0c1219] text-xl font-medium mb-3">
                {credential?.firstname} {credential?.lastname}
              </Text>
              <Pressable className="py-3 bg-[#0c1219] mb-3 w-64 rounded-md">
                <Text className="text-center text-white">
                  Байршил хуваалцах
                </Text>
              </Pressable>
              <Pressable
                onPress={handleLogout}
                className="py-3 border border-gray-300 w-64 rounded-md active:bg-gray-100">
                <Text className="text-center">Гарах</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
