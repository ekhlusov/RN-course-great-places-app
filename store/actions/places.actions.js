import { documentDirectory, moveAsync } from 'expo-file-system';
import { fetchPlaces, insertPlace } from '../../helpers/db';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

export const addPlace = (title, image) => {
  return async dispatch => {
    // сохранение файла
    const fileName = image.split('/').pop();
    const newPath = documentDirectory + fileName;

    try {
      await moveAsync({
        from: image,
        to: newPath
      });

      // insert data to DB
      const dbResult = await insertPlace(
        title,
        newPath,
        'temp address',
        15.6,
        12.3
      );
      console.log('addPlace', dbResult);

      dispatch({
        type: ADD_PLACE,
        payload: { id: dbResult.insertId, title, image }
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
};

export const loadPlaces = () => {
  return async dispatch => {
    try {
      const dbResult = await fetchPlaces();
      console.log('fetchPlaces', dbResult);
      dispatch({ type: SET_PLACES, payload: dbResult.rows._array });
    } catch (e) {
      throw e;
    }
  };
};
