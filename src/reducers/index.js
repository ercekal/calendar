import { combineReducers } from 'redux';
import CalendarDataReducer from './calendarDataReducer';
import SelectedReminderReducer from './selectedReminderReducer';
import InputReducer from './inputReducer';

const rootReducer = combineReducers({
  calendarData: CalendarDataReducer,
  input: InputReducer
  // selectedReminder: SelectedReminderReducer
});

export default rootReducer;