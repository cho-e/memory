import React from 'react';
import ReactDOM from 'react-dom';
import _ from "lodash";

export default function game_init(root, channel) {
  ReactDOM.render(<Memory channel={channel} />, root);
}

class Memory extends React.Component {
  constructor(props) {
    super(props);
    this.channel = props.channel;
    this.state = {
      moves: 0,
      score: 0,
      deck: [],
    };
    this.buffer = false;
    this.channel.join()
        .receive("ok", this.got_view.bind(this))
        .receive("error", resp => { console.log("Unable to join.", resp); });
  }

  got_view(view) {
    console.log("new view", view);
    this.setState(view.game);
  }

  flip(card) {
    if (this.buffer == false) {
      this.channel.push("flip", { card: card })
      .receive("ok", this.got_view.bind(this));

      if (this.state.moves % 2 == 1 && this.state.moves > 0) {
        this.buffer = true;
        let evaluate = () => {
          this.evaluateMatch(card);
        }
        window.setTimeout(function() {
          evaluate();
        }, 1000);
      }
    }
  }

  evaluateMatch(card) {
    this.channel.push("evaluateMatch", { card: card })
      .receive("ok", this.got_view.bind(this));
    this.buffer = false;

  }

  restartGame() {
    this.channel.push("restart").receive("ok", this.got_view.bind(this));
  }

  renderCard(card) {
    return <Card letter={card.letter} flipped={card.flipped} key={card.index}
    onClick={this.flip.bind(this, card)}
    />;
  }

  render() {
      let restartButton = <button onClick={this.restartGame.bind(this)}>Restart Game</button>;
      let deck = this.state.deck.map(x => this.renderCard(x));
      return <div>
        <div className="row">
          <div className="column">
            <div>{"Number of Moves: " + this.state.moves}</div>
            <div>{"Score: " + Math.round(this.state.score)}</div>
            {restartButton}
          </div>
          <div className="column"></div>
        </div>
        <div className="row">
          <div className="column">
            {deck[0]}
            {deck[1]}
            {deck[2]}
            {deck[3]}
          </div>
          <div className="column">
            {deck[4]}
            {deck[5]}
            {deck[6]}
            {deck[7]}
          </div>
          <div className="column">
            {deck[8]}
            {deck[9]}
            {deck[10]}
            {deck[11]}
          </div>
          <div className="column">
            {deck[12]}
            {deck[13]}
            {deck[14]}
            {deck[15]}
          </div>
        </div>
      </div>;
  }
}


function Card(props) {
  return <div onClick={props.onClick} className="column">
    <h1>{props.flipped ? props.letter : "?"}</h1>
  </div>;
}
