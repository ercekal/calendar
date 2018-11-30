import React, { Component } from 'react';
import styled from 'styled-components'

const Day = styled.div`
  text-align: center;
  border: 1px solid black;
  width: 130px;
`
const List = styled.div`
  display: flex;
  max-width: 924px;
`
class DaysList extends Component {
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  renderDays () {
    return this.days.map(day => <Day key={day}>{day}</Day>)
  }
  render() {
    return (
      <List>
        {this.renderDays()}
      </List>
    );
  }
}

export default DaysList;
