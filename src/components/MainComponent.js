import React,{ Component } from 'react';
import ModalMain from './ModalMainComponent.js';
import ModalDifficulty from './ModalDifficultyComponent.js';
import ModalStarter from './ModalStarterComponent.js';
import Game from './GameComponent.js';
import MultiPlayer from './MultiPlayerComponent.js'
import { Switch,Route,Redirect } from 'react-router-dom';
import { BUTTONS,STARTERS } from '../shared.js';

class Main extends Component{
	constructor(props){
		super(props);

		this.state={
			Difficulty : undefined,
			Starter : undefined,
			buttons : BUTTONS,
			starters: STARTERS
		}
	}
	onDifficulty(buttonId){
		document.location.href=window.location+"/"+buttonId;
	}
	onStarter(starterId){
		document.location.href=window.location+"/"+starterId;
	}
	render(){
		return(
			<Switch>
				<Route exact path="/" component={() => <ModalMain/>} />
				<Route exact path="/difficulty/starter" component={() => <ModalDifficulty buttons={this.state.buttons} onClick={(buttonId) => this.onDifficulty(buttonId)}/>} />
				<Route exact path="/difficulty/starter/:id1" component={() => <ModalStarter starters={this.state.starters} onClick={(starterId) => this.onStarter(starterId)}/>} />
				<Route exact path="/difficulty/starter/:id1/:id2" component={Game} />
				<Route exact path="/multi" component={MultiPlayer} />
				<Redirect to="/" />
			</Switch>
		);
	}
}

export default Main;
