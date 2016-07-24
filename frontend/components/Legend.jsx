import React from 'react';
import SearchBar from './SearchBar';
import PlayerDetail from './PlayerDetail';
import PlayerStore from '../stores/PlayerStore';

const colors = ['#EDC951', '#CC333F', '#00A0B0'];

const Legend = React.createClass({
  getInitialState() {
    return { players: PlayerStore.all(), full: false };
  },
  componentDidMount() {
    this.storeListener = PlayerStore.addListener(this._onChange);
  },
  componentWillUnmount() {
    this.storeListener.remove();
  },
  _onChange() {
    const full = (PlayerStore.count() === 3);
    this.setState({ players: PlayerStore.all(), full });
  },
  showSearch() {
    if (this.state.full) {
      return <div></div>;
    }
    return <SearchBar />;
  },
  render() {
    const players = this.state.players;
    return (
      <div className="legend">
        {this.showSearch()}
        <div className="players">
          {
            Object.keys(players).map((username, idx) =>
              <PlayerDetail username={username} player={players[username]} color={colors[idx]} key={idx} />
            )
          }
        </div>
      </div>
    );
  },
});

export default Legend;