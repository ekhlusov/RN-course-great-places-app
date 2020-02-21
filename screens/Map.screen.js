import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const MapScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>MapScreen component</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});

export default MapScreen;
