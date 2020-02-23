import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  ActivityIndicator,
  Alert
} from 'react-native';
import { theme } from '../constants/theme';
import { askAsync, LOCATION } from 'expo-permissions';
import { getCurrentPositionAsync } from 'expo-location';
import MapPreviewComponent from './MapPreview.component';

const LocationPickerComponent = props => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState(null);

  const pickedLocationFromMap = props.navigation.getParam('pickedLocation');

  useEffect(() => {
    if (pickedLocationFromMap) {
      setPickedLocation(pickedLocationFromMap);
      props.onLocationPicked(pickedLocationFromMap);
    }
  }, [pickedLocationFromMap]);

  const verifyPermissions = async () => {
    const result = await askAsync(LOCATION);
    if (result.status !== 'granted') {
      Alert.alert(
        'Permissions error',
        'You need to grant location permissions to use this app',
        [{ text: 'Ok' }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermissions = await verifyPermissions();

    if (!hasPermissions) {
      return;
    }

    try {
      setIsFetching(true);
      const location = await getCurrentPositionAsync({ timeInterval: 5000 });
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });
      props.onLocationPicked({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });
    } catch (e) {
      Alert.alert("Could't fetch location", 'Try again later', [
        { text: 'OK' }
      ]);
    }
    setIsFetching(false);
  };

  const pickOnMapHandler = () => props.navigation.navigate('Map');

  return (
    <View style={styles.screen}>
      <MapPreviewComponent
        style={styles.mapPreview}
        location={pickedLocation}
        onPress={pickOnMapHandler}
      >
        {isFetching ? (
          <ActivityIndicator size="large" />
        ) : (
          <Text>No location chosen yet!</Text>
        )}
      </MapPreviewComponent>

      <View style={styles.actions}>
        <Button
          title="Get User Location"
          color={theme.colors.primary}
          onPress={getLocationHandler}
        />

        <Button
          title="Pick On Map"
          color={theme.colors.primary}
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    marginBottom: 15
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  }
});

export default LocationPickerComponent;
