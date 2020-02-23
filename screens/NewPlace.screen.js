import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Button
} from 'react-native';
import { theme } from '../constants/theme';
import { useDispatch } from 'react-redux';
import { addPlace } from '../store/actions/places.actions';
import ImagePickerComponent from '../components/ImagePicker.component';
import LocationPickerComponent from '../components/LocationPicker.component';

const NewPlaceScreen = props => {
  const dispatch = useDispatch();
  const [titleValue, setTitleValue] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const titleChangeHandler = text => setTitleValue(text);

  const savePlaceHandler = () => {
    dispatch(addPlace(titleValue, selectedImage));
    props.navigation.goBack();
  };

  const imageTakenHandler = imagePath => setSelectedImage(imagePath);

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>

        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />

        <ImagePickerComponent onImageTaken={imageTakenHandler} />
        <LocationPickerComponent />

        <Button
          title="Save Place"
          color={theme.colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: 'Add Place'
};

const styles = StyleSheet.create({
  screen: {
    //flex: 1
  },
  form: {
    margin: 30
  },
  label: {
    fontSize: 18,
    marginBottom: 15
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 2
  }
});

export default NewPlaceScreen;
