import React,{ Component } from 'react';
import { Button,Modal,ModalHeader,ModalBody,ModalFooter,ButtonGroup } from 'reactstrap';

class ModalMain extends Component{
	constructor(props){
		super(props);
	}
	onNewGame(){
		document.location="https://adoring-liskov-49466d.netlify.app/difficulty/starter";
	}
	onMultiGame(){
		document.location="https://adoring-liskov-49466d.netlify.app/multi";
	}
	render(){
		return (
			<Modal isOpen={true}>
				<ModalHeader className="modal-header">
					<img src={require('../img/tic-tac-toe-name.gif') } className="img-fluid mx-auto d-block" />		
				</ModalHeader>
				<ModalBody>
					<div className="container">
						<div className="row">
							<img src={require('../img/tic-tac-toe.jpg')} className="img-fluid mx-auto d-block" />
						</div>
						<div className="row mt-4 justify-content-center">
							<h4>Start The Game</h4>
						</div>
						<div className="row mt-4 justify-content-center">
							<Button className="w-50" color="success" onClick={() => this.onNewGame()}><h5>Single Player</h5></Button>
						</div>
						<div className="row mt-4 justify-content-center">
							<Button className="w-50" color="success" onClick={() => this.onMultiGame()}><h5>Multi Player</h5></Button>
						</div>
					</div>
				</ModalBody>
				<div className="row justify-content-center">
					<ModalFooter>
						<p><a href="https://github.com/manishkumarr1017/tic-tac-toe.git">View On Github</a></p>
					</ModalFooter>
				</div>
			</Modal>
		);
	}

}

export default ModalMain;