import { ADD_REMINDER, UPDATE_REMINDER, DELETE_REMINDER } from '../actions'

export default function(state = [], action) {
  switch (action.type) {
    case ADD_REMINDER:
    return [...state, action.payload]
    case UPDATE_REMINDER:
    return state.map((item, i) => {
      return item.id === action.payload.id ? item = action.payload : item
    })
    case DELETE_REMINDER:
    const itemId = action.payload;
    return state.filter(item => item.id !== itemId);
    default:
    return state
  }
}
