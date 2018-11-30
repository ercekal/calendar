import React, { Component } from 'react';
import styled from 'styled-components'
import CalendarDays from './components/CalendarDays'
import Weekdays from './components/WeekDays'

const Calendar = styled.div`
  border: 1px solid black;  
  max-width: 924px;
`

const CalendarDaysList = styled(CalendarDays)`
  border: 1px solid black;  
  max-width: 924px;
`
class App extends Component {
  render() {
    return (
      <div>
        <Calendar>
          <Weekdays />
          <CalendarDaysList />
        </Calendar>
      </div>
    );
  }
}

export default App;
