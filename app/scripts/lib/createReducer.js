import Immutable, { Map, List } from 'immutable';


export default function createReducer(initialState, handlers) {
  return (state = initialState, action) => {
    if (!Map.isMap(state) && !List.isList(state)) {
      state = Immutable.fromJS(state);
    }

    const handler = handlers(state, action);

    if (!handler) {
      return state;
    }

    const newState = handler(state, action);

    if (!Map.isMap(newState) && !List.isList(newState)) {
      throw new TypeError('Reducers must return Immutable objects.');
    }

    return newState;
  }

}