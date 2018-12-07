import React from 'react';
import { connect } from 'react-redux';
import { Jumbotron } from 'reactstrap';

import { fetchSubmissionsByDate } from '../../actions/SubmissionsActions';
import { getPaginatedSubmissionsByDate } from '../../state/selectors/SubmissionsSelector';

import DadStatus from './DadStatus';
import Paginator from '../Paginator';
import LimitSelector from '../LimitSelector';
import DateControl from './DateControl';
import Gallery from '../Gallery';


import { getTodaysDateStr } from '../../helpers';
class MainPage extends React.Component {

  componentDidMount() {
    this.props.onMount();
  }

  render() {
    const { onDateChange, match, items } = this.props;
    const date = match.params.date || getTodaysDateStr();
    return (
      <div>
        <Jumbotron className="mb-0 py-4">
          <DadStatus />
        </Jumbotron>
        <div className="col-10 mx-auto pt-3 pb-1 d-flex">
          <div className="mr-auto">
            <DateControl
              date={date}
              onDateChange={onDateChange} />
          </div>
          <div className="mr-5">
            <LimitSelector />
          </div>
          <Paginator />
        </div>
        <Gallery items={items} />
      </div >
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const date = ownProps.match.params.date || getTodaysDateStr();
  return ({
    items: getPaginatedSubmissionsByDate(state, date)
  })
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onMount: () => {
    const date = ownProps.match.params.date || getTodaysDateStr();
    dispatch(fetchSubmissionsByDate(date));
  },
  onDateChange: (date) => () => dispatch(fetchSubmissionsByDate(date))
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);