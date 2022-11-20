import { UPDATE_FAVOURITE, REMOVE_FAVOURITE } from './ActionTypes';

//To add to favourite list
export const updateFavourite = (character) => {
    return {
        type: UPDATE_FAVOURITE,
        payload:character
    }
}

//To remove from favourite list
export const removeFavourite = (character) => {
    return {
        type: REMOVE_FAVOURITE,
        payload:character
    }
}