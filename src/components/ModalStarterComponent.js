import React,{ Component } from 'react';
import { Button,Modal,ModalHeader,ModalBody,ModalFooter } from 'reactstrap';

class ModalStarter extends Component{
	constructor(props){
		super(props);
	}
	render(){
		const Starter=this.props.starters.map((starter) =>{
			return(
				<div key={starter.id} className="row mt-4 justify-content-center">
					<Button onClick={()=> this.props.onClick(starter.id)} className="w-25" color="primary">{starter.name}</Button>
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
							<h4>Select Starting Player</h4>
						</div>
						{Starter}
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

export default ModalStarter;