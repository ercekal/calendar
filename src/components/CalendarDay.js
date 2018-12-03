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
  width: 130px;
  height: 100%;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 150px;
  border: 1px solid black;
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
    const {reminderData, date, selectReminder} = this.props
    let orderedReminders
    if(!isEmpty(reminderData)) {
      const reminders = filter(reminderData, (o) => o.date === date);
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
      <Container>
        <Day onClick={this.onClick}>
          {this.props.date}
        </Day>
        {this.renderReminders()}
      </Container>
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
    reminderData: state.reminderData
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarDay);
