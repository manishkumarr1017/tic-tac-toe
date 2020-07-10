import React,{ Component } from 'react';
import Main from './components/MainComponent.js';
import { BrowserRouter } from 'react-router-dom';

class App extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
		<BrowserRouter>
			<div>
				<Main />
			</div>
		</BrowserRouter>
		);
	}
}

export default App;
