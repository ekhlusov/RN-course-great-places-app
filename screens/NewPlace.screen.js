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

const NewPlaceScreen = props => {
  const dispatch = useDispatch();
  const [titleValue, setTitleValue] = useState('');

  const titleChangeHandler = text => setTitleValue(text);

  const savePlaceHandler = () => {
    dispatch(addPlace(titleValue));
    props.navigation.goBack();
  };

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>

        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />

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
