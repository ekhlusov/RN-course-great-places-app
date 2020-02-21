import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderButton.component';
import { useSelector } from 'react-redux';
import PlaceItem from '../components/PlaceItem.component';

const PlacesListScreen = props => {
  const places = useSelector(state => state.places.places);

  return (
    <FlatList
      data={places}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <PlaceItem
          image={null}
          title={itemData.item.title}
          address={null}
          onSelect={() => {
            props.navigation.navigate('PlaceDetail', {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id
            });
          }}
        />
      )}
    />
  );
};

PlacesListScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All Places',
    headerRight: () => (
      <HeaderButtons
        title="Add Place"
        HeaderButtonComponent={CustomHeaderButton}
      >
        <Item
          title="Add Place"
          iconName="md-add"
          onPress={() => navData.navigation.navigate('NewPlace')}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});

export default PlacesListScreen;
