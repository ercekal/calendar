import React, { Component } from 'react';
import styled from 'styled-components'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {uid} from 'react-uid';
import { addReminder, updateReminder, deleteReminder, selectReminder, selectDate } from '../actions';
import {isEmpty} from 'lodash'

const TimeSelect = styled.div`
  display: flex;
`
const Label = styled.div`
  font-size: 10px;
`
const initialState = {
	date: '',
	text: '',
	color: 'blue',
	hour: '00',
	mins: '00'
}

class ReminderInput extends Component {
	constructor(props) {
		super(props);
		this.state = initialState;
	}

	componentWillReceiveProps(nextProps) {
		if (!isEmpty(nextProps.input.selectedReminder)) {
			this.setState(nextProps.input.selectedReminder)
		} else {
			this.setState(initialState)
		}
	}

	handleChange = (event) => {
    const {target} = event
    const {value, name} = target
    this.setState({
      [name]: value
    });
	}

	showDate = () => {
		return this.props.input.date === '' ? this.state.date : this.props.input.date
	}

	digitsCount(n) {
		var count = 0;
		if (n >= 1) ++count;
		while (n / 10 >= 1) {
			n /= 10;
			++count;
		}
		return count;
	}
	renderHours() {
		let hours = []
		for (let i = 0; i < 24; i++) {
			hours.push(<option value={this.digitsCount(i) === 1 ? `0${i}` : i} key={i}>{this.digitsCount(i) === 1 ? `0${i}` : i}</option>)
		}
		return hours.map(h => h)
	}

	onSubmit = (event) => {
		event.preventDefault()
		if (this.state !== initialState) {
			let newData = {
				text: this.state.text,
				time: `${this.state.hour}:${this.state.mins}`,
				hour: this.state.hour,
				mins: this.state.mins,
				color: this.state.color,
				date: this.props.input.date
			}
			let finalData = {...newData, id: uid(newData)}
			this.props.addReminder(finalData)
			this.setState(initialState)
		}
	}

	onUpdate = (event) => {
		event.preventDefault()
		let newData = {
			text: this.state.text,
			time: `${this.state.hour}:${this.state.mins}`,
			hour: this.state.hour,
			mins: this.state.mins,
			color: this.state.color,
			date: this.props.input.date,
			id: this.state.id
		}
		this.props.updateReminder(newData)
	}

	onDelete = (event) => {
		event.preventDefault()
		this.props.deleteReminder(this.state.id)
		this.setState(initialState)
	}

	renderButtons = () => {
		if (isEmpty(this.props.input.selectedReminder)) {
			return <button onClick={this.onSubmit}>Add</button>
		}
		return (
			<div>
				<button onClick={this.onUpdate}>Update</button>
				<button onClick={this.onDelete}>Delete</button>
			</div>
		)
	}



	renderInput = () => {
		const {hour, mins, color, text} = this.state
		return (
			<form>
				<p>Date: {this.showDate()}</p>
				<input
					type='text'
					name='text'
					placeholder='Add reminder max 30 chars'
					value={text}
					onChange={this.handleChange}
					maxLength="30"
					required />
				<Label>
					Select time
					<TimeSelect>
					<select name='hour' value={hour} onChange={this.handleChange} >
						{this.renderHours()}
					</select>
					<select name='mins' value={mins} onChange={this.handleChange} >
						<option value='00'>00</option>
						<option value='15'>15</option>
						<option value='30'>30</option>
						<option value='45'>45</option>
					</select>
					</TimeSelect>
				</Label>
				<Label>
					Select reminder color
					<select name='color' value={color} onChange={this.handleChange} >
						<option value='blue'>Blue</option>
						<option value='green'>Green</option>
						<option value='yellow'>Yellow</option>
						<option value='red'>Red</option>
					</select>
				</Label>
				{this.renderButtons()}
			</form>
		)
	}

	render() {
		return this.renderInput()
	}
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addReminder, updateReminder, deleteReminder, selectReminder, selectDate }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    input: state.input
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReminderInput);
