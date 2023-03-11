import {Dimensions} from 'react-native';
import React, {useState} from 'react';
import MapView, {Marker} from 'react-native-maps';

export const GetLocation = () => {
  const [userPosition, setUserPosition] = useState<Coordinates>({
    latitude: 47.880848,
    longitude: 106.85904,
  });

  // useEffect(() => {
  //   request(PERMISSIONS.IOS.LOCATION_ALWAYS).then((res: PermissionStatus) => {
  //     if (res === 'granted') {
  //       Geolocation.getCurrentPosition(
  //         ({coords: {longitude, latitude}}) => {
  //           setUserPosition({latitude, longitude});
  //           console.log(longitude)
  //         },
  //         err => {
  //           console.log(err.message);
  //         },
  //         {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  //       );
  //     }
  //   });
  // }, []);

  return (
    <MapView
      style={{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      }}
      initialRegion={{
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
        latitude: userPosition.latitude,
        longitude: userPosition.longitude,
      }}
      showsUserLocation={true}>
      <Marker
        coordinate={{
          latitude: userPosition.latitude,
          longitude: userPosition.longitude,
        }}
        pinColor="gold"
      />
    </MapView>
  );
};
