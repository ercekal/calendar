import { SELECT_DATE, SELECT_REMINDER } from '../actions'

const INITIAL_STATE = {
  date: '',
  selectedReminder: {},
  id: ''
}
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SELECT_DATE:
    return Object.assign({}, state, {
      date: action.payload,
      selectedReminder: {}
    })
    case SELECT_REMINDER:
    return Object.assign({}, state, {
      date: '',
      selectedReminder: action.payload
    })
    default:
    return state
  }
}
