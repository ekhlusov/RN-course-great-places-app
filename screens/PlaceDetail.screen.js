import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const PlaceDetailScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>PlaceDetailScreen component</Text>
    </View>
  );
};

PlaceDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('placeTitle')
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});

export default PlaceDetailScreen;
