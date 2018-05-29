import React from 'react';
import './Person.css';

const person = (props) => {
	return (
		<div className="Person">	
			<h3>My name is {props.name} and I am {props.age} years old</h3>
			<input onChange={props.change} value={props.name} />
			<button onClick={props.click}>Delete person</button>
		</div>
	);
}

export default person;