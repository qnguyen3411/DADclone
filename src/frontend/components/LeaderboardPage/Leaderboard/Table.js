import React from 'react';
import { Table, Badge } from 'reactstrap';

import AviList from '../AviList';

const ScoreDisplay = ({score}) => 
  <h3><Badge color="success">{score}</Badge></h3>

export const LeaderboardTable = ({ leaderboard }) => (
  <Table responsive>
    <thead>
      <tr>
        <th>DADies</th>
        <th>Streak</th>
      </tr>
    </thead>

    <tbody>
      {leaderboard.map((entry, index) => (
        <tr key={index}>
          <td className="col-2">
            <AviList users={entry.users} />
          </td>
          <td>
            <ScoreDisplay score={entry.score} />
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
)

export default LeaderboardTable;