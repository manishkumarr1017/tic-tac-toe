import React,{ Component } from 'react';
import { Button,Modal,ModalHeader,ModalBody,ModalFooter } from 'reactstrap';

class ModalDifficulty extends Component{
	constructor(props){
		super(props);
	}
	render(){
		const difficulty=this.props.buttons.map((button) =>{
			return(
				<div key={button.id} className="row mt-4 justify-content-center">
					<Button onClick={() => this.props.onClick(button.id)} className="w-50" color="primary">{button.name}</Button>
				</div>
			);
		});
		return (
			<Modal isOpen={true}>
				<ModalHeader className="modal-header">
					<img src={require('../img/tic-tac-toe-name.gif') } className="img-fluid mx-auto d-block" />		
				</ModalHeader>
				<ModalBody>
					<div className="container">
						<div className="row mt-4 justify-content-center">
							<h4>Select The Difficulty</h4>
						</div>
						{difficulty}
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

export default ModalDifficulty;