import { UPDATE_FAVOURITE, REMOVE_FAVOURITE } from '../actions/ActionTypes';
const initialState = {
favList:[],
}

export default (state = initialState, action) => {
  switch (action.type) {

    case UPDATE_FAVOURITE:
      return {
        ...state,
        favList: state.favList.concat(action.payload)
      };

    case REMOVE_FAVOURITE:
      let array = [...state.favList];
      let index = array.findIndex(obj => obj.char_id === action.payload.char_id);
      if(index != -1){
        array.splice(index, 1);
      }
      return {
        ...state,
        favList: array
      };
    
    default:
      return state
  }
};
