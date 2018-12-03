import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components'
import Reminder from './Reminder'
import { 
  addReminder,
  updateReminder,
  deleteReminder,
  selectReminder,
  selectDate
} from '../actions';
import {isEmpty, filter, orderBy} from 'lodash'

const Day = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  border: 1px solid black;
  width: 130px;
  height: 150px;
`
class CalendarDay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showInput: false,
      reminders: []
    }
  }

  toggleInput = () => {
    this.setState({showInput: true})
  };

  renderReminders() {
    const {calendarData, date, selectReminder} = this.props

    let orderedReminders
    if(!isEmpty(calendarData)) {
      const reminders = filter(calendarData, (o) => o.date === date);
      orderedReminders = orderBy(reminders, ['time'],['asc'])
    }
    if(!isEmpty(orderedReminders)) {
      return orderedReminders.map((r, i) => <Reminder item={r} key={i} onClick={selectReminder}/>)
    }
  }
  
  onClick = (event) => {
		event.preventDefault()
    this.props.selectDate(this.props.date)
  }

  render() {
    return (
      <div>
        <Day>
          {this.props.date}
          {this.renderReminders()}
          <button onClick={this.onClick}>Add reminder</button>
        </Day>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
    addReminder,
    updateReminder,
    deleteReminder,
    selectReminder,
    selectDate
  }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    calendarData: state.calendarData
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarDay);
