import {UserModal} from './UserModal';
import React, {useState} from 'react';
import {useAuthContext} from '../context/AuthContext';
import {View, Text, Image, Pressable} from 'react-native';

export const BottomSheet = () => {
  const {credential} = useAuthContext();
  const [openModal, setOpenModal] = useState<boolean>(false);
  // const [shareMyPosition, setShareMyPosition] = useState<boolean>(false);

  return (
    <>
      <View className="absolute bottom-10 inset-x-0 flex flex-row pl-4 pt-3 pb-5 pr-2 z-10 bg-white">
        <Image
          source={{
            uri: credential?.avatar,
          }}
          className="w-12 h-12 rounded-full"
        />
        <View className="ml-4">
          <Text className="text-[#0c1219] font-medium">
            {credential?.firstname}
          </Text>
          <Text className="text-sm text-gray-400">
            Та байршлаа хуваалцаагүй байна.
          </Text>
        </View>
        <Pressable
          className="ml-10"
          onPress={() => setOpenModal(true)}
          hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}>
          <Text className="text-2xl">+</Text>
        </Pressable>
      </View>
      <UserModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};
