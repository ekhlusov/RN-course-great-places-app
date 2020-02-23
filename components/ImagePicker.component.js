import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, Alert, Image } from 'react-native';
import { theme } from '../constants/theme';
import { launchCameraAsync } from 'expo-image-picker';
import { askAsync, CAMERA, CAMERA_ROLL } from 'expo-permissions';

const ImagePickerComponent = props => {
  const [pickedImage, setPickedImage] = useState(null);

  const verifyPermissions = async () => {
    const result = await askAsync(CAMERA, CAMERA_ROLL);
    if (result.status !== 'granted') {
      Alert.alert(
        'Permissions error',
        'You need to grant camera permissions to use this app',
        [{ text: 'Ok' }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermissions = await verifyPermissions();
    if (!hasPermissions) {
      return;
    }
    const takenImage = await launchCameraAsync({
      //allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    });

    setPickedImage(takenImage.uri);

    props.onImageTaken(takenImage.uri);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>No image picked yet.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <Button
        title="Take image"
        color={theme.colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    marginBottom: 15
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1
  },
  image: {
    width: '100%',
    height: '100%'
  }
});

export default ImagePickerComponent;
