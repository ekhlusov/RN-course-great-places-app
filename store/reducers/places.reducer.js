import { ADD_PLACE } from '../actions/places.actions';
import PlaceModel from '../../models/place.model';

const INITIAL_STATE = {
  places: []
};

export const placesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_PLACE: {
      const newPlace = new PlaceModel(
        new Date().toString(),
        action.payload.title
      );
      return {
        places: state.places.concat(newPlace)
      };
    }

    default:
      return state;
  }
};

export default placesReducer;
