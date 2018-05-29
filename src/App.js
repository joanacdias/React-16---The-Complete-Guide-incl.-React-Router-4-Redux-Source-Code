import React, { Component } from 'react';
import Radium from 'radium';
import { Person } from './components/index';
import './App.css';

class App extends Component {
	state = {
		persons: [
			{ id: '1', name: 'Joana', age: 22},
			{ id: '2', name: 'Joan', age: 18},
			{ id: '3', name: 'Jo', age: 15},
		],
		showPersons: true
	}

	handleClick = () => {
		const doesShow = this.state.showPersons;
		this.setState({ showPersons: !doesShow })
	}

	// Two way binding example
	handleNameChange = (event, id) => {
		// Find the index of persons in which the id matches the argument id
		const personIdx = this.state.persons.findIndex(p => {
			return p.id === id;
		});
		// Use the spread operator to duplicate the state object rather than changing the original
		const person = {
			...this.state.persons[personIdx]
		}
		// Grab the user input value using an event function
		person.name = event.target.value;
		// Duplicate the persons array
		const persons = [...this.state.persons];
		persons[personIdx] = person;
		this.setState({ persons: persons })
	}

	handleClickDelete = (personIdx) => {
		const persons = this.state.persons.slice();
		persons.splice(personIdx, 1);
		this.setState({
			persons: persons
		})
	}

	render() {
		const buttonStyle = {
			backgroundColor: 'green',
			color: 'white',
			font: 'inherit',
			border: '1px solid blue',
			padding: '8px',
			cursor: 'pointer',
			':hover': {
				backgroundColor: 'lightgreen',
				color: 'black'
			}
		}

		let persons = null;

		if (this.state.showPersons) { 
			persons = (
				<div>
					{this.state.persons.map((person, idx) => {
						return <Person 
							name={person.name} age={person.age} key={person.id}
							change={(event) => this.handleNameChange(event, person.id)} 
							click={() => this.handleClickDelete(idx)}
						/>
					})}
				</div> 
			);
			buttonStyle.backgroundColor = 'red';
			buttonStyle[':hover'] = {
				backgroundColor: 'salmon',
				color: 'black'
			}
		}

		const classes = [];
		if (this.state.persons.length <= 2) {
			classes.push('red'); 
		}
		if (this.state.persons.length <= 1) {
			classes.push('bold');
		}

		return (
			<div className="App">
				<h1>Hello, world!</h1>
				<p className={classes.join(' ')}>This is really working!</p>
				<button onClick={this.handleClick} style={buttonStyle}>Toggle persons</button>
				{ persons }
			</div>
		);
 	}
}

export default Radium(App);
