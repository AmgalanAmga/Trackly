import {useAuth} from '../hooks/useAuth';
import {useAuthContext} from '../context/AuthContext';
import React, {Dispatch, SetStateAction} from 'react';
import {useNavigation} from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import {View, Text, Image, Modal, Pressable} from 'react-native';
import {request, PERMISSIONS, PermissionStatus} from 'react-native-permissions';

type UserModalProps = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

export const UserModal = ({openModal, setOpenModal}: UserModalProps) => {
  const navigate = useNavigation();
  const {signout, updateStatus} = useAuth();
  const {credential, userId} = useAuthContext();

  const handleLogout = () => {
    updateStatus(userId, false);
    setOpenModal(false);
    navigate.goBack();
    signout();
  };

  const shareMyLocation = () => {
    request(PERMISSIONS.IOS.LOCATION_ALWAYS).then((res: PermissionStatus) => {
      if (res === 'granted') {
        Geolocation.getCurrentPosition(
          ({coords: {longitude, latitude}}) => {
            // setUserPosition({latitude, longitude});
            console.log(longitude, latitude);
          },
          err => {
            console.log(err.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  };

  return (
    <View>
      <Modal visible={openModal} transparent={true} animationType="slide">
        <View className="flex-1 justify-end bg-black/50">
          <View className="relative flex flex-col items-center bg-white p-6 rounded-t-2xl">
            <Image
              source={{
                uri: credential?.avatar,
              }}
              className="w-14 h-14 rounded-full mb-1"
            />
            <Pressable
              className="absolute top-2 right-5"
              onPress={() => setOpenModal(false)}
              hitSlop={{left: 5, right: 5, top: 5, bottom: 5}}>
              <Text className="text-3xl">-</Text>
            </Pressable>
            <View className="flex flex-col items-center space-y-3">
              <Text className="text-xl font-medium">
                {credential?.firstname} {credential?.lastname}
              </Text>
              <Pressable
                onPress={shareMyLocation}
                className="py-3 bg-[#0c1219] w-64 rounded-md active:bg-gray-700">
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
