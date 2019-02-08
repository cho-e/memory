// import React from 'react';
// import ReactDOM from 'react-dom';
// import _ from 'lodash';
//
// export default function game_init(root) {
//   ReactDOM.render(<Starter />, root);
// }
//
// class Starter extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = this.setStartState();
//   }
//
//   setStartState() {
//     let values = ["A", "B", "C", "D", "E", "F", "G", "H",
//     "A", "B", "C", "D", "E", "F", "G", "H"];
//     let letters = _.shuffle(values);
//     var cards = [];
//     for (var i = 0; i < 16; i++) {
//       let card = { letter: letters[i], flipped: false, index: i };
//       cards.push(this.renderCard(card));
//     }
//     return {
//       moves: 0,
//       score: 0,
//       deck: cards,
//       selectedCard: -1,
//       matches: 0,
//       buffer: false,
//     }
//   }
//
//   renderCard(card) {
//     return <Card letter={card.letter} flipped={card.flipped} key={card.index} onClick={this.flip.bind(this, card)}/>;
//   }
//
//   evaluateMatch(card1, card2) {
//     // if match, evaluate as correct, increase number of matches
//     if (card1.letter === card2.letter) {
//       let updatedScore = Math.round((2 / this.state.moves) * 150) + this.state.score + 10;
//       let state1 = _.assign({}, this.state, {
//         selectedCard: -1,
//         matches: this.state.matches += 1,
//         buffer: false,
//         score: updatedScore
//       });
//       this.setState(state1);
//       if (this.state.matches == 8) {
//         alert("WAOW GR8 JOB!")
//       }
//     }
//     else {
//       let copy = this.state.deck.slice();
//       card1.flipped = false;
//       card2.flipped = false;
//       copy[card1.index] = this.renderCard(card1);
//       copy[card2.index] = this.renderCard(card2);
//       let state1 = _.assign({}, this.state, {
//         selectedCard: -1,
//         deck: copy,
//         buffer:false
//       });
//       this.setState(state1);
//     }
//   }
//
//   flip(card) {
//     // if a card has been selected, check if it matches this card
//     if (this.state.selectedCard != -1 && !this.state.buffer) {
//       let firstCard = this.state.selectedCard;
//       let copy = this.state.deck.slice();
//       card.flipped = true;
//       copy[card.index] = this.renderCard(card);
//       let evaluate = () => {
//         this.evaluateMatch(firstCard, card);
//       }
//       window.setTimeout(function() {
//         evaluate();
//       }, 1000);
//
//       let state1 = _.assign({}, this.state, {
//         deck: copy,
//         moves: this.state.moves += 1,
//         selectedCard: card,
//         buffer: true,
//       });
//       this.setState(state1);
//     }
//     else if (!card.flipped && this.state.selectedCard == -1 && !this.state.buffer) {
//       let copy = this.state.deck.slice();
//       card.flipped = true;
//       copy[card.index] = this.renderCard(card);
//       let state1 = _.assign({}, this.state, {
//         deck: copy,
//         moves: this.state.moves += 1,
//         selectedCard: card
//       });
//       this.setState(state1);
//     }
//   }
//
//   restartGame(_ev) {
//     let newState = this.setStartState();
//     this.setState(newState);
//   }
//
//   render() {
//     let restartButton = <button onClick={this.restartGame.bind(this)}>Restart Game</button>;
//
//     return <div>
//       <div className="row">
//         <div className="column">
//           <div>{"Number of Moves: " + this.state.moves}</div>
//           <div>{"Score: " + this.state.score}</div>
//           {restartButton}
//         </div>
//         <div className="column"><h1> MEMORY GAME </h1></div>
//         <div className="column"></div>
//       </div>
//       <div className="row">
//         <div className="column">
//           {this.state.deck[0]}
//           {this.state.deck[1]}
//           {this.state.deck[2]}
//           {this.state.deck[3]}
//         </div>
//         <div className="column">
//           {this.state.deck[4]}
//           {this.state.deck[5]}
//           {this.state.deck[6]}
//           {this.state.deck[7]}
//         </div>
//         <div className="column">
//           {this.state.deck[8]}
//           {this.state.deck[9]}
//           {this.state.deck[10]}
//           {this.state.deck[11]}
//         </div>
//         <div className="column">
//           {this.state.deck[12]}
//           {this.state.deck[13]}
//           {this.state.deck[14]}
//           {this.state.deck[15]}
//         </div>
//       </div>
//     </div>;
//   }
// }
//
// function Card(props) {
//   return <div onClick={props.onClick} className="column">
//     <h1>{props.flipped ? props.letter : "?"}</h1>
//   </div>;
// }
