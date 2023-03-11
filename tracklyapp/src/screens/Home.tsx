import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {BottomSheet, GetLocation} from '../components';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const Home = () => {
  return (
    <SafeAreaView className="relative flex-1 bg-white">
      <GestureHandlerRootView>
        <View className="absolute top-0 inset-x-0 z-10 bg-white py-3.5">
          <Text className="font-bold pl-8">Миний байршил</Text>
        </View>
        <BottomSheet />
        <GetLocation />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default Home;
