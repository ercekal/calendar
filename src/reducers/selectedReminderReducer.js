import { SELECT_REMINDER } from '../actions'

export default function(state = [], action) {
    console.log(action);
    switch (action.type) {
    case SELECT_REMINDER:
    return [...state.selectedReminder, action.payload]
    default:
    return state
  }
}