import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components'
import ReminderInput from './ReminderInput' 
import Reminder from './Reminder' 
import { addReminder } from '../actions';
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
    const finalData = {...data, date: this.props.date}
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
    let reminders
    let orderedReminders
    if(!isEmpty(calendarData)) {
      reminders = filter(calendarData, (o) => o.id === date);
      orderedReminders = orderBy(reminders, ['time'],['asc']) 
    }
    if(!isEmpty(orderedReminders)) {
      console.log('asdfas');
      
      return orderedReminders.map((r, i) => <Reminder item={r} key={i} />)
    }
  }

  // renderReminders = () => {
  //   if (!isEmpty(this.state.reminders)) {
  //     return this.state.reminders
  //   }
  // }
  
  render() {
    return (
      <div onClick={() => this.toggleInput()}>
        <Day>
          {this.props.date}
          {this.renderInputField()}
          {/* {this.sortReminders()} */}
          {this.renderReminders()}
        </Day>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addReminder: (data) => {
      dispatch(addReminder(data))
    }
  };
};

const mapStateToProps = (state) => {
  return {
    calendarData: state,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarDay);
