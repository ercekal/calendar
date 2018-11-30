import { OPEN_INPUT } from '../actions'
import { CLOSE_INPUT } from '../actions'

const INITIAL_STATE = {
  openInput: false,
  date: ''
}
export default function(state = INITIAL_STATE, action) {
    console.log(action);
  switch (action.type) {
    case OPEN_INPUT: 
    return true
    case CLOSE_INPUT: 
    return false
    default:
    return state
  }
}
