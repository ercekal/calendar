import React, { Component } from 'react';
import styled from 'styled-components'
import { connect } from 'react-redux';

const TimeSelect = styled.div`
  display: flex;
`
const Label = styled.div`
  font-size: 10px;
`
const initialState = {
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
		console.log(nextProps)
	}
  
	handleChange = (event) => {
    const {target} = event
    const {value, name} = target
    this.setState({
      [name]: value
    });
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
		if (this.state !== initialState) {
			let newData = {
				text: this.state.text,
				time: `${this.state.hour}:${this.state.mins}`,
				color: this.state.color
			}
			this.props.onClickSubmit(newData)
		}
    event.preventDefault()
	}

	renderInput = () => {
		if (this.props.showInput) {
			return (
				<form onSubmit={this.onSubmit} >
					<input
						type='text' 
						name='text'
						placeholder='Add reminder max 30 chars'
						value={this.state.text}
						onChange={this.handleChange} 
						maxLength="30"
						required />
					<Label>
						Select time
						<TimeSelect>
						<select name='hour' value={this.state.hour} onChange={this.handleChange} >
							{this.renderHours()}
						</select>
						<select name='mins' value={this.state.mins} onChange={this.handleChange} >
							<option value='00'>00</option>
							<option value='15'>15</option>
							<option value='30'>30</option>
							<option value='45'>45</option>
						</select>
						</TimeSelect>
					</Label>
					<Label>
						Select reminder color
						<select name='color' value={this.state.color} onChange={this.handleChange} >
							<option value='blue'>Blue</option>
							<option value='green'>Green</option>
							<option value='yellow'>Yellow</option>
							<option value='red'>Red</option>
						</select>
					</Label>
					<input type='submit' value='Submit' />
				</form>
			)
		}
		return null
	}

	render() {
		return this.renderInput()
	}
}
const mapStateToProps = (state) => {
  return {
		selectedReminder: state.selectedReminder,
    showInput: state.input,
  }
}
export default connect(mapStateToProps)(ReminderInput);
