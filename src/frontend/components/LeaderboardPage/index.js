import React from 'react';
import Leaderboard from './Leaderboard';
import EliminationList from './EliminationList';

export default () => (
  <div className="card-deck m-3">
    <div className="card col-8 mx-2">
      <Leaderboard />
    </div>
    <div className="card col-3 mx-1">
      <EliminationList />
    </div>
  </div>
)