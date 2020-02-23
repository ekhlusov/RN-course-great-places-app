import { ADD_PLACE, SET_PLACES } from '../actions/places.actions';
import PlaceModel from '../../models/place.model';

const INITIAL_STATE = {
  places: []
};

export const placesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_PLACE: {
      console.log('ADD_PLACE', action.payload);
      const newPlace = new PlaceModel(
        action.payload.id.toString(),
        action.payload.title,
        action.payload.image
      );
      return {
        places: state.places.concat(newPlace)
      };
    }

    case SET_PLACES: {
      return {
        places: action.payload.map(
          place =>
            new PlaceModel(place.id.toString(), place.title, place.imageUri)
        )
      };
    }

    default:
      return state;
  }
};

export default placesReducer;
