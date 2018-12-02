import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components'
import {uid} from 'react-uid';
import ReminderInput from './ReminderInput'
import Reminder from './Reminder'
import { addReminder, updateReminder, deleteReminder, selectReminder, openInput } from '../actions';
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
    console.log(calendarData);

    let orderedReminders
    if(!isEmpty(calendarData)) {
      const reminders = filter(calendarData, (o) => o.date === date);
      orderedReminders = orderBy(reminders, ['time'],['asc'])
    }
    if(!isEmpty(orderedReminders)) {
      return orderedReminders.map((r, i) => <Reminder item={r} key={i} onClick={selectReminder}/>)
    }
  }

  render() {
    return (
      <div onClick={() => this.props.openInput(this.props.date)}>
        <Day>
          {this.props.date}
          {this.renderReminders()}
        </Day>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addReminder, updateReminder, deleteReminder, selectReminder, openInput }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    calendarData: state.calendarData,
    selectedReminder: state.selectedReminder
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarDay);
