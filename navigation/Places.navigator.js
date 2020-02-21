import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

// Screens
import PlacesListScreen from '../screens/PlacesList.screen';
import PlaceDetailScreen from '../screens/PlaceDetail.screen';
import NewPlaceScreen from '../screens/NewPlace.screen';
import MapScreen from '../screens/Map.screen';
import { theme } from '../constants/theme';
import { exp } from 'react-native-reanimated';

const PlacesNavigator = createStackNavigator(
  {
    Places: PlacesListScreen,
    PlaceDetail: PlaceDetailScreen,
    NewPlace: NewPlaceScreen,
    Map: MapScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: theme.colors.primary
      },
      headerTintColor: 'white'
    }
  }
);

export default createAppContainer(PlacesNavigator);
