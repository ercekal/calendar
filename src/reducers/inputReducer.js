import { OPEN_INPUT, CLOSE_INPUT, SELECT_REMINDER } from '../actions'

const INITIAL_STATE = {
  openInput: false,
  date: '',
  selectedReminder: {}
}
export default function(state = INITIAL_STATE, action) {
    console.log(action);
  switch (action.type) {
    case OPEN_INPUT:
    return Object.assign({}, state, {
      openInput: true,
      date: action.payload
    })
    case SELECT_REMINDER:
    return Object.assign({}, state, {
      openInput: true,
      selectedReminder: action.payload,
      date: action.payload.date
    })
    case CLOSE_INPUT:
    return INITIAL_STATE
    default:
    return state
  }
}
