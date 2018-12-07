
import React from 'react';
import { connect } from 'react-redux';

import { fetchLeaderboardRequest } from '../../../actions/UserActions';
import { getLeaderboard } from '../../../state/selectors/UsersSelector';
import LeaderboardTable from './Table';

export class Leaderboard extends React.Component {
  componentDidMount() {
    this.props.onMount();
  }

  render() {
    const { leaderboard } = this.props;
    return (
      <LeaderboardTable leaderboard={leaderboard} />
    )
  }
}

const mapStateToProps = (state) => ({
  leaderboard: getLeaderboard(state)
})

const mapDispatchToProps = (dispatch) => ({
  onMount: () => dispatch(fetchLeaderboardRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard)

