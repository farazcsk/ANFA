import React, {Component} from "react";
import injectTapEventPlugin from 'react-tap-event-plugin';
import TestCreator from './TestCreator';
import WorkoutCreator from './WorkoutCreator';

injectTapEventPlugin();

class App extends Component {
	render() {
		return (
			<div>
				<WorkoutCreator />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<TestCreator />
			</div>
		)
	}
}
export default App