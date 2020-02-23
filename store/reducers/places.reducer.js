import { ADD_PLACE, SET_PLACES } from '../actions/places.actions';
import PlaceModel from '../../models/place.model';

const INITIAL_STATE = {
  places: []
};

export const placesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_PLACE: {
      const newPlace = new PlaceModel(
        action.payload.id.toString(),
        action.payload.title,
        action.payload.image,
        action.payload.address,
        action.payload.coords.lat,
        action.payload.coords.lng
      );
      return {
        places: state.places.concat(newPlace)
      };
    }

    case SET_PLACES: {
      return {
        places: action.payload.map(
          place =>
            new PlaceModel(
              place.id.toString(),
              place.title,
              place.imageUri,
              place.address,
              place.lat,
              place.lng
            )
        )
      };
    }

    default:
      return state;
  }
};

export default placesReducer;
