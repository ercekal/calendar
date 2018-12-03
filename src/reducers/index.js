import { combineReducers } from 'redux';
import ReminderDataReducer from './reminderDataReducer';
import InputReducer from './inputReducer';

const rootReducer = combineReducers({
  reminderData: ReminderDataReducer,
  input: InputReducer
});

export default rootReducer;