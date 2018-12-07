import React from 'react';
import { connect } from 'react-redux';
import { Jumbotron } from 'reactstrap';
import { getPaginatedSubmissionsByUser } from '../../state/selectors/SubmissionsSelector';
import {fetchUserSubmissions} from '../../actions/SubmissionsActions';
import Gallery from '../Gallery';
import UserInfo from './UserInfo';

export class UserPage extends React.Component {
  componentDidMount() {
    this.props.onMount();
  }

  render() {
    const {items} = this.props;

    return (
    <div>
      <Jumbotron className="mb-0">
        <UserInfo />
      </Jumbotron>
      <Gallery items={items} />
    </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  items: getPaginatedSubmissionsByUser(state, ownProps.match.params.id)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onMount: () => dispatch(fetchUserSubmissions(ownProps.match.params.id))
}) 

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);