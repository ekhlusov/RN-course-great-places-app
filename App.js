import React from 'react';
import PlacesNavigator from './navigation/Places.navigator';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import placesReducer from './store/reducers/places.reducer';
import { init } from './helpers/db';

// Init DB
init()
  .then(() => console.log('DB initialized'))
  .catch(err => console.log('DB err ' + err.message));

const rootReducer = combineReducers({
  places: placesReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
