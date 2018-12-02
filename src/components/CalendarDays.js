import React, { Component } from 'react';
import CalendarDay from './CalendarDay'
import styled from 'styled-components'

const EmptyDay = styled.div`
  background-color: gray;
  border: 1px solid black;
  width: 130px;
  height: 150px;
`
const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 924px;
`

class CalendarDays extends Component {
  renderMonth() {
    const days = []
    for (let i = 1; i < 36; i++) {
      if(i < 32) {
        days.push(<CalendarDay date={i} key={i} />)
      } else {
        days.push(<EmptyDay key={i} />)
      }
    }
    return days.map(day => day)
  }
  render() {
    return (
      <List>
        {this.renderMonth()}
      </List>
    )
  }
}

export default CalendarDays;
