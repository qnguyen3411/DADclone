import React from 'react';
import { connect } from 'react-redux';

import { fetchEliminatedTodayRequest } from '../../actions/UserActions';
import { getEliminatedUsers } from '../../state/selectors/UsersSelector';

import AviList from'./AviList';

export class EliminationList extends React.Component {
  componentDidMount() {
    this.props.onMount();
  }

  render() {
    const { users } = this.props;
    return (
      <div>
        <h3>Eliminated Today</h3>
        <AviList users={users} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  users: getEliminatedUsers(state)
})

const mapDispatchToProps = (dispatch) => ({
  onMount: () => dispatch(fetchEliminatedTodayRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(EliminationList)


