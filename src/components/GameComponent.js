import React,{ Component } from 'react';
import { Button,Modal,ModalHeader,ModalBody,ModalFooter,ButtonGroup } from 'reactstrap';
import './game.css';

class Game extends Component{
	constructor(props){
		super(props);
		this.state = {
      		winner: undefined,
      		winnerLine: undefined
		};
		this.gameState={
			turn: 'X',
			gameLocked: false,
			gameEnded: false,
			board: Array(9).fill(''),
			totalMoves: 0
		};
		this.scores={
			'O': 10,
			'X':-10,
			'draw':0
		};
		this.wins={
			human:0,
			draw:0,
			computer:0
		};
	}
	componentDidMount(){
		if(this.props.match.params.id2>1 || this.props.match.params.id1>5){
			document.location="https://5f081b0c5edcd5f22aa72e67--festive-borg-4beef1.netlify.app/";
		}
		else if(this.props.match.params.id2 == 1){
			this.ComputerStart();
		}
	}
	ComputerStart(){
		this.gameState.turn='O';
		var array=[0,2,4,6,8],rand;
		rand=Math.floor(Math.random()*5);
		this.clicked(document.querySelectorAll('.square')[array[rand]]);
		return array[rand];
	}
	onResetScore(){
		this.RestartGame();
		this.wins.human=0;
		this.wins.draw=0;
		this.wins.computer=0;
	}
	onMainMenu(){
		window.location="https://adoring-liskov-49466d.netlify.app";
	}
	erase(box,i,j){
		setTimeout(() => {
			box[i].innerText="";
		}, j*200);
	}
	RestartGame(){
		var box=document.getElementsByClassName('square'),j=0,index=9;
		this.setState({
			winner: undefined,
			winnerLine: undefined
		});
		this.gameState={
			turn: 'X',
			gameLocked: false,
			gameEnded: false,
			board: Array(9).fill(''),
			totalMoves: 0
		};
		if(this.props.match.params.id2 == 1){
			index=this.ComputerStart();
		}
		for (var i=0; i < box.length; i++) {
			if(box[i].innerText !== '' && index !== i){
				this.erase(box,i,j);
				j++;
			}
		}
		return;
	}
	checkWinner() {
		var moves = [[0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6], [0, 1, 2], [3, 4, 5], [6, 7, 8]];
		var board = this.gameState.board;
		for(let i=0;i<moves.length;i++) {
			if(board[moves[i][0]] === board[moves[i][1]] && board[moves[i][1]] === board[moves[i][2]] && board[moves[i][0]] !== ''){
				return board[moves[i][0]];
			}
		}
		if(this.gameState.totalMoves === 9){
			return 'draw';
		}
		return null;
	}
	clicked(box){
		if(this.gameState.gameEnded || this.gameState.gameLocked){
			return;
		}
		if(this.gameState.board[box.dataset.square] === ''){
			this.gameState.board[box.dataset.square] = this.gameState.turn;
			box.innerText=this.gameState.turn;
			this.gameState.turn=this.gameState.turn === 'X' ? 'O' : 'X';
			this.gameState.totalMoves++;
		}
		var result=this.checkWinner();
		if(result === 'X'){
			this.gameState.gameEnded=true;
			this.setState({
				winner: 'X',
				winnerLine: 'Match Won By X'
			});
			this.wins.human++;
			setTimeout(() => {
				this.RestartGame();
			},1000);
			return;
		}
		else if(result === 'O'){
			this.gameState.gameEnded=true;
			this.setState({
				winner: 'O',
				winnerLine: 'Match Won By O'
			});
			this.wins.computer++;
			setTimeout(() => {
				this.RestartGame();
			},1000);
			return;
		}
		else if(result === 'draw'){
			this.gameState.gameEnded=true;
			this.setState({
				winner: 'draw',
				winnerLine: 'Match Draw',
			});
			this.wins.draw++;
			setTimeout(() => {
				this.RestartGame();
			},1000);
			return;
		}
		if(this.gameState.turn === 'O' && !this.gameState.gameEnded){
			this.gameState.gameLocked=true;
			setTimeout(()=> {
			var makemove = this.ComputerMove(this.props.match.params.id1);
			this.gameState.gameLocked=false;
			this.clicked(document.querySelectorAll('.square')[makemove]);
			}, 100);
		}
		return;
	}
	ComputerMove(level) {
		if(level <= 3){
			do {
				var random = Math.floor(Math.random()*9);
			} while(this.gameState.board[random] !== '');
		}
		if(level > 1){
			var move,bestmove,score,bestscore=-Infinity;
			var dict={},j=0,rand,movarr=[];
			for(var i=0;i<9;i++){
				if(this.gameState.board[i] === ''){
					this.gameState.board[i]='O';
					this.gameState.totalMoves++;
					score = this.minimax(0,false,level);
					this.gameState.board[i]='';
					this.gameState.totalMoves--;
					dict[i]=score;
					if(score >= bestscore){
						bestscore=score;
						bestmove=i;
					}
				}
			}
			console.log(dict);
			for (var key in dict) {
				if (dict.hasOwnProperty(key)) {           
					if(bestscore === dict[key]){
						movarr[j]=key;
						j++;
					}
				}
			}
			rand=Math.floor(Math.random()*j);
			if(level == 2){
				if(Math.floor(Math.random()*100) <=50){
					return movarr[rand];
				}
			}
			else if(level == 3){
				if(Math.floor(Math.random()*100) <=80){
					return movarr[rand];
				}
			}
			else{
				return movarr[rand];
			}
		}
		return random;
	}
	minimax(depth,isMaximizing,maxdepth){
		var result = this.checkWinner();
		if(result !== null){
			if(result === 'O'){
				return this.scores[result]-depth;
			}
			else if(result === 'draw'){
				return this.scores[result];
			}
			else{
				return this.scores[result]+depth;
			};
		}
		if(depth == maxdepth && maxdepth != 5){
			return 0;
		}
		if(isMaximizing){
			var move,score,bestscore=-Infinity;
			for(var i=0;i<9;i++){
				if(this.gameState.board[i] === ''){
					this.gameState.board[i]='O';
					this.gameState.totalMoves++;
					score = this.minimax(depth+1,false,maxdepth);
					this.gameState.board[i]='';
					this.gameState.totalMoves--;
					bestscore=Math.max(score,bestscore);
				}
			}
			return bestscore;
		}
		else{
			var move,score,bestscore=Infinity;
			for(var i=0;i<9;i++){
				if(this.gameState.board[i] === ''){
					this.gameState.board[i]='X';
					this.gameState.totalMoves++;
					score = this.minimax(depth+1,true,maxdepth);
					this.gameState.board[i]='';
					this.gameState.totalMoves--;
					bestscore=Math.min(score,bestscore);
				}
			}
			return bestscore;
		}
	}
	render(){
		return (
			<Modal isOpen={true} className="modal-img">
				<ModalHeader className="modal-header">
					<img src={require('../img/tic-tac-toe-name.gif') } className="img-fluid mx-auto d-block" />		
				</ModalHeader>
				<ModalBody>
					<div className="container">
						<div id="game">
							<div id="status" className="mt-2 mb-2">
								<h4>{this.state.winnerLine}</h4>
							</div>
							<div id="board" onClick={(e)=>{this.clicked(e.target);}}>
								<div className="square" data-square="0"></div>
								<div className="square" data-square="1"></div>
								<div className="square" data-square="2"></div>
								<div className="square" data-square="3"></div>
								<div className="square" data-square="4"></div>
								<div className="square" data-square="5"></div>
								<div className="square" data-square="6"></div>
								<div className="square" data-square="7"></div>
								<div className="square" data-square="8"></div>
							</div>
						</div>
					</div>
					<div className="container">
						<div className="row mt-4">
							<div className="offset-1 col-3 mr-2">
								<h5>Human(X)</h5>
							</div>
							<div className="col-2 ml-4">
								<h5>Draw</h5>
							</div>
							<div className="col ml-3">
								<h5>Computer(O)</h5>
							</div>
						</div>
						<div className="row mt-1">
							<div className="offset-2 col">
								<h5>{this.wins.human}</h5>
							</div>
							<div className="col">
								<h5>{this.wins.draw}</h5>
							</div>
							<div className="col">
								<h5>{this.wins.computer}</h5>
							</div>
						</div>
					</div>
				</ModalBody>
				<div className="container">
					<div className="row justify-content-center">
						<ModalFooter>
							<ButtonGroup>
								<Button onClick={() => this.onResetScore()} color="primary"><h4>Reset Score</h4></Button>
								<Button onClick={() => this.onMainMenu()} color="primary"><h4>Main Menu</h4></Button>
							</ButtonGroup>
						</ModalFooter>
					</div>
				</div>
			</Modal>
		);
	}
}

export default Game;