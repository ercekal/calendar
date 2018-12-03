import { combineReducers } from 'redux';
import CalendarDataReducer from './calendarDataReducer';
import InputReducer from './inputReducer';

const rootReducer = combineReducers({
  calendarData: CalendarDataReducer,
  input: InputReducer
});

export default rootReducer;