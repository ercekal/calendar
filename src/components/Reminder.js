import React, { Component } from 'react';
import styled from 'styled-components'

const Item = styled.div`
	display: flex;
	${(props) => props.color && `background-color: ${props.color}`}
`
const Label = styled.div`
  font-size: 10px;
`
class Reminder extends Component {
	constructor(props) {
		super(props);
	}
  
	render() {
		const {item} = this.props
		console.log(item);
		
		return (
			<Item color={item.color}>
				{item.time} - 
				{item.text}
			</Item>
		);
	}
}

export default Reminder;
