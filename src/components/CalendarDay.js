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
  height: 200px;
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

  onSubmit = (data) => {
    const finalData = {...data, date: this.props.date, id: uid(data)}
    this.props.addReminder(finalData)
    this.setState({showInput: false});
  }

  renderInputField = () => {
    if (this.state.showInput) {
      return <ReminderInput date={this.props.date} onClickSubmit={this.onSubmit} />
    }
    return null
  }
  renderReminders() {
    const {calendarData, date} = this.props
    let orderedReminders
    if(!isEmpty(calendarData)) {
      const reminders = filter(calendarData, (o) => o.date === date);
      orderedReminders = orderBy(reminders, ['time'],['asc']) 
    }
    if(!isEmpty(orderedReminders)) {
      return orderedReminders.map((r, i) => <Reminder item={r} key={i} onClick={selectReminder(r)}/>)
    }
  }

  selectReminder(id) {
    this.props.selectReminder(id)
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
