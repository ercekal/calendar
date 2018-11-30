import { ADD_REMINDER } from '../actions'
import { UPDATE_REMINDER } from '../actions'
import { DELETE_REMINDER } from '../actions'

export default function(state = [], action) {
    console.log(action);
  switch (action.type) {
    case ADD_REMINDER:
    return [...state, action.payload]
    case UPDATE_REMINDER:
    return [...state, action.payload]
    case DELETE_REMINDER:
    return [...state, action.payload]
    default:
    return state
  }
}
